import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    accountId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    officialName: {
      type: String,
    },

    type: {
      type: String,
      required: true,
    },

    subtype: {
      type: String,
    },

    holderCategory: {
      type: String,
      enum: ["personal", "business"],
    },

    mask: {
      type: String,
    },

    availableBalance: {
      type: Number,
    },

    currentBalance: {
      type: Number,
      required: true,
    },

    creditLimit: {
      type: Number,
    },

    currency: {
      type: String,
      default: "USD",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Account", accountSchema);
