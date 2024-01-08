
import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventService";
import extractHourAndMinuteFromUTCDateString from "../utils/convertDate/extractHourFromUTC.TS";
import translateStatusToPolish from "../utils/translateStatusToPolish";
async function getEvents() {
    const userId = '6595f93ba22943b3f48be47d'


    const fetcher = new getAllEvents();
    const response = await fetcher.get(userId)

    return response.data.events

}

function DashboardEvents() {
    const [events, setEvents] = useState([]);
    
 useEffect(() => {
        const fetchData = async () => {
            const eventsData = await getEvents();
            setEvents(eventsData);
        };

        fetchData();
    }, []);

    return (
        <div className="h-screen ms-20 lg:ms-52">
            <div className="events flex flex-wrap gap-2 p-10">
            {events.map((event, index) => (
                <div key={index} className="event border shadow-lg rounded-md p-2">
                    <p>{event.serviceType}</p>
                    <p>Godzina: {extractHourAndMinuteFromUTCDateString(event.eventStart)}</p>
                    <p>Status: {translateStatusToPolish(event.eventStatus)}</p>
                    <p>Imie Nazwisko: {event.fullNameReserved}</p>
                    <p>Email: {event.emailReserved}</p>
                    <span className="flex flex-col sm:flex-row sm:gap-2">
                    <p>Koszt: {event.cost}zł</p>
                    <p>Czas trwania: {event.duration}min</p>
                  </span>
                </div>
            ))}
                </div>
        </div>
    );
}

export default DashboardEvents;