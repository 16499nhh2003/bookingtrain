const vietnameseLicensePlateRegex = /^[0-9]{2}[A-Z]-[0-9]{5}$/;
export function validateLicensePlates(licensePlates) {
    if (!licensePlates) {
        return 'License Plates is required';
    } else if (!vietnameseLicensePlateRegex.test(licensePlates)) {
        return 'Invalid License Plates format';
    }
    return '';
}