import { fetchAvailableHours } from "../../services/eventService";
async function getAvailableHours(selectedDate: Date, employee_Id) {
    try {
        selectedDate.setHours(0, 0, 0, 0);
        const fetcher = new fetchAvailableHours();
        const response = await fetcher.get({ date: selectedDate, employeeID: employee_Id });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching available hours:', error);
        throw error;
    }
}

export default getAvailableHours;