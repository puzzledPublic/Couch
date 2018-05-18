import axios from 'axios';
import {doAsync} from './doAsync';
import {serverURL} from './serverURL';

export const getApplicationList = doAsync(() => {
    return axios.get(`${serverURL}:3000/admin/applicationlist`, {withCredentials: true});
});

export const grantApplication = doAsync((applicationId) => {
    return axios.get(`${serverURL}:3000/admin/applicationgrant/${applicationId}`, {withCredentials: true});
});