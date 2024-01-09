import { http } from "./http-common";

class fetchAllOpenHours {
    get(data) {
        return http.get("/management/getAllOpenHours", data);
    }
}

class createEvent {
    post(data) {
        return http.post("/events/createEvent", data);
    }
}

class updateOpenHour {
    put(data) {
        return http.put("/management/updateOpenHour", data);
    }
}
export { fetchAllOpenHours, createEvent, updateOpenHour };
