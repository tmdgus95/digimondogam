"use client";
import React from "react";
import { BounceLoader } from "react-spinners";

const Error = () => {
  return (
    <div className="mt-12 flex flex-col items-center">
      <div>
        <BounceLoader />
      </div>
      <div className="my-2 font-bold">There is something wrong...</div>
    </div>
  );
};

export default Error;
