import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { syncCustomer, checkCustomerExists, loginCustomer } from "../api/customerSync";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdminLogin: (type: "admin" | "customer", name: string) => void;
  onLoginSuccess?: () => void;
  onNavigateToPricing?: () => void;
}

export function LoginModal({ open, onOpenChange, onAdminLogin, onLoginSuccess, onNavigateToPricing }: LoginModalProps) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      console.log('Checking active license for:', email);
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=69589d3ba7306459dd47fd87`,
        {
          headers: {
            "x-api-key": "my-secret-key-123",
          },
        }
      );

      console.log('License check response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('License check response data:', data);
        
        // Check if activeLicense exists and status is 'active'
        const hasLicense = data.activeLicense && data.activeLicense.status === 'active';
        console.log('Has active license:', hasLicense);
        return hasLicense;
      }
      console.log('License check failed - response not ok');
      return false;
    } catch (error) {
      console.error("Error checking active license:", error);
      return false;
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasLoginError(false);
    setErrorMessage("");

    if (!adminEmail || !adminPassword) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // ----------------------------
      // SIGN IN FLOW
      // ----------------------------
      if (!isSignUp) {
        // STEP 1: Check if email exists in database
        const exists = await checkCustomerExists(adminEmail);

        if (!exists) {
          // Email doesn't exist - redirect to sign up
          toast.error("Account not found. Please create an account.");
          setIsSignUp(true);
          setHasLoginError(true);
          setErrorMessage("Account not found");
          setLoading(false);
          return;
        }

        // STEP 2: Email exists - now validate password
        try {
          const loginResponse = await loginCustomer({
            email: adminEmail,
            password: adminPassword,
          });

          if (!loginResponse.success) {
            setHasLoginError(true);
            setErrorMessage("Invalid credentials");
            toast.error("Invalid password");
            setLoading(false);
            return;
          }

          // ✅ CHECK LICENSE STATUS
          const hasActiveLicense = await checkActiveLicense(adminEmail);

          // Store user data from successful login with license status
          if (loginResponse.customer) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                name: loginResponse.customer.name,
                email: loginResponse.customer.email,
                hasActiveLicense: hasActiveLicense,
              })
            );

            // Call the parent handler
            onAdminLogin("admin", loginResponse.customer.name);

            // Dispatch event to notify Navbar of login status change
            window.dispatchEvent(new Event('userLoginStatusChanged'));

            // ✅ CLOSE MODAL - User stays on website
            onOpenChange(false);
            onLoginSuccess?.();

            // Reset form
            setAdminEmail("");
            setAdminPassword("");
            setName("");
            setIsSignUp(false);

            toast.success("Login successful! Welcome back.");

            // 🎯 Show appropriate message based on license status
            if (!hasActiveLicense) {
              setTimeout(() => {
                toast.info("Get started with a plan to unlock all features!", {
                  action: {
                    label: "View Plans",
                    onClick: () => onNavigateToPricing?.(),
                  },
                  duration: 6000,
                });
              }, 500);
            } else {
              toast.success("Access your dashboard from the user menu in the top right!");
            }
          }
        } catch (loginError: any) {
          // Handle password validation errors
          console.error("Login error:", loginError);
          setHasLoginError(true);
          setErrorMessage("Invalid credentials");
          
          if (loginError.response?.status === 401) {
            toast.error("Invalid password");
          } else {
            toast.error(loginError.message || "Login failed");
          }
          setLoading(false);
          return;
        }
      }

      // ----------------------------
      // SIGN UP FLOW
      // ----------------------------
      if (isSignUp) {
        if (!name) {
          toast.error("Name is required to create account");
          setLoading(false);
          return;
        }

        // Check if customer already exists
        const exists = await checkCustomerExists(adminEmail);
        if (exists) {
          toast.error("Account already exists. Please sign in.");
          setIsSignUp(false);
          setLoading(false);
          return;
        }

        // Create new customer with password
        await syncCustomer({
          name,
          email: adminEmail,
          source: "GeoTrack",
          password: adminPassword,
        });

        // ✅ CHECK LICENSE STATUS for new user
        const hasActiveLicense = await checkActiveLicense(adminEmail);

        // Store user data with license status
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: name,
            email: adminEmail,
            hasActiveLicense: hasActiveLicense,
          })
        );

        // Call the parent handler
        onAdminLogin("admin", name);

        // Dispatch event to notify Navbar of login status change
        window.dispatchEvent(new Event('userLoginStatusChanged'));

        // ✅ CLOSE MODAL - User stays on website
        onOpenChange(false);
        onLoginSuccess?.();

        // Reset form
        setAdminEmail("");
        setAdminPassword("");
        setName("");
        setIsSignUp(false);

        toast.success("Account created successfully! Welcome to GeoTrack.");

        // Show pricing prompt for new users
        setTimeout(() => {
          toast.info("Get started with a plan to unlock all features!", {
            action: {
              label: "View Plans",
              onClick: () => onNavigateToPricing?.(),
            },
            duration: 6000,
          });
        }, 500);
      }

    } catch (err: any) {
      console.error("General error:", err);
      setHasLoginError(true);
      
      // More specific error handling
      if (err.response?.status === 401) {
        setErrorMessage("Invalid credentials");
        toast.error("Invalid password");
      } else {
        setErrorMessage("Something went wrong");
        toast.error(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset error state when switching between sign in/sign up
  const toggleSignUpMode = () => {
    setIsSignUp(!isSignUp);
    setHasLoginError(false);
    setErrorMessage("");
    setAdminPassword("");
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Create Account" : "Login to GeoTrack"}</DialogTitle>
          <DialogDescription>
            {isSignUp ? "Sign up to get started with GeoTrack" : "Sign in to access your account"}
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardDescription className={hasLoginError ? "text-red-500 font-medium" : ""}>
              {hasLoginError && errorMessage ? errorMessage : "Enter your credentials to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">

              {/* Name field only when signing up */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="email@gmail.com"
                    value={adminEmail}
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      setHasLoginError(false);
                      setErrorMessage("");
                    }}
                    className={`pl-10 ${hasLoginError ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setHasLoginError(false);
                      setErrorMessage("");
                    }}
                    className={`pl-10 ${hasLoginError ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
              </div>
              
              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="admin-remember" className="rounded" />
                    <Label htmlFor="admin-remember" className="text-sm cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                <ShieldCheck className="h-4 w-4 mr-2" />
                {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>
              
              {/* Toggle between sign in and sign up */}
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={toggleSignUpMode}
                  className="text-primary hover:underline"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}