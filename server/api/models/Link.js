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

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;