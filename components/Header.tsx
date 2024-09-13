import React from "react";
import { CiLogout } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";

const Header = () => {
  return (
    <header className="flex h-20 w-full items-center justify-between bg-headerColor px-5 text-xl font-bold text-white">
      <div>디지몬 월드</div>
      <nav className="flex items-center gap-4 text-teal-200">
        <div className="hover:text-white">마이페이지</div>
        <CiLogout className="hover:text-white" />
        <FcGoogle className="hover:scale-125" />
      </nav>
    </header>
  );
};

export default Header;
