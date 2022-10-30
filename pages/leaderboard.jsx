import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { config } from "../utils/configApi";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

export default function Leaderboard() {
  const [page, setPage] = useState(0);
  const [all, setAll] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  const handleClick = (n) => {
    let newPage = page + n;
    setCurrentList(all.slice(newPage * 10, newPage * 10 + 10));
    setPage(newPage >= 0 ? newPage : 0);
  };

  const setData = async () => {
    try {
      let { data } = await axios.get("/api/leaderboard", config);
      data = data.sort((a, b) => b.score - a.score);
      setAll(data);
      setCurrentList(data.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="flex items-center text-center w-[90%] m-auto">
        <div className="font-bold w-[20%]">rank</div>
        <div className="font-bold w-[50%]">name</div>
        <div className="font-bold">score</div>
      </div>
      {currentList.map((player, i) => (
        <div
          key={i}
          className="mt-3 flex text-center items-center bg-slate-100 rounded-lg w-[90%] m-auto"
        >
          <div className="font-bold w-[20%]">#{i + 1 + page * 10}</div>
          <div className="font-bold w-[50%]">{player.name}</div>
          <div className="font-bold">{player.score}</div>
        </div>
      ))}
      <div className="flex items-center w-full mt-5 justify-between">
        {page > 0 ? (
          <button
            onClick={() => handleClick(-1)}
            className="cursor-pointer m-10 rounded-lg p-2 bg-slate-900 text-white"
          >
            <BsFillArrowLeftSquareFill className="inline" /> prevous
          </button>
        ) : (
          <div></div>
        )}
        <button
          onClick={() => handleClick(1)}
          className="cursor-pointer m-10 rounded-lg p-2 bg-slate-900 text-white"
        >
          next <BsFillArrowRightSquareFill className="inline" />
        </button>
      </div>
    </div>
  );
}
