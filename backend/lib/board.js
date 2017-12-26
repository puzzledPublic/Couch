module.exports.getPaginationInfo = (articleCount, pageNum = 1, limit) => {
    const totalPageCount = Math.ceil(articleCount / limit);
    
    if(pageNum > totalPageCount) {
        pageNum = totalPageCount;
    }
    
    const startPage = Math.floor(pageNum / 10) * 10 + 1;
    const endPage = startPage + 9 > totalPageCount ? totalPageCount : startPage + 9;
        
    return {
        totalPageCount : totalPageCount,
        startPageNum: startPage,
        endPageNum: endPage
    }
}