import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../services/eventService";
import { cancelEvent } from "../services/eventService";
import ChangeReservationModal from "./changeReservationModal";

function CancelEventPage() {
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  async function handleCancelEvent() {
    console.log("work");
    try {
      const canceler = new cancelEvent();
      const cancelEventer = await canceler.put(id);
      setCancelled(true);
      console.log(cancelEventer);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("No event ID provided");
        return;
      }

      try {
        const fetcher = new getEvent();
        const response = await fetcher.get(id);
        setEvent(response.data);
        setDate(new Date(response.data.findEvent.eventStart));
        setEmployeeId(response.data.findEvent.employee);
        setEventId(response.data.findEvent._id);
      } catch (err) {
        console.error(err);
        setError("Error fetching event");
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-3">
      {!cancelled && (
        <>
          <h1 className="text-xl md:text-4xl">Modyfikuj swoją wizytę</h1>
          <div className="visit-overlay flex flex-col justify-center items-center md:border h-96 w-screen md:w-1/2  mt-2 lg:shadow-lg">
            {date && (
              <>
                <i className="bi bi-calendar-check-fill text-5xl mb-3"></i>
                <div className="evenetInfo flex gap-2 md:gap-12 p-2 md:p-5 flex-col md:flex-row">
                  <span className="text-lg ps-3 border-s">
                    <h2>Usługa</h2>
                    <p className="text-sm text-gray-400 ">
                      {event.findEvent.serviceType}
                    </p>
                  </span>
                  <span className="text-lg ps-3 border-s">
                    <h2>Data</h2>
                    <p className="text-sm text-gray-400 ">
                      {date.toLocaleDateString()}
                    </p>
                  </span>
                  <span className="text-lg ps-3 border-s">
                    <h2>Godzina</h2>
                    <p className="text-sm text-gray-400">
                      {date.toLocaleTimeString().slice(0, 5)}
                    </p>
                  </span>
                </div>
                <span className="flex gap-3 w-1/2 flex-col md:flex-row">
                  <button
                    className="w-full md:w-1/2 self-center text-white bg-green-400 hover:bg-green-500 "
                    onClick={() => {
                      setModalVisible(true);
                    }}
                  >
                    Zmień termin
                  </button>
                  <button
                    className="w-full md:w-1/2 self-center text-white bg-green-400 hover:bg-green-500 "
                    onClick={handleCancelEvent}
                  >
                    Odwołaj
                  </button>
                </span>
              </>
            )}

            {isModalVisible && (
              <ChangeReservationModal
                closeModal={() => setModalVisible(false)}
                employeeID={employeeId}
                eventID={eventId}
              />
            )}
          </div>
        </>
      )}

      {cancelled && (
        <>
          <i className="bi bi-check-lg text-green-300 text-5xl"></i>
          <p>Wizyta została odwołana.</p>
        </>
      )}
    </div>
  );
}

export default CancelEventPage;
