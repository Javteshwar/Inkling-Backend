const bcrypt = require('bcrypt');

const adminPass = "$2b$10$iwsInInPecNSKAp1Pcza1uIT/9EXugsoUl7LmxA9LVS2uw7RaTvja";

const checkAdminPass = async (adminPassword) => {
    const passCheck = await bcrypt.compare(adminPassword, adminPass);
    if (!passCheck) {
        throw new Error("Wrong Admin Password");
    }
}

module.exports = { checkAdminPass };