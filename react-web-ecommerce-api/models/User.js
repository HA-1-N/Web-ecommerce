const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true, // yêu cầu phải có khi gửi payload lên
            unique: true,  // username là suy nhất nên có unique
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        isAdmin: {
            type: Boolean,
            default: Boolean,
        },
    },

    {
        timestamps: true,
    },
);

module.exports = mongoose.model("User", UserSchema);
