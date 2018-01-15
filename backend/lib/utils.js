module.exports.stringToPositive = (arg) => {
    if(/^(\+)?([0-9]+)$/.test(arg)) {
        return Number(arg);
    }
    return NaN;
}

module.exports.boardLevelCheck = (level) => {
    let result = true;
    level.forEach(element => {
        if(element < 0 && elemnt > 5){
            result = false;
        }
    });
    return result;
}