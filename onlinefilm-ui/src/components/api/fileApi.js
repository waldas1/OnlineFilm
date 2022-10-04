import HTTP from "./index";

const uploadFile = (data) => HTTP.post('/files/metadata', data, {
    headers: {
        'Content-type': 'multipart/form-data'
    }
});
export {uploadFile};