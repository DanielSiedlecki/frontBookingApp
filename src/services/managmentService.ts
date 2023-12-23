import { http } from "./http-common";

class fetchAllOpenHours {
    get(data) {
        return http.get("/managment/getAllOpenHours", data);
    }
}

class createEvent {
    post(data) {
        return http.post("/events/createEvent", data);
    }
}
export { fetchAllOpenHours, createEvent };
