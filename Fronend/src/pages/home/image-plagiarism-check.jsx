import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import PieChart from "../../components/PieChart";

const Image = () => {
  const [image, setImage] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [imageAdded, setImageAdded] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageAdded(true)
  };

  const handleGetStarted = async () => {
    // Check if image is available
    if (!image) {
      console.error("No image available for submission");
      return;
    }
  
    // Create FormData object to send the image as multipart/form-data
    const formData = new FormData();
    formData.append("image", image);
  
    // Make API call on submit
    try {
      setLoader(true)
      const response = await fetch("http://127.0.0.1:8000/image_plagiarism_check/", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Plagiarism check result:", result);
  
        // Set the result data in state
        setApiResult(result);
      } else {
        console.error("API request failed");
      }
      setLoader(false);
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <div className={`bg-cover w-full h-[100vh] bg-center text-white bg-[#000814] flex ${loader ? "justify-center items-center" : "justify-center"} px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14 overflow-y-auto`}>
      { loader ? <Loader/> :
      !apiResult ?
      <div className="bg-[#000814] w-full flex flex-col items-center rounded-lg overflow-hidden shadow-xl mb-20 mx-auto">
        <h1 className="text-3xl font-semibold mt-10 mb-4 text-center text-white">
          Image Plagiarism
        </h1>
        <div className="flex w-[60%] flex-col items-center justify-center gap-10">
          <div className="w-full flex flex-col items-center">
              <label htmlFor="file" className="text-lg bg-slate-800 py-2 px-4 rounded-lg cursor-pointer font-semibold mb-2 text-white text-center">Upload Image</label>
              {
                imageAdded && (
                  <p className="text-xs text-pink-500 font-semibold">Image Added</p>
                )
              }
              <input
                type="file"
                id="file"
                accept=".docx, .pdf, .txt"
                onChange={handleImageChange}
                className="w-full hidden px-3 py-2 text-gray-300 placeholder-gray-300 border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              />
            </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <button
              onClick={handleGetStarted}
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      :
      <div className="text-start w-[80%] flex justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">Result</h2>
          <p><span className="text-lg text-cyan-400 font-semibold">Plagiarism Percentage:</span> {apiResult.percent}%</p>
          {/* <p>Plagiarized Text: {apiResult.plagiarized_text}</p> */}
          <p className="text-cyan-400 font-semibold">Links:</p>
          <ul>
            {Object.entries(apiResult.link).map(([link, percentage]) => (
              <li key={link}>{link} : <span className="text-red-500">{percentage}%</span></li>
            ))}
          </ul>
          <div onClick={() => navigate("/")} className="text-black font-semibold cursor-pointer mt-4 bg-yellow-500 w-[150px] text-center rounded-lg py-2">Go back</div>
        </div>
        <PieChart data={apiResult.percent}/>
      </div>
            
      }
    </div>
  );
};

export default Image;
