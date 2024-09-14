"use client";

import React from "react";
import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="mt-12 flex flex-col items-center">
      <div>
        <DotLoader />
      </div>
      <div className="my-2 font-bold">Loading...</div>
    </div>
  );
};

export default Loading;
