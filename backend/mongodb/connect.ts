import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_API as string)
  .then(() => console.log("Mongodb Connected"))
  .catch((error) => console.log(error));
