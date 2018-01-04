export const stringToPositive = (arg) => {
    if(/^(\+)?([0-9]+)$/.test(arg)) {
        return Number(arg);
    }
    return NaN;
}

export const getCommentWriteTime = (timeStamp, currentTime) => {
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

export const getArticleWriteTime = (timeStamp, currentTime) => {
    const time = new Date(timeStamp);
    let first, last;
    if(time.getDate() !== currentTime.getDate()) {
        first = time.getMonth();
        last = time.getDate();
        return (first < 10 ? '0' + first : first) + '-' + (last < 10 ? '0' + last : last);
    }else {
        const bt = currentTime.getHours() - time.getHours();
        if(bt === 0) {
            return (currentTime.getMinutes() - time.getMinutes()) + '분 전';
        }
        first = time.getHours();
        last = time.getMinutes();
        return (first < 10 ? '0' + first : first) + ':' + (last < 10 ? '0' + last : last);
    }
}