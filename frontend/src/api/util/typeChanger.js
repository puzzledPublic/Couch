import {typeList} from './broadcastTypeList';

const typeToInt = (searchType) => {
    for(let i = 0; i < typeList.length; i++){
        if(typeList[i] === searchType){
            return i;
        }
    }
    return null;
}

const intToType = (num) => {
    if(num < 0 || num >= typeList.length){
        return null;
    }

    return typeList[num];
}

export default {
    typeToInt,
    intToType
}