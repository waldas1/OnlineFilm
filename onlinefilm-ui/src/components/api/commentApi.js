import HTTP from "./index";

const getComments = (filmId) => HTTP.get(`/comments/${filmId}`)
const addComment = (filmId, data) => HTTP.post(`/comments/${filmId}`, data);
const updateComment = (commentId, data) => HTTP.put(`comments/${commentId}`, data);
const deleteComment = (commentId) => HTTP.delete(`comments/${commentId}`);

export {
    getComments,
    addComment,
    updateComment,
    deleteComment
};