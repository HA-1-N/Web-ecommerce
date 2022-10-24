const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema(
    {
        size: {
            type: String,
        }
    }
)

module.exports = mongoose.model("Size", SizeSchema);