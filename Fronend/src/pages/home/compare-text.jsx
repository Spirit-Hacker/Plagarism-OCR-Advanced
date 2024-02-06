import React, { useState } from "react";
import Loader from "../../components/Loader";
import PieChart from "../../components/PieChart";
import { useNavigate } from "react-router-dom";

const TextComparison = () => {
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleTextInputChange1 = (e) => {
    setTextInput1(e.target.value);
  };

  const handleTextInputChange2 = (e) => {
    setTextInput2(e.target.value);
  };

  const handleCompare = async () => {
    try {
      setLoader(true);
      const response = await fetch("http://127.0.0.1:8000/two_text_comparison/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `q1=${textInput1}&q2=${textInput2}`,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log("Comparison result:", data);
      // setComparisonResult(data.result);
      setComparisonResult(data);
      setLoader(false);
    } catch (error) {
      console.error("Error occurred during comparison:", error.message);
    }
  };

  return (
    <div className={`bg-cover w-full h-[100vh] bg-center text-white bg-[#000814] flex ${loader ? "justify-center items-center" : "justify-center"} px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14 overflow-y-auto`}>
      { loader ? <Loader/> :
      !comparisonResult ? 
      <div className="w-[60%] rounded-lg overflow-hidden shadow-xl p-6 mt-5 mb-20">
        <h1 className="text-3xl font-semibold mb-4 text-center text-white">
          Text Comparison
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex justify-between w-full">
            <div className="w-full mr-2">
              <h2 className="text-lg font-semibold mb-2 text-left text-white">Text 1</h2>
              <textarea
                value={textInput1}
                onChange={handleTextInputChange1}
                className="w-full px-3 py-2 bg-slate-800 placeholder-gray-300 text-gray-300 border rounded focus:outline-none focus:ring focus:ring-yellow-500"
                rows="10"
                placeholder="Enter text for comparison..."
              ></textarea>
            </div>
            <div className="w-full ml-2">
              <h2 className="text-lg font-semibold mb-2 text-left text-white">Text 2</h2>
              <textarea
                value={textInput2}
                onChange={handleTextInputChange2}
                className="w-full px-3 py-2 bg-slate-800 placeholder-gray-300 text-gray-300 border rounded focus:outline-none focus:ring focus:ring-yellow-500"
                rows="10"
                placeholder="Enter text for comparison..."
              ></textarea>
            </div>
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <button
              onClick={handleCompare}
              className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
            >
              Compare
            </button>
          </div>
        </div>
      </div>
      :
        <div className="flex w-[80%] justify-between">
          <div className="flex flex-col gap-4 pt-10">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">Comparison Result</h2>
            <p><span className="text-lg text-cyan-400">Similarity: </span>{`${comparisonResult.result}%`}</p>
            <div onClick={() => navigate("/")} className="text-black font-semibold cursor-pointer mt-4 bg-yellow-500 w-[150px] text-center rounded-lg py-2">Go back</div>
          </div>
          <PieChart data={comparisonResult.result}/>
        </div>
      }
    </div>
  );
};

export default TextComparison;
