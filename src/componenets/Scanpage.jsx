import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { contextData } from "../ContextData";
import { useNavigate } from 'react-router-dom';

const Scanpage = () => {
  let navigate = useNavigate();
  const [result, setResult] = useState("No result");
  const [action, setAction] = useState("");
  const [scanning, setScanning] = useState(false);
  const { data, db } = useContext(contextData);
  const refresh = () => { setTimeout(() => { setResult("No result"); setScanning(false); setAction(''); }, 3000) }

  // useEffect(() => { 
  //     <p>
  //     {result}
  //     </p>

  // } , [scanning])

  const HandleResults = (x, error) => {

    if (x && result == "No result") {
      console.log(" Results ", x.text)
      setResult(x.text);
      setScanning(true);
    }
  };

  return (
      <div class="container mx-auto mt-10">
      <button onClick={() => { navigate('/dot-local-admin/') }} id="backButton" class="flex items-center text-white">
        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back
      </button>
      <div className="flex flex-col  md:p-0  md:flex-row-reverse items-center gap-4 justify-center mt-2 md:mt-4 relative">
        <QrReader
          className=" w-[90%] md:w-[50%]  "
          onResult={HandleResults}
          constraints={{ facingMode: "environment" }}
        />
        <Toaster />
        <div>
          <div class="px-4 sm:px-0">
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
          </div>
          <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-white">Full name</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-white">Application for</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-white">Email address</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-white">Salary expectation</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
              </div>
            </dl>
          </div>
          <button type="submit" class="rounded-md bg-indigo-600 px-20 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 align-content: content-around">
            Register
          </button>
        </div>

      </div>
    </div>
  );
};

export default Scanpage;
