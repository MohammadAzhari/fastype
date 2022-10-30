import Image from "next/image";
import keyboard from "../public/keyboard-icon-vector-sign-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-134067880.jpg";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { BiWorld } from "react-icons/bi";
import { AiOutlineCopyright, AiOutlineFire } from "react-icons/ai";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    if (name !== "") {
      setLoading(true);
      window.localStorage.setItem("name", name);
      router.push("/game");
    } else {
      alert("enter your name");
    }
  };

  useEffect(() => {
    let n = window.localStorage.getItem("name");
    if (n) setName(n);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-slate-100 h-[85vh]">
        <div className="w-full flex flex-col items-center justify-between h-full relative">
          <div className="font-bold m-9 h-[20%] text-[40px]">
            <Typewriter
              options={{
                strings: [
                  "show us your typing speed!",
                  "compete with your friends",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="">
            {expand ? (
              <div className="">
                <input
                  type="text"
                  value={name}
                  className="p-3 rounded-lg focus:outline-none"
                  placeholder="enter your nickname"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button
                  onClick={handleSubmit}
                  className="ml-4 cursor-pointer rounded-lg p-3 bg-slate-900 text-lg font-semibold text-white"
                >
                  {loading ? "loading ..." : "start the game!"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setExpand(true)}
                  className="cursor-pointer rounded-lg p-3 bg-slate-900 text-lg font-semibold text-white"
                >
                  play now! <AiOutlineFire className="inline" />
                </button>
                <div className="mt-10">
                  <Link
                    href={"/leaderboard"}
                    className="cursor-pointer m-10 rounded-lg p-3 bg-green-600 text-lg font-semibold text-white"
                  >
                    see leaderboard <BiWorld className="inline" />
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div>
            made by{" "}
            <span className="font-bold">
              <AiOutlineCopyright className="inline" /> mohammad azhari
            </span>
          </div>
          <Image
            alt="fastype"
            src={keyboard}
            width="300"
            height="300"
            className="absolute z-10 opacity-5 top-5"
          />
        </div>
      </div>
    </div>
  );
}
