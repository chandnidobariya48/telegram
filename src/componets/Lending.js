import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/telegram-logo.gif"; 
// import DetailPage from "./DetailPage"; 
import Login from "./Login"
const Landing = () => {
  const [gifLoaded, setGifLoaded] = useState(false); 
  const navigate = useNavigate(); 

  // Run the timer to switch to the DetailPage after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setGifLoaded(true); // Set gifLoaded to true to show DetailPage after 7 seconds
    }, 3000); // Adjust duration to your GIF length
    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Navigate to the DetailPage once the GIF is loaded
  useEffect(() => {
    if (gifLoaded) {
      navigate("/"); // Navigate to the DetailPage route
    }
  }, [gifLoaded, navigate]);    

  return (
    <div className=" w-full flex justify-center items-center">
      {!gifLoaded ? (
        <img
          src={logo}   
          alt="Loading..."      
          className="h-screen w-full "          
        />
      ) : (
        // <DetailPage /> 
        <Login/>
      )}
    </div>
  );
};

export default Landing;