import { http } from "./http-common";

class fetchAllHairdressers {
    get(data) {
        return http.get("hairdresser/getHairdressers", data);
    }
}

export { fetchAllHairdressers };
