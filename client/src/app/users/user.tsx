"use client";

import React from "react";
import Image from "next/image";
import addressIcon from "../../../public/address.svg";
import phoneIcon from "../../../public/phone.svg";
import { IUser } from "./users";

const User: React.FC<IUser> = ({ name, phone, address }) => {
  return (
    <div className="border-solid border-2 border-indigo-600 p-2 hover:border-dotted rounded">
      <h3 className="font-bold">{name}</h3>
      <div className="flex flex-auto items-start">
        <Image className="w-12" priority src={addressIcon} alt="Address" />
        <p>{address}</p>
      </div>
      <div className="flex flex-auto items-center">
        <Image className="w-8 mx-1" priority src={phoneIcon} alt="Phone" />
        <p>{phone}</p>
      </div>
    </div>
  );
};

export default User;
