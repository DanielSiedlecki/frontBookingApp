import { http } from "./http-common";

class fetchAvailableHours {
    get(date) {
        return http.get("/events/getAvailableHours", { params: date });
    }
}

class getEvent {
    get(id) {
        return http.get(`/events/getEvent/${id}`);
    }
}

class cancelEvent {
    delete(id) {
        return http.delete(`/events/cancelEvent/${id}`);
    }
}

class updateEvent {
    put(id, newEventStart) {
        const requestData = {
            newEventStart,
        };
        return http.put(`/events/updateEvent/${id}`, requestData);
    }
}

class getAllEvents {
    get(userId) {
        return http.get(`/events/getAllEvents/${userId}`);
    }
}
export {
    fetchAvailableHours,
    getEvent,
    cancelEvent,
    updateEvent,
    getAllEvents,
};
