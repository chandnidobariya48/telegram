import { useState, useEffect } from "react";
import axios from "axios"; // Importing axios
import OtpDialog from "./OtpDialog";

const Login = () => {
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [formData, setFormData] = useState({
    apiId: "",
    apiHash: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    apiId: "",
    apiHash: "",
    phoneNumber: "",
  });

  // Load form data from localStorage (if any) when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("loginDetails"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    // Validate ApiId
    if (!formData.apiId) {
      newErrors.apiId = "ApiId is required";
      isValid = false;
    }
    // Validate ApiHash
    if (!formData.apiHash) {
      newErrors.apiHash = "ApiHashId is required";
      isValid = false;
    }
    // Validate Phone Number
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  // Handle Next button click
  const handleNextClick = async () => {
    if (validateForm()) {
      // Store form data in localStorage
      console.log('click!!');
      localStorage.setItem("loginDetails", JSON.stringify(formData));

      // Make the API call to send OTP using axios
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/SendOTPView/", {
          phoneNumber: formData.phoneNumber,
          apiId: formData.apiId,
          apiHash: formData.apiHash,
        });
        console.log('click hello!!',response.data);

        if (response.status === 200) {
          setShowOtpPopup(true); // Show OTP popup if OTP is sent successfully
        } else {
          console.error("Error sending OTP:", response.data);
          // Handle error (maybe show an error message to the user)
        }
      } catch (error) {
        console.error("Network error:", error);
        // Handle network error
      }
    }
  };

  // Close OTP dialog
  const handleCloseOtpDialog = () => {
    setShowOtpPopup(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black w-full">
      <div className="bg-black p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl text-white font-extrabold text-center mb-6">
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white" htmlFor="apiId">
              Api-Id
            </label>
            <input
              type="number"
              name="apiId"
              value={formData.apiId}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none"
            />
            {errors.apiId && <p className="text-red-500 text-xs">{errors.apiId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white" htmlFor="apiHash">
              Api_Hash_Id
            </label>
            <input
              type="text"
              name="apiHash"
              value={formData.apiHash}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border text-white bg-transparent border-gray-300 rounded-md focus:outline-none"
            />
            {errors.apiHash && <p className="text-red-500 text-xs">{errors.apiHash}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white" htmlFor="phoneNumber">
              Phone-Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 w-full text-white p-2 border bg-transparent border-gray-300 rounded-md focus:outline-none"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
          </div>

          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleNextClick}
              className="w-20 py-2 text-center rounded-md font-extrabold bg-white text-black cursor-pointer"
            >
              Next
            </button>
          </div>
        </form>

        {/* OTP Popup */}
        <OtpDialog isOpen={showOtpPopup} onClose={handleCloseOtpDialog} phoneNumber={formData.phoneNumber} />
      </div>
    </div>
  );
};
export default Login;