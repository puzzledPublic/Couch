import axios from 'axios';
import {doAsync} from './doAsync';
import typeChanger from './util/typeChanger';

export const getBroadcastList = doAsync((typeNum) => {
    const type = typeChanger.intToType(typeNum);    
    return axios.get('http://whowant.ml:3000/broadcast/list/' + type);
});