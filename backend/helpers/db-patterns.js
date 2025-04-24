const checkEmail = (email = '') => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        throw new Error('Formato del correo electrónico no soportado');
    }
    return true;
}

const checkPassword = (password = '') => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
        throw new Error('La contraseña debe tener al menos 8 carácteres con números, mayúsculas y minúsculas');
    }
    return true;
}

const checkPhoneNumber = (tel = '') => {
    const regex = /^\d{9}$/;
    const number = tel.toString().replace(/\s+/g, ''); // quitamos los espacios si hay
    if (!regex.test(number)) {
        throw new Error('El número de teléfono debe constar de 9 dígitos');
    }
    return true;
}

module.exports = {
    checkEmail,
    checkPassword,
    checkPhoneNumber
}
