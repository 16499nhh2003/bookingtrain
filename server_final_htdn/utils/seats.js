const Seat = require('../models/seats')
function generateSeatCodes(numberOfSeats) {
    let seatCodes = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < numberOfSeats; i++) {
        const row = alphabet[Math.floor(i / 10)]; // Lấy ký tự cho hàng (A, B, C, ...)
        const seatNumber = (i % 10) + 1; // Số ghế trong hàng (01, 02, 03, ...)
        const seatCode = row + seatNumber.toString().padStart(2, '0');  // Kết hợp hàng và số ghế
        seatCodes.push({ code: seatCode, isBooked: false });
    }

    return seatCodes;
}

module.exports = {
    generateSeatCodes
}