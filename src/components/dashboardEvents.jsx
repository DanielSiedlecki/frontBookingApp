import { useEffect, useState } from "react";
import { getAllEvents } from "../services/eventService";
import extractHourAndMinuteFromUTCDateString from "../utils/convertDate/extractHourFromUTC.TS";
import translateStatusToPolish from "../utils/translateStatusToPolish";
async function getEvents() {
  const userId = "6595f93ba22943b3f48be47d";

  const fetcher = new getAllEvents();
  const response = await fetcher.get(userId);

  return response.data.events;
}

function DashboardEvents() {
  const [events, setEvents] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };

    fetchData();
  }, []);
  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };
  const filteredEvents = filterStatus
    ? events.filter((event) => event.eventStatus === filterStatus)
    : events;

  return (
    <div className="h-screen ms-20 lg:ms-52">
      <div className="flex flex-col sm:flex-row gap-2 p-2 justify-center">
        <button
          onClick={() => handleFilterClick(null)}
          className="filter-button"
        >
          Wszystkie
        </button>
        <button
          onClick={() => handleFilterClick("Pending")}
          className="filter-button"
        >
          Oczekujące
        </button>
        <button
          onClick={() => handleFilterClick("Ended")}
          className="filter-button"
        >
          Zakończone
        </button>
        <button
          onClick={() => handleFilterClick("Canceled")}
          className="filter-button"
        >
          Anulowane
        </button>
      </div>
      <div className="events flex flex-wrap gap-4 p-2 items-center justify-center">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="event border w-full sm:w-96 shadow-md rounded-md p-2"
          >
            <p>{event.serviceType}</p>
            <p>
              Godzina: {extractHourAndMinuteFromUTCDateString(event.eventStart)}
            </p>
            <p>Status: {translateStatusToPolish(event.eventStatus)}</p>
            <p>Imie Nazwisko: {event.fullNameReserved}</p>
            <p>Email: {event.emailReserved}</p>
            <span className="flex flex-col sm:flex-row sm:gap-2">
              <p>Koszt: {event.cost}zł</p>
              <p>Czas trwania: {event.duration}min</p>
            </span>
            <div className="flex gap-2 mt-2 flex-col md:flex-row justify-center">
              <button onClick={() => handleFinishEvent(event._id)}>
                Zakończ
              </button>
              <button onClick={() => handleCancelEvent(event._id)}>
                Odwołaj
              </button>
              <button onClick={() => handleRescheduleEvent(event._id)}>
                Przełóż
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardEvents;
