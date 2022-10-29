import { addPlayer } from "../../controllers/handlers";
import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  await connectDB();
  addPlayer(req, res);
}
