import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { getWords } from "../logic/chars";
import { config } from "../utils/configApi";

export default function Game({ words }) {
  let score = 0;
  const [userTypes, setUserTypes] = useState("");
  const [time, setTime] = useState(60);
  const [name, setName] = useState("");
  const [over, setOver] = useState(false);
  const [load, setLoad] = useState(true);
  const [progressBar, setProgressBar] = useState(0);
  const router = useRouter();

  const changeProgress = (n) => {
    setInterval(() => {
      setProgressBar((prevProgress) =>
        prevProgress < n ? prevProgress + 1 : prevProgress
      );
    }, 50);
  };

  const finish = async (s) => {
    try {
      const { data } = await axios.post(
        "/api/play",
        {
          name,
          score: s,
        },
        config
      );
      setOver(data);
      changeProgress(data.percent);
    } catch (error) {}
  };

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      load && finish(score);
      setLoad(false);
    }
  });

  useEffect(() => {
    let n = window.localStorage.getItem("name");
    if (!n) router.push("/");
    setName(n);
  }, []);

  const preventCopyPaste = (e) => {
    e.preventDefault();
    alert("Copying and pasting is not allowed!");
  };

  return (
    <div className="w-full flex-col items-center h-[100vh] bg-slate-100">
      <div className="flex items-center justify-between p-10">
        <div className="rounded-full bg-white p-3">
          <span className="font-bold"> {name}</span>
        </div>
        <div
          className={`rounded-full ${
            time < 20 ? "bg-red-600" : "bg-green-600"
          }  text-white p-3`}
        >
          time:
          <span className="font-bold"> {time}</span>
        </div>
      </div>
      {over === false ? (
        <div>
          <div className="text-[25px] font-bold text-center">
            type this words
          </div>
          <div className="text-center">hint: dont forget the spaces</div>
          <div className="flex items-center justify-center mt-3">
            <div className="rounded-lg text-[20px] bg-white p-3 w-[80%]">
              {words.split("").map((char, i) => {
                let con;
                if (i >= userTypes.length) {
                  con = 1;
                } else if (char === userTypes[i]) {
                  con = 2;
                  score++;
                } else {
                  con = 3;
                }
                return (
                  <span
                    key={i}
                    className={
                      con === 1
                        ? ""
                        : con === 2
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <input
              type="text"
              autoFocus
              onCopy={(e) => preventCopyPaste(e)}
              onPaste={(e) => preventCopyPaste(e)}
              onCut={(e) => preventCopyPaste(e)}
              placeholder="click here to open your keyboard"
              className="text-white w-[50%] mt-3 p-2"
              onChange={(e) => {
                setUserTypes(e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-lg p-6 h-[60%]">
          <div className="text-[25px] font-bold text-center">
            you got {over.score} points
          </div>
          <div className="w-[80%] mt-10 m-auto bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="bg-slate-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progressBar}%` }}
            >
              {progressBar}%
            </div>
          </div>
          <div className="text-[25px] mt-10 font-bold text-center">
            you are higher than <br /> {progressBar}% form others{" "}
            <BiWorld className="inline" />
          </div>
          <div className="flex items-center justify-center w-full">
            <Link
              href={"/"}
              className="cursor-pointer m-10 rounded-lg p-3 bg-slate-900 text-lg font-semibold text-white"
            >
              play again!
            </Link>
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
  );
}

export async function getServerSideProps() {
  let words = getWords(50);
  return {
    props: { words },
  };
}
