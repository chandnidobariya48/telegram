import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importing axios

const OtpDialog = ({ isOpen, onClose, phoneNumber }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");  // For showing OTP error

  // Function to handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Function to verify OTP when "Continue" is clicked
  const verifyOtp = async () => {
    // Join the OTP digits into a single string
    const otpString = otp.join("");

    // Check if the OTP is valid (length check, not strictly required but useful)
    if (otpString.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.1.15:8000/api/VerifyOTPAndGenerateSessionView/", 
        {
          phoneNumber: phoneNumber,  // Phone number to identify the user
          otp: otpString,  // OTP entered by the user
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response was successful
      if (response.status === 200) {
        alert(response.data.message);  // Success message from the backend
        navigate("/detailPage");  // Redirect to the detail page after successful OTP verification
      } else {
        setOtpError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setOtpError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${isOpen ? "visible" : "hidden"}`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
        <h2 className="text-xl text-center mb-4 font-extrabold">Verify OTP</h2>
        <p className="text-black text-center mb-6">{phoneNumber}</p> {/* Displaying the phone number here */}

        <div className="flex gap-3 flex-wrap">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-9 h-9 border border-black rounded text-center focus:outline-none"
            />
          ))}
        </div>

        {/* Show error message if OTP is invalid */}
        {otpError && <p className="text-red-500 text-center mt-2">{otpError}</p>}

        <div className="flex justify-center items-center">
          <button
            className="bg-black text-white rounded-lg px-6 py-1 mt-6"
            onClick={verifyOtp}  // Call the verifyOtp function on click
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpDialog;
