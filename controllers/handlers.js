import PlayersModel from "../models/players";

export const addPlayer = async (req, res) => {
  try {
    const { score } = req.body;
    const players = await PlayersModel.find();
    await PlayersModel.create(req.body);
    let lower = 0;
    for (let p of players) {
      if (p.score < score) lower++;
    }

    let percent = (lower * 100) / players.length;
    if (players.length === 0) percent = 0;
    res.status(200).json({
      percent,
      score,
    });
  } catch (error) {
    res.status(400).send("error");
  }
};

export const leaderboard = async (req, res) => {
  let players = await PlayersModel.find();
  res.send(players);
};
