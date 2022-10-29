const letters = "abcdefghijklmnopqrstuvwxyz().,$";

const getRandomNum = () => Math.floor(Math.random() * (letters.length - 1));

const getSpaceAfter = () => Math.floor(Math.random() * 6 + 4);

export const getWords = (n) => {
  let str = "";
  let space = getSpaceAfter();
  for (let i = 0; i < n; i++) {
    if (i % space === 0) {
      str += " ";
      space = getSpaceAfter();
    } else {
      let num = getRandomNum();
      str += letters[num];
    }
  }
  return str;
};
