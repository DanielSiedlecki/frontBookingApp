import { http } from "./http-common";

class fetchAllOpenHours {
    get(data) {
        return http.get("/managment/getAllOpenHours", data);
    }
}

export { fetchAllOpenHours };
