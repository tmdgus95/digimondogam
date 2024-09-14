"use client";
import { supabaseClient } from "@/lib/client/supabaseClient";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const { session, user, fetchSession, resetSession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    console.log(user);
    console.log(session);
  }, [user, session]);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    resetSession();
  };

  const handleLogin = async () => {
    router.push("http://localhost:3000/auth");
  };

  const handleHome = async () => {
    router.push("http://localhost:3000");
  };

  return (
    <header className="flex h-20 w-full items-center justify-between bg-headerColor px-5 text-xl font-bold text-white">
      <div onClick={handleHome}>디지몬 월드</div>
      <nav className="flex items-center gap-4 text-teal-200">
        {user ? (
          <div className="flex items-center gap-2">
            <UserAvatar user={user} />
            <CiLogout className="hover:text-white" onClick={handleLogout} />
          </div>
        ) : (
          <FcGoogle className="hover:scale-125" onClick={handleLogin} />
        )}
      </nav>
    </header>
  );
};

export default Header;
