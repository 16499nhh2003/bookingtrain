const moment = require('moment');
function createDate(dateStr) {
    const formattedDate = moment(dateStr, 'MM/DD/YYYY').toDate();
    console.log(formattedDate.toLocaleString());
    return formattedDate
}
function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?-=[];.,/';

    let password = '';
    const passwordLength = 10;

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}
const generateConfirmationCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
};


module.exports = {
    createDate, generateRandomPassword, generateConfirmationCode
}