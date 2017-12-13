import axios from 'axios';
import {doAsync} from './doAsync';

export const getArticles = doAsync(({boardname}) => {
    return axios.get(`http://whowant.ml:3000/board/${boardname}`,{withCredentials: true});
});

export const getArticlesPerPage = doAsync(({boardname, pageNum}) => {
    return axios.get(`http://whowant.ml:3000/board/${boardname}/p/${pageNum}`, {withCredentials: true});
});