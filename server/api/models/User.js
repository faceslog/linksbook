const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "hG5jFA3Jkt8TnLbBEYFMX8L";

const userSchema = mongoose.Schema({
    // Important Credentials
    email: {
        type: String,
        required: [ true, "Please Include your email" ]
    },
    password: {
        type: String,
        required: [ true, "Please Include your password" ]
    },
    token: {
        type: String,
        default: null
    },
    adminRank:{
      type: Number,
      default: 0
    },
    // Global Public Information
    username: {
        type: String,
        required: [ true, "Please Include your username" ]
    },
    avatar: {
        type: String,
        default: "https://rohsco.rqoh.com/wp-content/uploads/sites/9/2019/09/default-profile.png"
    },
    welcomeText: {
        type: String,
        default: "Welcome to my links book"
    },
    bgColor: {
        type: String,
        default: "#070707"
    },
    bgImg: {
      type: String,
      default: null
    },
    links: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Link"
        }
    ]
});

// Method will hash the password before saving the user model
userSchema.pre("save", async function (next) {

   if(this.isModified("password"))
   {
       this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

// Method to generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {

    const token = jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            adminRank: this.adminRank
        }, JWT_SECRET, { expiresIn: 600 }); // expires in 10min

    // Unable to
    this.token = token;
    await this.save();

    return token;
};

// Methods that return as JSON the data that can be access by anyone and is not encrypted.
userSchema.methods.addLink = async function(link) {
    this.links.push(link);
    await this.save();
};

userSchema.methods.deleteLink = async function(linkId) {
    let index = this.links.indexOf(linkId);
    if(index <= -1) throw "This Link does not belong to this User";
    this.links.splice(index, 1);
    await this.save();
};

// Methods that return as JSON the data that can be access by anyone and is not encrypted.
userSchema.methods.getBasicData = async function() {
    return {
        username: this.username,
        avatar: this.avatar,
        welcomeText: this.welcomeText,
        bgColor: this.bgColor,
        bgImg: this.bgImg,
        links: this.links
    };
};
// Methods that return as JSON the data that is access to the dashboard or secure routes
userSchema.methods.getSafeData = async function() {
    return {
        email: this.email,
        adminRank: this.adminRank,
        username: this.username,
        avatar: this.avatar,
        welcomeText: this.welcomeText,
        bgColor: this.bgColor,
        bgImg: this.bgImg,
        links: this.links
    };
};
// Methods to search for a user by username and password.
userSchema.statics.findByCredentials = async(username, password) => {
    const user = await User.findOne({ username });

    // Si l'utilisateur n'existe pas
    if(!user) return null;
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // Si le mot de passe est incorrect
    if(!isPasswordMatch) return null;

    return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;