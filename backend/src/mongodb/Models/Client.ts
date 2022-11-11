import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: String,
  surname: String,
  email: String,
  country: String,
});

export const ClientMongo = mongoose.model("Client", schema);
