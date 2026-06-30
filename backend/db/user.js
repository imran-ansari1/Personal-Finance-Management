import {mongoose} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true    
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
   refreshToken: {
    type: String,
    trim: true  
  },
  plaidAccessToken: {
  type: String,
},

plaidItemId: {
  type: String,
},
} , { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
   this.password = await bcrypt.hash(this.password, 10)
   next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    return token;
  }

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    return token;
  }


const User = mongoose.model("User", userSchema);



export default User;