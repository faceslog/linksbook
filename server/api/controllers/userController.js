const User = require("../models/User");
const { CRYPTO } = require("../../utils/crypto");
const Validate = require("../../utils/validation");

exports.registerNewUser = async (req, res) => {
    try
    {
        if(!Validate.verifyUsername(req.body.username)) return res.status(409).json({ message: "Username is not valid"});
        if(!Validate.verifyEmail(req.body.email)) return res.status(409).json({ message: "Email is not valid"});
        if(!Validate.verifyPassword(req.body.password)) return res.status(409).json({ message: "Password is not valid"});

        let usersWithSameCredentials = await User.find({ $or: [ { username: req.body.username }, { email: CRYPTO.encrypt(req.body.email) } ] });

        if(usersWithSameCredentials.length >= 1)
        {
            return res.status(409).json({
                message: "Username or Email is already Used !"
            });
        }

        // Create and save the new user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();

        // Get the data that will be sent
        let data = await user.getSafeData();

        // Generate an auth token
        const token = await user.generateAuthToken();
        // Send the data with the auth token
        res.status(201).json({ data, token });
    }
    catch (err)
    {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    try
    {
        if(Validate.verifyUsername(req.body.username)) return res.status(409).json({ message: "Mmh looks like its not an username"});

        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findByCredentials(username, password);

        if (!user) {
            return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }

        const token = await user.generateAuthToken();
        // Send only the safe data
        let data = await user.getSafeData();

        res.status(201).json({ data, token });
    }
    catch (err)
    {
        res.status(400).json({ err: err });
    }
};

exports.getUserDetails = async (req, res) => {
    // User data will be decrypted from the JWT payload
    await res.json(req.userData);
};

exports.getUserByUsername = async (req, res) => {
    try
    {
        // We look to find the User by his username
        const user = await User.findOne({ username: req.params.username }).populate("links");
        // If the user does not exist
        if(!user)
        {
            return res.status(404).json({ error: "User does not exist" });
        }

        let data = await user.getBasicData();

        res.status(200).json({ data });
    }
    catch (err)
    {
        res.status(400).json({ err: err });
    }
};

exports.getUsers = async (req, res) => {
    try
    {
        // We look and send all the Users
        const user = await User.find().populate("links");
        res.status(200).json({ user });
    }
    catch (err)
    {
        res.status(400).json({ err: err });
    }
};