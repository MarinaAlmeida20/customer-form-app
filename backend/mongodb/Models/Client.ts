import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
  country: String,
  postcode: String,
  address: String,
});

export const ClientMongo = mongoose.model("Client", schema);
