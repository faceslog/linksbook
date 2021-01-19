const mongoose = require("mongoose");

const linkSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please Include the title of the link"]
        },
        image: {
            type: String,
            required: [true, "Please Include the img link"]
        },
        goto: {
            type: String,
            required: [true, "Please Include the goto"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

// Methods to search for Links by user Id return null if nothing is found or return an array of JSON objects
linkSchema.statics.findByUser = async(userId) => {
    const links = await Link.find({ user: userId });

    if(links.length < 1) return null;

    return links;
};

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;