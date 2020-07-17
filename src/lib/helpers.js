const bcrypt = require('bcryptjs');

//Objeto que se crea para extraer metodos para poder incriptar
const helpers = {};

helpers.encryptPassword = async (password) => {
    //le damos un patron de 10 requerido para poder cifrar
    const salt = await bcrypt.genSalt(10);
    //le pasamos la contraseña guadada en texto plano y el patron
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