
//async await wapper method for catch error
export const doAsync = (fn) => {
    return async (params)=> {
        let result = await fn(params).catch((err)=> {
            return err.response;
        });
        return result;
    }
}