import axios from 'axios';
import {doAsync} from './doAsync';
import {serverURL} from './serverURL';

export const localLogin = doAsync(({email, password}) => {
    return axios.post(`${serverURL}:3000/user/login/local`,{
        email, 
        password
    },{withCredentials: true});
});

export const createUser = doAsync(({email, username, password}) => {
    return axios.post(`${serverURL}:3000/user/create`,{
        email,
        username,
        password
    },{withCredentials: true});
});

export const logout = doAsync(() => {
    return axios.get(`${serverURL}:3000/user/logout`,{withCredentials: true});
})

export const loginCheck = doAsync(() => {
    return axios.get(`${serverURL}:3000/user/check`,{withCredentials: true});
})