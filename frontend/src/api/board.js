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

export const writeArticle = doAsync(({article, boardname}) => {
    return axios.post(`http://whowant.ml:3000/board/${boardname}`, {
        title: article.title,
        content: article.content,
        username: article.username,
        password: article.password
    }, {withCredentials: true});
});

export const modifyArticle = doAsync(({article, articleId, passwordForValidate}) => {
    return axios.put(`http://whowant.ml:3000/board/a/${articleId}`, {
        title: article.title,
        content: article.content,
        password: article.password,
        passwordForValidate: passwordForValidate
    },{withCredentials: true});
});

export const deleteArticle = doAsync(({articleId, passwordForValidate}) => {
    return axios.delete(`http://whowant.ml:3000/board/a/${articleId}`, {
        data: {passwordForValidate: passwordForValidate},
        withCredentials: true
    });
});

export const validatePasswordGuestArticle = doAsync(({articleId, password}) => {
    return axios.post(`http://whowant.ml:3000/board/a/${articleId}`, {
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