const Link = require("../models/Link");
const User = require("../models/User");

// To register a new link use the auth Middleware before to verify the payload authenticity
// and to get the userData
exports.registerNewLink = async (req, res) => {
    try
    {
        let linkAlreadyExisting = await Link.find({ $and: [ { goto: req.body.goto }, { user: req.userData._id } ] });

        if(linkAlreadyExisting.length >= 1)
        {
            return res.status(409).json({
                message: "That link already exist !"
            });
        }
        // Create and save the new link
        const link = new Link({
            title: req.body.title,
            image: req.body.image,
            goto: req.body.goto,
            // user Id from the verified payload
            user: req.userData._id
        });
        let data = await link.save();

        // Check if the user exist
        const user = await User.findById(req.userData._id).populate("links");
        if(!user) return res.status(404).json({ error: "User does not exist" });

        // If the user exist save the link to the db
        user.links.push(link);
        await user.save();

        // Send the new link data as JSON
        res.status(201).json({ data });
    }
    catch (err)
    {
        res.status(400).json({ err: err });
    }
};