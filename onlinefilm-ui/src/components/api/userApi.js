import HTTP from "./index";

const createNewUser = (data) => HTTP.post('/registration', data);

export {
    createNewUser
};