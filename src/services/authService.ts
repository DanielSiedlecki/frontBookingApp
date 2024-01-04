import { http } from "./http-common";

class registerUser {
    post(data) {
        return http.post("/auth/register", data);
    }
}

class loginUser {
    post(data) {
        return http.post("/auth/login", data);
    }
}
class requestPassword {
    post(data) {
        return http.post("/auth/requestPassword", data);
    }
}
class requestPasswordVerify {
    post(id, token) {
        const requestData = {
            userId: id,
            token: token,
        };
        return http.post('/auth/requestPasswordVerify', requestData);
    }
}

class changePassword {
    put(id, token, newPassword) {
        const requestData = {
            userId: id,
            token: token,
            newPassword: newPassword
        };
        return http.put('/auth/changePassword', requestData);
    }
}
export { registerUser, loginUser, requestPassword, requestPasswordVerify, changePassword };
