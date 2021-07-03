const Document = require('../models/document');
const { checkAdminPass } = require('../middleware/adminPassMiddleware');

const handleErrors = function (err) {
    if (err.code === 11000)
        return { error: true, message: "File with same name already exits" };
    return { error: true, message: err.message };
}
module.exports.storeDocumentsListGet = async function (req, res) {
    try {
        const docs = await Document.find();
        var resDocs = [];
        docs.forEach(e => {
            resDocs.push({ name: e.name, price: e.price });
        });
        res.status(207).json({ error: false, totalDocs: resDocs.length, documents: resDocs });
    }
    catch (e) {
        const error = handleErrors(e);
        res.status(407).json(error);
    }
}

module.exports.storeDocumentPost = async function (req, res) {
    try {
        const { fileName, filePrice, adminPassword } = req.body;
        await checkAdminPass(adminPassword);
        await Document.create({ error: false, name: fileName, price: filePrice });
        res.status(208).json({ error: false, fileName, filePrice });
    }
    catch (e) {
        const error = handleErrors(e);
        res.status(408).json(error);
    }
}