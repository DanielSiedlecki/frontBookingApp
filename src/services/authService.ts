import { http } from "./http-common"

class registerUser {

    post(data) {
        return http.post('/auth/register', data);
    }

}

export { registerUser };