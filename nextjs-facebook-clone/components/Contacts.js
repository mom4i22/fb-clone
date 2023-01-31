import Image from "next/image";
import React from "react";

const Contacts = ({ name, imageSrc, status }) => {
  return (
    <div className="flex items-center space-x-2 py-2 pl-1 hover:bg-gray-200 rounded-l-xl cursor-pointer relative">
      <Image
        src={imageSrc}
        height={40}
        width={40}
        className="rounded-full cursor-pointer"
        alt="userImage"
      />
      <p className="hidden sm:inline-flex text-sm">{name}</p>
      {status === "Online" && (
        <div className="bg-green-500 h-3 w-3 rounded-full absolute left-5 bottom-2 border-2"></div>
      )}
      {status === "Offline" && (
        <div className="bg-gray-500 h-3 w-3 rounded-full absolute left-5 bottom-2 border-2"></div>
      )}
    </div>
  );
};

export default Contacts;
