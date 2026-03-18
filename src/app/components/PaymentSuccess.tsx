import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTransactionDetails, downloadInvoice } from "../../api/payment";
import { useNavigate } from "react-router-dom";

export function PaymentSuccess() {
  const [params] = useSearchParams();
  const transactionId = params.get("txn");
  const isFree = params.get("free") === "true";

  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle free plan - no transaction to fetch
    if (isFree) {
      setLoading(false);
      return;
    }

    // Handle paid plan - fetch transaction
    if (!transactionId) {
      setLoading(false);
      return;
    }

    const fetchTransaction = async () => {
      try {
        const data = await getTransactionDetails(transactionId);
        setTransaction(data);
      } catch (err) {
        console.error("Failed to load transaction", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, isFree]);

  const handleDownloadInvoice = () => {
    if (!transactionId) {
      alert("Transaction ID not found");
      return;
    }
    
    downloadInvoice(transactionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  // Free plan success view
  if (isFree) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-green-200">
            <CardContent className="pt-12 pb-8 text-center space-y-8">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-6">
                  <CheckCircle2 className="h-20 w-20 text-green-600" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome to GeoTrack!</h1>
                <p className="text-muted-foreground">
                  Your free plan is now active
                </p>
              </div>

              {/* Free Plan Details */}
              <div className="bg-blue-50 p-6 rounded-lg text-left space-y-3">
                <h3 className="text-lg font-semibold">Plan Details</h3>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">Free Plan</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">₹0.00</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-600 font-semibold uppercase">
                    Active
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/tutorials")}
                >
                  Start Tutorial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="pt-6 border-t text-xs text-muted-foreground">
                <p>
                  Questions? Email{" "}
                  <a
                    href="mailto:support@geotrack.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@geotrack.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              🎉 Welcome to GeoTrack! Check your email for login credentials and next steps.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If no transaction found for paid plan
  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-red-600 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Transaction Not Found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find the transaction details. Please contact support if you've made a payment.
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Paid plan success view
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="border-green-200">
          <CardContent className="pt-12 pb-8 text-center space-y-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-6">
                <CheckCircle2 className="h-20 w-20 text-green-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Your subscription is now active
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-blue-50 p-6 rounded-lg text-left space-y-3">
              <h3 className="text-lg font-semibold">Order Details</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{transaction.plan}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  ₹{(transaction.amount / 1).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-600 font-semibold uppercase">
                  {transaction.status}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {new Date(transaction.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadInvoice}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>

              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate("/tutorials")}
              >
                Start Tutorial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="pt-6 border-t text-xs text-muted-foreground">
              <p className="mb-2">Transaction ID: {transaction.transactionId}</p>
              <p>
                Questions? Email{" "}
                <a
                  href="mailto:support@geotrack.com"
                  className="text-blue-600 hover:underline"
                >
                  support@geotrack.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            🎉 Welcome to GeoTrack! Check your email for login credentials and next steps.
          </p>
        </div>
      </div>
    </div>
  );
}