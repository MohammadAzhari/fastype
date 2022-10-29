import { leaderboard } from "../../controllers/handlers";
import players from "../../models/players";
import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  await connectDB();
  await players.deleteMany();
  res.send("ok");
}
