const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "hG5jFA3Jkt8TnLbBEYFMX8L";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [ true, "Please Include your username" ]
    },
    email: {
        type: String,
        required: [ true, "Please Include your email" ]
    },
    password: {
        type: String,
        required: [ true, "Please Include your password" ]
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Method will hash the password before saving the user model
userSchema.pre("save", async function (next) {
   const user = this;

   if(user.isModified("password"))
   {
       user.password = await bcrypt.hash(user.password, 10);
   }
   next();
});

// Method to generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

// Methods to search for a user by username and password.
userSchema.statics.findByCredentials = async(username, password) => {
    const user = await User.findOne({ username });

    if(!user) throw new Error({ error: "Invalid login details"});

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) throw new Error( { error:"Invalid Login Details"} );

    return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;