const bcrypt = require('bcryptjs');

//metodo para encryptar contraseñas
const helpers = {};
helpers.encryptPassword = async (password) => {
    //10 saltos para una contraseña segura
    const salt = await bcrypt.genSalt(10);
    //le pasamos la contraseña guadada en texto plano y los saltos que dara
    const passcript = await bcrypt.hash(password, salt);
    return passcript;
};

helpers.matchPass = async (password, savePass) => {
    try {
       return await bcrypt.compare(password, savePass);
    } catch (e) {
        console.log(e);
    }
};


module.exports = helpers;