"use client";


import React, {useState, useEffect} from "react";

const Confirm = () => {
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const storedTOken = localStorage.getItem("token");
  setToken(storedTOken);
}, []);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full border border-gray-300 rounded-xl p-5 flex flex-col gap-4">
        <h3 className="text-white text-center">Click here to Proceed</h3>
        <a
          href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=${process.env.NEXT_PUBLIC_URL}`}
          className="py-2 px-4 bg-secondary flex justify-center items-center text-white w-full rounded-xl"
        >
          Proceed
        </a>
      </div>
    </div>
  );
};

export default Confirm;
