import axios from 'axios';
import {doAsync} from './doAsync';

export const localLogin = doAsync(({email, password}) => {
    return axios.post('http://whowant.ml:3000/user/login/local',{
        email, 
        password
    });
});

export const createUser = doAsync(({email, username, password}) => {
    return axios.post('http://whowant.ml:3000/user/create',{
        email,
        username,
        password
    });
});

