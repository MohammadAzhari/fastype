import { words } from "../utils/words";

let wordsArr = words.split("\n");
const getRandomNum = () => Math.floor(Math.random() * (wordsArr.length - 1));

export const getWords = (n) => {
  let str = "";
  for (let i = 0; i < n; i++) {
    let num = getRandomNum();
    str += wordsArr[num] + " ";
  }
  return str;
};
