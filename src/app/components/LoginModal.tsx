import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Mail, Lock, ShieldCheck, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {
  syncCustomer,
  checkCustomerExists,
  loginCustomer,
} from "../../api/customerSync";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdminLogin: (type: "admin" | "customer", name: string) => void;
  onLoginSuccess?: () => void;
  onNavigateToPricing?: () => void;
}

export function LoginModal({
  open,
  onOpenChange,
  onAdminLogin,
  onLoginSuccess,
  onNavigateToPricing,
}: LoginModalProps) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setAdminEmail('');
        setAdminPassword('');
        setName('');
        setHasLoginError(false);
        setErrorMessage('');
        setShowPassword(false);
      }, 200);
    }
  }, [open]);

  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=69589d3ba7306459dd47fd87`,
        { headers: { "x-api-key": "my-secret-key-123" } },
      );
      if (response.ok) {
        const data = await response.json();
        return data.activeLicense && data.activeLicense.status === "active";
      }
      return false;
    } catch {
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

      if (!isSignUp) {
        const exists = await checkCustomerExists(adminEmail);
        if (!exists) {
          toast.error("Account not found. Please create an account.");
          setIsSignUp(true);
          setHasLoginError(true);
          setErrorMessage("Account not found");
          setLoading(false);
          return;
        }

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

          const hasActiveLicense = await checkActiveLicense(adminEmail);
          if (loginResponse.customer) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                name: loginResponse.customer.name,
                email: loginResponse.customer.email,
                hasActiveLicense,
              }),
            );
            onAdminLogin("admin", loginResponse.customer.name);
            window.dispatchEvent(new Event("userLoginStatusChanged"));
            onOpenChange(false);
            onLoginSuccess?.();
            setAdminEmail("");
            setAdminPassword("");
            setName("");
            setIsSignUp(false);
            setShowPassword(false);
            toast.success("Login successful! Welcome back.");
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
              toast.success(
                "Access your dashboard from the user menu in the top right!",
              );
            }
          }
        } catch (loginError: any) {
          setHasLoginError(true);
          setErrorMessage("Invalid credentials");
          if (loginError.response?.status === 401)
            toast.error("Invalid password");
          else toast.error(loginError.message || "Login failed");
          setLoading(false);
          return;
        }
      }

      if (isSignUp) {
        if (!name) {
          toast.error("Name is required");
          setLoading(false);
          return;
        }
        const exists = await checkCustomerExists(adminEmail);
        if (exists) {
          toast.error("Account already exists. Please sign in.");
          setIsSignUp(false);
          setLoading(false);
          return;
        }

        await syncCustomer({
          name,
          email: adminEmail,
          source: "GeoTrack",
          password: adminPassword,
        });

        // After signup, redirect to sign-in with credentials pre-filled
        toast.success("Account created! Please sign in to continue.");
        setIsSignUp(false);
        setName("");
        setAdminPassword("");
        setShowPassword(false);
        setHasLoginError(false);
        setErrorMessage("");
        // adminEmail stays filled so user sees it pre-populated
      }
    } catch (err: any) {
      setHasLoginError(true);
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

  const toggleSignUpMode = () => {
    setIsSignUp(!isSignUp);
    setHasLoginError(false);
    setErrorMessage("");
    setAdminPassword("");
    setName("");
    setShowPassword(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 shadow-2xl overflow-hidden sm:max-w-sm rounded-2xl">
        <style>{`
          .gt-modal-header {
            background: linear-gradient(135deg, #1A56DB 0%, #1e40af 50%, #1d4ed8 100%);
            padding: 16px 20px 14px;
          }

          [role="dialog"] {
            margin-top: 30px;
          }
          .gt-modal-title {
            font-size: 15px;
            font-weight: 700;
            color: white;
            margin: 0 0 2px;
            letter-spacing: -0.01em;
          }
          .gt-modal-sub {
            font-size: 11px;
            color: rgba(255,255,255,0.6);
            margin: 0;
          }
          .gt-modal-body {
            background: #f0f4f8;
            padding: 16px 14px 20px;
          }
          .gt-form-card {
            background: white;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            padding: 12px 14px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          .gt-card-hint {
            font-size: 11px;
            color: #94a3b8;
            margin: 0 0 10px;
          }
          .gt-card-hint.error {
            color: #ef4444;
            font-weight: 500;
          }
          .gt-field { margin-bottom: 8px; }
          .gt-label {
            display: block;
            font-size: 10px;
            font-weight: 700;
            color: #374151;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            margin-bottom: 4px;
          }
          .gt-input-wrap { position: relative; }
          .gt-input-icon {
            position: absolute;
            left: 9px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            width: 13px;
            height: 13px;
            pointer-events: none;
          }
          .gt-input {
            width: 100%;
            padding: 7px 10px 7px 28px;
            background: #f8fafc;
            border: 1.5px solid #e2e8f0;
            border-radius: 8px;
            font-size: 12.5px;
            color: #1e293b;
            outline: none;
            transition: all 0.15s;
            box-sizing: border-box;
          }
          .gt-input::placeholder { color: #b0bec5; }
          .gt-input:focus {
            border-color: #3b82f6;
            background: white;
            box-shadow: 0 0 0 2px rgba(59,130,246,0.1);
          }
          .gt-input.err { border-color: #ef4444; }

          .gt-submit {
            width: 100%;
            padding: 8px;
            background: linear-gradient(135deg, #1A56DB, #1e40af);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 12.5px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s;
            margin-top: 10px;
            box-shadow: 0 3px 10px rgba(26,86,219,0.3);
            letter-spacing: 0.01em;
          }
          .gt-submit:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 5px 16px rgba(26,86,219,0.4);
          }
          .gt-submit:disabled { opacity: 0.6; cursor: not-allowed; }
          .gt-toggle {
            text-align: center;
            margin-top: 12px;
            margin-bottom: 4px;
          }
          .gt-toggle-btn {
            background: none;
            border: none;
            font-size: 11.5px;
            font-weight: 600;
            color: #1e3a5f;
            cursor: pointer;
            padding: 0;
            text-underline-offset: 2px;
          }
          .gt-toggle-btn:hover { color: #3b82f6; }
          .gt-eye-btn {
            position: absolute;
            right: 9px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            color: #94a3b8;
            display: flex;
            align-items: center;
          }
          .gt-eye-btn:hover { color: #64748b; }
        `}</style>

        {/* ── Header ── */}
        <div className="gt-modal-header">
          <h2 className="gt-modal-title">
            {isSignUp ? "Create Account" : "Login to GeoTrack"}
          </h2>
          <p className="gt-modal-sub">
            {isSignUp
              ? "Sign up to get started with GeoTrack"
              : "Sign in to access your account"}
          </p>
        </div>

        {/* ── Body ── */}
        <div className="gt-modal-body">
          <div className="gt-form-card">
            <p className={`gt-card-hint${hasLoginError ? " error" : ""}`}>
              {hasLoginError && errorMessage
                ? errorMessage
                : "Enter your credentials to continue"}
            </p>

            <form onSubmit={handleAdminLogin} autoComplete="off">
              {/* Hidden dummy inputs to trick browser autofill */}
              <input type="text" style={{ display: 'none' }} autoComplete="username" />
              <input type="password" style={{ display: 'none' }} autoComplete="current-password" />

              {/* Name — sign up only */}
              {isSignUp && (
                <div className="gt-field">
                  <label className="gt-label">Name</label>
                  <div className="gt-input-wrap">
                    <User className="gt-input-icon" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="gt-input"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="gt-field">
                <label className="gt-label">Email</label>
                <div className="gt-input-wrap">
                  <Mail className="gt-input-icon" />
                  <input
                    type="text"
                    placeholder="xyz@gmail.com"
                    value={adminEmail}
                    autoComplete="off"
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      setHasLoginError(false);
                      setErrorMessage("");
                    }}
                    className={`gt-input${hasLoginError ? " err" : ""}`}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="gt-field" style={{ marginBottom: 0 }}>
                <label className="gt-label">Password</label>
                <div className="gt-input-wrap">
                  <Lock className="gt-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={adminPassword}
                    autoComplete="new-password"
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setHasLoginError(false);
                      setErrorMessage("");
                    }}
                    className={`gt-input${hasLoginError ? " err" : ""}`}
                    style={{ paddingRight: '32px' }}
                    required
                  />
                  <button
                    type="button"
                    className="gt-eye-btn"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="gt-submit" disabled={loading}>
                <ShieldCheck style={{ width: 14, height: 14 }} />
                {loading
                  ? "Processing..."
                  : isSignUp
                    ? "Create Account"
                    : "Sign In"}
              </button>
            </form>
          </div>

          {/* Toggle */}
          <div className="gt-toggle">
            <button
              type="button"
              onClick={toggleSignUpMode}
              className="gt-toggle-btn"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}