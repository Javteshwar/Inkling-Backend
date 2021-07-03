const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { checkAdminPass } = require('../middleware/adminPassMiddleware');
const { authorizeToken } = require('../middleware/authorizeTokenMiddleware');

const createToken = (id) => {
    return jwt.sign({ id }, 'super awesome secret key that cannot be cracked');
}

const handleErrors = function (error) {
    const errorRes = { error: true, message: '' };

    //User does not exist
    if (error.message === 'incorrect email')
        errorRes.message = 'Entered Email does not exist';

    //Password Incorrect
    if (error.message === 'incorrect password')
        errorRes.message = 'Entered Password is incorrect';

    //Duplicate Email
    if (error.code === 11000) {
        errorRes.message = 'Email already registered';
        return errorRes;
    }

    //User already Logged In
    if (error.message === 'already logged in') {
        errorRes.message = 'User aready logged in at some other device';
        return errorRes;
    }

    //User Validation Errors
    if (error.message.includes('user validation failed'))
        Object.values(error.errors).forEach(({ props }) => {
            errorRes[props.path] = props.message;
        });
    if (errorRes.message === '')
        errorRes.message = error.message;
    return errorRes;
}

module.exports.signUpPost = async function (req, res) {
    try {
        const { email, password, isAdmin, adminPassword } = req.body;
        if (isAdmin)
            await checkAdminPass(adminPassword);
        const usr = await User.create({ email, password, isAdmin, isLoggedIn: true });
        const tkn = createToken(usr._id);
        res.status(202).json({ error: false, userToken: tkn });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(401).json(error);
    }
}

module.exports.loginPost = async function (req, res) {
    try {
        console.log("Logging In");
        const { email, password } = req.body;
        const usr = await User.login(email, password);
        const tkn = await createToken(usr._id);
        res.status(202).json({ error: false, userToken: tkn });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(402).json(error);
    }
}

module.exports.userDetailsGet = async function (req, res) {
    const tkn = req.header('Authorization');
    try {
        const usr = await authorizeToken(tkn);
        res.status(200).json({ error: false, email: usr.email, isAdmin: usr.isAdmin });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(400).json(error);
    }
}

module.exports.upgradeAccountPost = async function (req, res) {
    try {
        const { adminPassword } = req.body;
        await checkAdminPass(adminPassword);
        const tkn = req.header('Authorization');
        var usr = await authorizeToken(tkn);
        usr.isAdmin = true;
        await usr.save();
        res.status(200).json({ error: false, message: "User upgraded to Admin" });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(403).send(error);
    }
}

module.exports.logoutGet = async function (req, res) {
    const tkn = req.header('Authorization');
    try {
        const usr = await authorizeToken(tkn);
        usr.isLoggedIn = false;
        await usr.save()
        res.status(203).json({ error: false });
    }
    catch (err) {
        const error = handleErrors(err);
        res.status(403).send(error);
    }
}