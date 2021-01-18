const User = require("../model/User");

exports.registerNewUser = async (req, res) => {
    try {
        let usersWithSameEmails = await User.find({ email: req.body.email });

        if(usersWithSameEmails.length >= 1)
        {
            return res.status(409).json({
                message: "Email is already Used !"
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