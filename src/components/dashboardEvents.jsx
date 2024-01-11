import { useEffect, useState } from "react";
import {
  cancelEvent,
  endedEvent,
  getAllEvents
} from "../services/eventService";
import extractHourAndMinuteFromUTCDateString from "../utils/convertDate/extractHourFromUTC.TS";
import translateStatusToPolish from "../utils/translateStatusToPolish";
import ChangeReservationModal from "./changeReservationModal";
import Spinner from "./elements/spinner/spinner";
async function getEvents() {
  const userId = "6595f93ba22943b3f48be47d";

  const fetcher = new getAllEvents();
  const response = await fetcher.get(userId);

  return response.data.events;
}

function DashboardEvents() {
  const [employeeId, setEmployeeId] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventId, setEvenetId] = useState("");
  const [events, setEvents] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getEvents();
        const sortedEvents = eventsData.sort((a, b) => {
          if (a.eventStatus === "Pending" && b.eventStatus !== "Pending") {
            return -1;
          } else if (a.eventStatus !== "Pending" && b.eventStatus === "Pending") {
            return 1;
          } else {

            return 0;
          }
        });
        setEvents(sortedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Błąd podczas pobierania wydarzeń:", error);
      }
    };

    fetchData();
  }, []);
  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };
  const filteredEvents = filterStatus
    ? events.filter((event) => event.eventStatus === filterStatus)
    : events;

  const handleFinishEvent = async (eventId) => {
    try {
      const updater = new endedEvent();
      await updater.put(eventId);
      const refreshedEventsData = await getEvents();
      setEvents(refreshedEventsData);
    } catch (error) {
      console.error("Błąd podczas zakończania wydarzenia:", error);
    }
  };

  const handleCancelEvent = async (eventId) => {
    try {
      const canceler = new cancelEvent();
      await canceler.put(eventId);
      const refreshedEventsData = await getEvents();
      setEvents(refreshedEventsData);
    } catch (error) {
      console.error("Błąd podczas odwoływania wydarzenia:", error);
    }
  };
  const handleRescheduleEvent = (eventId, employee) => {
    setModalVisible(true);
    setEvenetId(eventId);
    setEmployeeId(employee);
  };

  return (
    <div className="h-screen ms-20 lg:ms-52 overflow-auto">
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
        {isLoading ? (
          <Spinner />
        ) : (
          filteredEvents.map((event, index) => (
            <div
              key={index}
              className="event border w-full sm:w-96 shadow-md rounded-md p-2"
            >
              <p>{event.serviceType}</p>
              <p>
                Godzina:{" "}
                {extractHourAndMinuteFromUTCDateString(event.eventStart)}
              </p>
              <p>Status: {translateStatusToPolish(event.eventStatus)}</p>
              <p>Imie Nazwisko: {event.fullNameReserved}</p>
              <p>Email: {event.emailReserved}</p>
              <span className="flex flex-col sm:flex-row sm:gap-2">
                <p>Koszt: {event.cost}zł</p>
                <p>Czas trwania: {event.duration}min</p>
              </span>
              <div className="flex gap-2 mt-2 flex-col md:flex-row justify-center">
                {event.eventStatus === "Pending" && (
                  <>
                    <button onClick={() => handleFinishEvent(event._id)}>
                      Zakończ
                    </button>
                    <button onClick={() => handleCancelEvent(event._id)}>
                      Odwołaj
                    </button>
                    <button
                      onClick={() =>
                        handleRescheduleEvent(event._id, event.employee)
                      }
                    >
                      Przełóż
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {isModalVisible && (
        <ChangeReservationModal
          closeModal={() => setModalVisible(false)}
          employeeID={employeeId}
          eventID={eventId}
        />
      )}
    </div>
  );
}

export default DashboardEvents;
