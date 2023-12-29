import { http } from "./http-common"

class registerUser {

    post(data) {
        return http.post('/auth/register', data);
    }

}

class loginUser {

    post(data) {
        return http.post('/auth/login', data);
    }

}

export { registerUser, loginUser };