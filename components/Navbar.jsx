import Link from "next/link";
import React from "react";
import { FaKeyboard } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between m-5">
      <Link href={"/"}>
        <div className="font-bold text-lg">
          Fastype <FaKeyboard className="inline" />
        </div>
      </Link>
      <select className="bg-slate-100 cursor-pointer p-2 rounded-lg focus:outline-none">
        <option>English</option>
        {/* <option></option> */}
      </select>
    </div>
  );
}
