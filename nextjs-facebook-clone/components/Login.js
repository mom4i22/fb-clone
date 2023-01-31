import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import facebook_name_logo from "../src/assets/facebook-name_logo.png";

const Login = () => {
  return (
    <div className="flex flex-col items-center mx-auto">
      <Image
        src={facebook_name_logo}
        alt="login"
        height={240}
        width={240}
        style={{ marginTop: 155 }}
      />
      <a
        onClick={signIn}
        className="px-20 py-2 z-10 text-2xl cursor-pointer mt-5 bg-blue-500 rounded-md text-white"
      >
        Login
      </a>
    </div>
  );
};

export default Login;
