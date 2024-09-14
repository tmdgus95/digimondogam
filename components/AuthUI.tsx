"use client";

import { supabaseClient } from "@/lib/client/supabaseClient";

import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthUI = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[500px]">
        <Auth
          supabaseClient={supabaseClient}
          providers={["google"]}
          appearance={{ theme: ThemeSupa }}
          redirectTo={process.env.NEXT_PUBLIC_REDIRECT_TO}
          onlyThirdPartyProviders
          queryParams={{ prompt: "consent" }}
        />
      </div>
    </section>
  );
};

export default AuthUI;
