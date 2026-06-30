import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },

    transactionId: {
      type: String,
      required: true,
      unique: true,
    },

    accountId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    merchantName: {
      type: String,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "USD",
    },

    date: {
      type: Date,
      required: true,
    },

    authorizedDate: {
      type: Date,
    },

    category: [
      {
        type: String,
      },
    ],

    pending: {
      type: Boolean,
      default: false,
    },

    paymentChannel: {
      type: String,
    },
    plaidCursor: {
    type: String,
    default: null,
    },
   

transactionType: {
  type: String,
  enum: ["credit", "debit"],
},

personalFinanceCategory: {
  type: String,
},

logoUrl: {
  type: String,
},

website: {
  type: String,
},
  },
  
  
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);