module.exports.stringToPositive = (arg) => {
    if(/^(\+)?([0-9]+)$/.test(arg)) {
        return Number(arg);
    }
    return NaN;
}