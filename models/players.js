import mongoose from "mongoose";

const playerModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("PlayersModel", playerModel);
