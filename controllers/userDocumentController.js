const { authorizeToken } = require('../middleware/authorizeTokenMiddleware');
const User = require('../models/user');

module.exports.userDocsGet = async function (req, res) {
    try {
        const tkn = req.header('Authorization');
        const usr = await authorizeToken(tkn);
        res.status(205).json({ error: false, fileNames: usr.fileNames, fileNumber: usr.fileNames.length });
    }
    catch (e) {
        console.log(e);
        res.status(405).json({ error: true, message: e.message });
    }
}

module.exports.userDocPost = async function (req, res) {
    try {
        const { fileName } = req.body;
        const tkn = req.header('Authorization');
        const usr = await authorizeToken(tkn);
        usr.fileNames.push(fileName);
        await usr.save();
        res.status(206).json({ error: false, addedFile: fileName });
    }
    catch (e) {
        res.status(406).json({ error: true, message: e.message });
    }
}