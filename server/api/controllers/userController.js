const User = require("../models/User");

exports.registerNewUser = async (req, res) => {
    try {
        let usersWithSameCredentials = await User.find({ $or: [ { username: req.body.username }, { email: req.body.email } ] });

        if(usersWithSameCredentials.length >= 1)
        {
            return res.status(409).json({
                message: "Username or Email is already Used !"
            });
        }

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        let data = await user.save();
        // Generate an auth token
        const token = await user.generateAuthToken();
        // Send the data with the auth token
        res.status(201).json({ data, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.loginUser = async (req, res) => {
    try
    {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findByCredentials(username, password);

        if (!user) {
            return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }

        const token = await user.generateAuthToken();
        // Send only the needed data
        let data = { username: username, email: user.email };

        res.status(201).json({ data, token });
    }
    catch (err)
    {
        res.status(400).json({ err: err });
    }
};

exports.getUserDetails = async (req, res) => {
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

        let data = {
            username: user.username,
            avatar: user.avatar,
            welcomeText: user.welcomeText,
            bgColor: user.bgColor,
            bgImg: user.bgImg,
            links: user.links
        }
        
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