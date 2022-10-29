import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getWords } from "../logic/chars";
import { config } from "../utils/configApi";

export default function Game({ words }) {
  let score = 0;
  const [userTypes, setUserTypes] = useState("");
  const [time, setTime] = useState(60);
  const [name, setName] = useState("");
  const [over, setOver] = useState(false);
  const [load, setLoad] = useState(true);
  const router = useRouter();

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

  return (
    <div className="w-full flex-col items-center h-[100vh] bg-slate-100">
      <div className="flex items-center justify-between p-10">
        <div className="rounded-full bg-white p-3">
          <span className="font-bold"> {name}</span>
        </div>
        <div className="rounded-full bg-green-600 text-white p-3">
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
            <div className="rounded-lg bg-white p-3 w-[80%]">
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
              placeholder="click here to open your keyboard"
              className="text-white w-[50%] mt-3 p-2"
              onChange={(e) => {
                setUserTypes(e.target.value);
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="text-[25px] font-bold text-center">
            you got {over.score} points
          </div>
          <div className="text-[25px] font-bold text-center">
            you are higher than {over.percent} % form others
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  let words = getWords(500);
  return {
    props: { words },
  };
}
