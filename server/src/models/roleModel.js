import mongoose from "mongoose";
const { Schema, model } = mongoose;

const roleSchema = new Schema({
  name: { type: String, enum: ["client", "manager", "super_admin"], required: true },
});

export default model("Role", roleSchema);
