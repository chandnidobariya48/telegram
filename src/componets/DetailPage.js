import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/telegram.svg";
import remove from "../assets/delete.svg";
import { FiPlusCircle } from "react-icons/fi";
import replace from "../assets/replace.svg";

const DetailPage = () => {
  // State hooks
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false); // Tracks whether to show the replace options
  const [UrlBlocks, SetUrlBlocks] = useState([{ matchWord: "", replaceWord: "", toField: "" }]); // Holds URL blocks
  const [keywordBlocks, setKeywordBlocks] = useState([""]); // Holds keyword blocks
  const [isMultiple, setIsMultiple] = useState(false); // Tracks if multiple URL blocks are allowed
  const [cancel, setCancel] = useState(false); // Controls cancel button state
  const [save, setSave] = useState(false); // Controls save button state
  const [errors, setErrors] = useState({ // Validation errors
    name: "",
    from: "",
    keyword: "",
    urlBlocks: [],
    keywordBlocks: [],
  });
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setShowOptions(value === "yes");
  };

  // Validation logic for form fields
  const validateFields = () => {
    let isValid = true;
    let fieldErrors = {
      name: "",
      from: "",
      keyword: "",
      urlBlocks: [],  
      keywordBlocks: [],    
    };

    // Validates if 'name' field is filled
    if (document.getElementById("name").value.trim() === "") {
      fieldErrors.name = "Name is required.";    
      isValid = false;     
    }   

    // Validates if 'from' field is filled
    if (document.getElementById("from").value.trim() === "") {
      fieldErrors.from = "From URL is required."; 
      isValid = false;     
    }

    // Validates if any keyword radio button is selected
    if (!document.querySelector('input[name="keyword"]:checked')) {
      fieldErrors.keyword = "Keyword selection is required.";
      isValid = false;    
    }

    // Validates keyword blocks for non-empty values
    keywordBlocks.forEach((keyword, index) => { 
      if (keyword.trim() === "") { 
        fieldErrors.keywordBlocks[index] = "Keyword cannot be empty.";
        isValid = false;     
      }   
    });  
 
    // Validates URL blocks for non-empty values
    UrlBlocks.forEach((block, index) => { 
      let blockErrors = {}; 
      if (block.matchWord.trim() === "") {   
        blockErrors.matchWord = "Match Word is required.";
        isValid = false;          
      } 
      if (block.replaceWord.trim() === "") {  
        blockErrors.replaceWord = "Replace Word is required.";
        isValid = false;      
      }  
      if (block.toField.trim() === "") {      
        blockErrors.toField = "To Field is required.";
        isValid = false;
      }    
      fieldErrors.urlBlocks[index] = blockErrors;                                                                                                          
    });

    // Set errors state
    setErrors(fieldErrors);
    return isValid;
  };     
    
  // Handler for adding and removing keyword blocks 
  const addKeywordBlock = () => setKeywordBlocks([...keywordBlocks, ""]); 
  const removeKeywordBlock = (index) => setKeywordBlocks(keywordBlocks.filter((_, i) => i !== index));
   
  // Handler for adding and removing URL blocks
  const addUrlBlock = () => SetUrlBlocks([...UrlBlocks, { matchWord: "", replaceWord: "", toField: "" }]);
  const removeUrlBlock = (index) => SetUrlBlocks(UrlBlocks.filter((_, i) => i !== index));

  // Handler for updating URL block fields
  const handleChange = (index, field, value) => {    
    const updatedBlocks = [...UrlBlocks];
    updatedBlocks[index][field] = value;   
    SetUrlBlocks(updatedBlocks);
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateFields()) navigate("/botTable");
  };

  // Handler for button clicks (Save/Cancel)
  const handleButtonClick = (button) => {
    if (button === "cancel") {
      setCancel(!cancel);
      setSave(false);
    } else if (button === "save") {   
      setSave(!save);    
      setCancel(false);   
    }
  };

  return (
    <div className="bg-black text-white w-full flex justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg space-y-6">
        {/* Name input */}
        <div className="relative">
          <label htmlFor="name" className="absolute -top-2 left-4 bg-black px-1 text-sm text-white">
            Name:
          </label>
          <input
            type="text"
            id="name"  
            placeholder="Enter name"
            className="w-full p-2 rounded-md bg-black text-white border border-white focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        {/* 'From' URL input */}
        <div className="relative">
          <label htmlFor="from" className="absolute -top-2 left-4 bg-black px-1 text-sm text-white">
            From:
          </label>
          <input
            type="text"
            id="from"
            placeholder="Enter channel URL"        
            className="w-full p-2 rounded-md bg-black text-white border border-white focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
          />
          <div className="absolute right-2 top-1/3  text-gray-400 hover:text-white cursor -pointer">
            <img className="h-4 w-4" src={icon} alt="Telegram icon" />
          </div>
          {errors.from && <span className="text-red-500 text-sm">{errors.from}</span>}
        </div>
 
        {/* Keyword Block options */}
        <div className="flex items-center space-x-4 mb-2">
          <label className="text-sm">Keyword Block:</label>
          {["Yes", "No"].map((label, idx) => (
            <label key={idx} className="flex items-center space-x-2">
              <span>{label}</span>
              <input type="radio" name="keyword" className="accent-green-500 w-4 h-4" />
            </label>
          ))}
        </div>
        {errors.keyword && <span className="text-red-500 text-sm">{errors.keyword}</span>}
 
        {/* Render keyword blocks */}
        {keywordBlocks.map((keyword, index) => (
          <div key={index} className="relative mt-4 flex flex-col"> 
            <div className="flex items-center">   
              <input
                type="text"
                id="to"
                placeholder="Keyword :"
                className="w-full p-2 rounded-lg bg-black text-white placeholder-white border border-white focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                value={keyword}
                onChange={(e) =>  
                  setKeywordBlocks(keywordBlocks.map((kw, i) => (i === index ? e.target.value : kw)))
                }
               />
              <button onClick={() => removeKeywordBlock(index)} className="pl-3 py-2 text-white flex items-center">
                <img src={remove} alt="delete icon"/>
              </button>
            </div>
            {errors.keywordBlocks[index] && (    
              <span className="text-red-500 text-sm mt-2">{errors.keywordBlocks[index]}</span>
            )}   
          </div>   
        ))}

        {/* Button for adding a new keyword block */}
        <div className="mt-4 md:flex justify-between items-center">
          <button
            onClick={addKeywordBlock}
            className="px-2 py-1 w-full md:w-[180px] bg-white rounded-md text-black text-sm sm:text-base flex justify-center items-center"
          >
            <FiPlusCircle /> <span> Add Keyword Block </span>
          </button>

          {/* Cancel and Save buttons */}
          <div className="mt-4 md:mt-0 flex justify-between items-center">
            <button
              className={`${
                cancel
                  ? "bg-white text-black border border-white"
                  : "bg-black text-white border border-white"
              } px-3 py-1 w-24 rounded-md my-3 md:m-2`}
              onClick={() => handleButtonClick("cancel")}
            >  
              Cancel
            </button> 
            <button
              className={`${ 
                save
                  ? "bg-white text-black border border-white"
                  : "bg-black text-white border border-white "
              } px-3 py-1 w-24 rounded-md`}
              onClick={() => handleButtonClick("save")}  
            >
              Save
            </button>
          </div>
        </div>

        {/* Radio buttons for Single or Multiple blocks */}
        <div className="flex justify-between md:justify-center space-x-8 sm:space-x-12 mb-4">
          {["Single", "Multiple"].map((label, idx) => (
            <div
              key={idx}
              className={`flex items-center space-x-2 border-gray-600 p-1 rounded-md ${
                isMultiple === (label === "Multiple")
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black border border-white"
              }`}
            >
              <input
                type="radio"
                id={label}
                name="type"
                className="accent-green-500 w-4 h-4"   
                onClick={() => {
                  setIsMultiple(label === "Multiple");
                  if (label === "Single" && UrlBlocks.length > 1) SetUrlBlocks([UrlBlocks[0]]);
                }}
              />
              <label htmlFor={label} className="text-inherit w-[56px]">{label}</label>
            </div>
          ))}
        </div>

        {/* Replace variable options */}
        <div className="space-y-4"> 
          <div className="flex items-center space-x-2">
            <label htmlFor="replaceVariable" className="text-[13px] font-semibold">
              Replace Variable / URL:      
            </label>
            <div className="flex items-center space-x-2"> 
              <input 
                id="yes"
                type="radio"   
                name="keyword"
                value="yes"   
                onChange={handleRadioChange}
                className="accent-green-500 w-4 h-4" 
              />
              <label htmlFor="yes" className="text-sm cursor-pointer">Yes</label>
            </div>
 
            <div className="flex items-center space-x-2">  
              <input   
                id="no"
                type="radio"  
                name="keyword"
                value="no"
                onChange={handleRadioChange}
                className="accent-green-500 w-4 h-4"  
              />  
              <label htmlFor="no" className="text-sm cursor-pointer">No</label>
            </div>
          </div>   

          {/* Display additional options when 'Yes' is selected for replace variable */}
          {showOptions && (  
            <div className="flex items-center space-x-4 pl-28 md:pl-40">
              <div className="flex items-center space-x-2">
                <input
                  id="same"
                  type="radio"  
                  name="subKeyword"           
                  value="same"          
                  className="accent-green-500 w-4 h-4"
                />
                <label htmlFor="some" className="text-sm cursor-pointer">Same</label>
              </div>

              <div className="flex items-center space-x-2">  
                <input    
                  id="different"      
                  type="radio"
                  name="subKeyword" 
                  value="different"    
                  className="accent-green-500 w-4 h-4"
                />
                <label htmlFor="different" className="text-sm cursor-pointer">Different</label>
              </div>
            </div>
          )}
        </div>
 
        {/* Render URL blocks */}
        {UrlBlocks.map((block, index) => (
          <div key={index}>
            <div className="flex items-center mt-4">
              <div className="bg-black p-2 md:p-4 rounded-md border border-white  w-full">
                <div className="relative flex">
                  <input
                    type="text"  
                    placeholder="Match Word :"
                    className="w-full p-1 rounded-lg bg-black placeholder-white font-semibold text-white border border-none outline-none"
                    value={block.matchWord}   
                    onChange={(e) => handleChange(index, "matchWord", e.target.value)}
                  />
                </div>
                <div className="flex items-center">    
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="ml-2 items-center">
                    <img src={replace} alt="replace"/>
                  </span>
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Replace Word :"
                    className="w-full  p-1 rounded-lg bg-black placeholder-white font-semibold text-white border-none outline-none"
                    value={block.replaceWord}
                    onChange={(e) => handleChange(index, "replaceWord", e.target.value)}     
                  />
                </div>
              </div>

              {/* Button to add new URL block */}
              {isMultiple && (
                <button onClick={addUrlBlock} className="pl-3 py-2 text-white flex items-center">
                  <FiPlusCircle size={18} />
                </button>
              )}
            </div>

            {/* 'To' URL input */}
            <div className="relative mt-4 flex">  
              <label htmlFor="to" className="absolute -top-2 left-4 bg-black px-1 text-sm text-white">
                To:
              </label>
              <input
                type="text"     
                id="to"  
                placeholder="Enter channel URL"
                className="w-full p-2 rounded-lg bg-black text-white placeholder-white border border-white focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                value={block.toField}
                onChange={(e) => handleChange(index, "toField", e.target.value)}
              />   
              <div className="absolute right-10 md:right-13 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer">
                <img className="h-4 w-4" src={icon} alt="Telegram icon" />
              </div>   
              <button onClick={() => removeUrlBlock(index)} className="pl-3 py-2 text-white flex items-center">
                <img src={remove} alt="delete icon" />
              </button>
            </div>
          </div>
        ))}

        {/* Submit button */}
        <div className="flex justify-center space-x-4 mt-4">
          {["All", "Limited", "Live"].map((label) => (
            <button  
              key={label}
              className="px-4 w-24 py-2 bg-black border font-semibold border-white rounded-3xl text-white hover:bg-blue-600 text-sm sm:text-base"
            >  
              {label}
            </button>
          ))}
        </div>

        {/* Manually Enter Message Number */}
        <div className="flex flex-col items-center mt-6">
          <input
            type="text"
            placeholder="Enter Manually Message Number"
            className="mt-1 p-2 rounded-lg text-sm text-center w-full sm:w-80 bg-black text-white border border-gray-600 outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className=" w-24 py-2 mt-4 bg-blue-600 rounded-3xl font-extrabold text-white hover:bg-blue-800 text-xl sm:text-base"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetailPage;