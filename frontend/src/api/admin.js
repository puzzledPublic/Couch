import axios from 'axios';
import {doAsync} from './doAsync';
import {serverURL} from './serverURL';

export const getApplicationList = doAsync(() => {
    return axios.get(`${serverURL}:3000/admin/application/list`, {withCredentials: true });
});

export const grantApplication = doAsync((applicationId) => {
    return axios.post(`${serverURL}:3000/admin/application/grant`, {applicationId: applicationId }, {withCredentials: true });
});

export const rejectApplication = doAsync((applicationId) => {
    return axios.put(`${serverURL}:3000/admin/application/reject`, {applicationId: applicationId }, {withCredentials: true })
});