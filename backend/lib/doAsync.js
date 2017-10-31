module.exports = (fn) => { 
    return async (req, res, next) => {
        await fn(req, res, next).catch(next) 
    };
}
//라우팅 핸들러 함수에 async를 사용하기 위해선 에러를 catch해야.
//http://programmingsummaries.tistory.com/399 참조