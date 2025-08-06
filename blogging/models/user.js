const { createHmac, randomBytes } = require('node:crypto');
const { Schema, model } = require('mongoose');
const { createTokenForUser } = require('../services/auth');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "/public/images/user.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},
{ timestamps: true }
);

// ✅ FIXED: Added 'hex' to convert buffer to string
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString('hex');  // 🔧 FIX
    const hashePassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashePassword;
    next();
});

// ✅ FIXED: Use 'statics' instead of 'static' and corrected return value
userSchema.statics.matchpasswordAndGenerateToken = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('user not found');

    const salt = user.salt;
    const hashePassword = user.password;

    const userprovidedhash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if (hashePassword !== userprovidedhash) throw new Error('incorrect password');

    // Return safe copy without password and salt
    // const safeUser = user.toObject();
    // delete safeUser.password;
    // delete safeUser.salt;
    // return safeUser;

    const token = createTokenForUser(user);
    return token
};

const user = model('user', userSchema);
module.exports = user;
