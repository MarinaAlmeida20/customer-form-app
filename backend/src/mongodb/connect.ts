import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Mongodb Connected"))
  .catch((error) => console.log(error));
