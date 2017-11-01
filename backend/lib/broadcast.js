const broadcastConfig = require('../config/broadcastConfig');
const type = broadcastConfig['type'];

module.exports.typeToInt = (searchType) => {

    for(let i = 0; i < type.length; i++){
        if(type[i] === searchType){
            return i;
        }
    }
    return null;
}

module.exports.intToType = (num) => {
    if(num < 0 || num >= type.length){
        return null;
    }

    return type[num];
}

module.exports.createStreamURL = (streamkey) => {
    return broadcastConfig['url'] + streamkey + '.m3u8';
};