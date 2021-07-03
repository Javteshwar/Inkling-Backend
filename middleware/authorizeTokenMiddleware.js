const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.authorizeToken = async function (tkn) {
    if (!tkn) throw Error('No Token Sent');
    if (tkn.startsWith('Bearer'))
        tkn = tkn.slice(7, tkn.length).trimLeft();
    const decoTkn = jwt.verify(tkn, 'super awesome secret key that cannot be cracked');
    const usr = await User.findOne({ _id: decoTkn['id'] });
    return usr;
}
