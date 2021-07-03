const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    fileNames: {
        type: [String],
        default: []
    }
});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function (email, password) {
    var usr = await this.findOne({ email });
    if (usr) {
        var auth = bcrypt.compare(password, usr.password);
        if (auth) {
            try {
                if (usr.isLoggedIn)
                    throw new Error('already logged in');
                usr.isLoggedIn = true;
                await usr.save();
                return usr;
            }
            catch (e) {
                throw e;
            }
        }
        throw new Error('incorrect password');
    }
    throw new Error('incorrect email');
}

const User = mongoose.model('user', UserSchema);
module.exports = User;