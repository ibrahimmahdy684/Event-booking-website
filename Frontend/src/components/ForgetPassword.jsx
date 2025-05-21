import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../styles/ForgetPassword.css";

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // 1: request OTP, 2: verify/reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:3000/api/v1/forgetPassword", { email });
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and reset password
  const handleVerifyReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:3000/api/v1/verifyReset", {
        email,
        otpCode: otp,
        newPassword,
      });
      toast.success("Password reset successfully!");
      setStep(3);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-card">
        <h2>Forgot Password</h2>
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="forget-password-form">
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyReset} className="forget-password-form">
            <label htmlFor="otp">Enter OTP</label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={loading}
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="forget-password-success">
            <p>
              Password has been reset successfully. You can now log in with your new
              password.
            </p>
          </div>
        )}
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default ForgetPassword;
