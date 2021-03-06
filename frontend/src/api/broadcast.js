import axios from 'axios';
import {doAsync} from './doAsync';
import typeChanger from './util/typeChanger';
import {serverURL} from './serverURL';

export const getBroadcastList = doAsync((typeNum) => {
    const type = typeChanger.intToType(typeNum); 
    return axios.get(`${serverURL}:3000/broadcast/list/${type}`,{withCredentials: true});
});

export const setBroadcastConfig = doAsync(({username, show, roomname, typeNum}) => {
    const type = typeChanger.intToType(typeNum);
    return axios.put(`${serverURL}:3000/broadcast/${username}/info`, {
        show: show,
        roomname: roomname,
        type: type
    },{withCredentials: true});
});

export const getBroadcastConfig = doAsync((username) => {
    return axios.get(`${serverURL}:3000/broadcast/${username}/info`, {withCredentials: true});
});

export const enterRoom = doAsync(({username}) => {
    return axios.get(`${serverURL}:3000/broadcast/${username}`, {withCredentials: true});
});

export const sendBroadcastApplication = doAsync(({username, content, configType}) => {
    return axios.post(`${serverURL}:3000/broadcast/application`,{
        username: username,
        content: content,
        type: configType
    },{withCredentials: true});
});