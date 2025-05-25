"use client";

import Image from "next/image";

import React, { FC } from "react";



const HeroSection: FC = () => {


  return (
    <div className="relative w-full flex flex-col justify-center items-start text-white overflow-auto">
      <div className="absolute inset-y-0 left-0 w-full bg-black/80 z-10 to-transparent"></div>

      <div>
        <Image
          src={"/hero.jpg"}
          width={800}
          height={400}
          alt="Hero Image"
          className="w-screen h-[80vh] max-md:h-[70vh] object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="absolute text-left left-[10%] max-w-6xl max-md:w-[90%] px-4 sm:px-8 top-[40%] max-md:left-0 z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Unlimited <span className="text-primary">Entertainment</span>,{" "}
        </h1>
        <p className="text-lg sm:text-xl lg:text-4xl mt-4 max-w-3xl">
          All Your Favorite Movies, TV Shows & More!
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
