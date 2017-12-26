import axios from 'axios';
import {doAsync} from './doAsync';

export const getArticle = doAsync((articleId) => {
    return axios.get(`http://whowant.ml:3000/board/a/${articleId}`,{withCredentials: true});
});

export const getArticles = doAsync(({boardname}) => {
    return axios.get(`http://whowant.ml:3000/board/${boardname}`,{withCredentials: true});
});

export const getArticlesPerPage = doAsync(({boardname, pageNum}) => {
    return axios.get(`http://whowant.ml:3000/board/${boardname}/p/${pageNum}`, {withCredentials: true});
});

export const uploadImageFile = doAsync((imageFile) => {
    return axios.post('http://whowant.ml:3000/board/upload/image', imageFile, 
    {
        withCredentials: true, 
        headers: {'Content-Type': 'multipart/form-data'}
    });
});

export const writeArticle = doAsync(({title, content, username, password, boardname}) => {
    return axios.post(`http://whowant.ml:3000/board/${boardname}`, {
        title: title,
        content: content,
        username: username,
        password: password
    }, {withCredentials: true});
});

export const writeComment = doAsync(({articleId, comment}) => {
    return axios.post(`http://whowant.ml:3000/board/${articleId}/comment`, {
        content: comment.content,
        username: comment.username,
        password: comment.password
    }, {withCredentials: true});
});