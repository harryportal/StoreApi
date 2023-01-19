const generateUniqueDigits = (): string => {
    const chars: string[] = '0123456789'.split('');
    let uniqueDigits: string = '';
    for (let i = 0; i < 5; i++) {
        uniqueDigits += chars[Math.floor(Math.random() * chars.length)];
    }
    return uniqueDigits;
}

export default generateUniqueDigits