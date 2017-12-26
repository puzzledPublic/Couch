export const stringToPositive = (arg) => {
    if(/^(\+)?([0-9]+)$/.test(arg)) {
        return Number(arg);
    }
    return NaN;
}

export const getTime = (timeStamp, currentTime) => {
    const time = new Date(timeStamp);
    if(time.getDate() !== currentTime.getDate()) {
        return time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
    }
    const bt = currentTime.getHours() - time.getHours();
    if(bt === 0) {
        return (currentTime.getMinutes() - time.getMinutes()) + '분 전';
    }
    return bt + '시간 전';
}