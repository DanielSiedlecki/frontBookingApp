import { http } from "./http-common";

class fetchAvailableHours {
    get(date) {
        return http.get('/events/getAvailableHours', { params: date });
    }
}

export { fetchAvailableHours }