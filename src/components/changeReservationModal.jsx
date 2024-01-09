import { useEffect, useState } from "react";
import { getPolishDayName } from "../utils/convertDate/getPolishDayName";
import getAvailableHours from "../utils/data_utils/getAvailableHours";
import { updateEvent } from "../services/eventService";
import ReservationNotify from "./reservationNotify";
import convertTimeStringToTimestampUTC from "../utils/convertDate/timeToTimeStampUTC";

function ChangeReservationModal({ eventID, closeModal, employeeID }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [availableHours, setAvailableHours] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const visibleHours = 3;
  const [reservationStatus, setReservationStatus] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  async function fetchData() {
    setIsLoading(true);

    try {
      const hours = await getAvailableHours(selectedDate, employeeID);
      setAvailableHours(hours.availableHours);
    } catch (error) {
      console.error("Error fetching available hours: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === "next") {
      newDate.setDate(selectedDate.getDate() + 1);
    } else if (direction === "prev" && selectedDate > today) {
      newDate.setDate(selectedDate.getDate() - 1);
    }

    setSelectedDate(newDate);
    setSelectedHour(null);
  };

  const handleNextHours = () => {
    if (startIndex + visibleHours < (availableHours?.length || 0)) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevHours = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleHourClick = (hour) => {
    setSelectedHour(hour);
  };

  const handleUpdateEvent = async () => {
    const eventStartDate = convertTimeStringToTimestampUTC(selectedHour);

    try {
      const putEvent = new updateEvent();
      const updater = await putEvent.put(eventID, eventStartDate);
      setReservationStatus("postpone");
      console.log(updater);
    } catch (err) {
      console.log(err);
      setReservationStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, employeeID]);
  if (reservationStatus == "postpone") {
    return (
      <div className="blur-background fixed top-0 left-0 w-full h-full backdrop-blur-md">
        <div className="modal-overlay fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:w-2/4 bg-white p-5 md:p-8  rounded-md shadow-lg flex flex-col items-center">
          <i
            className="bi bi-x self-end text-4xl hover:cursor-pointer"
            onClick={closeModal}
          ></i>
          <ReservationNotify type={"postpone"}></ReservationNotify>
        </div>
      </div>
    );
  }
  if (reservationStatus == "error") {
    return (
      <div className="blur-background fixed top-0 left-0 w-full h-full backdrop-blur-md">
        <div className="modal-overlay fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:w-2/4 bg-white p-5 md:p-8  rounded-md shadow-lg flex flex-col items-center">
          <i
            className="bi bi-x self-end text-4xl hover:cursor-pointer"
            onClick={closeModal}
          ></i>
          <ReservationNotify type={"error"}></ReservationNotify>
        </div>
      </div>
    );
  }
  return (
    <div className="blur-background fixed top-0 left-0 w-full h-full backdrop-blur-md">
      <div className="modal-overlay fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:w-2/4 bg-white p-5 md:p-8  rounded-md shadow-lg flex flex-col items-center">
        <i
          className="bi bi-x self-end text-4xl hover:cursor-pointer"
          onClick={closeModal}
        ></i>
        <h2 className="text-lg">Zmień date</h2>
        {getPolishDayName(selectedDate)}
        <div className="data-picker">
          {selectedDate.toISOString().slice(0, 10) !==
            today.toISOString().slice(0, 10) && (
            <i
              className="bi bi-chevron-left text-lg hover:cursor-pointer"
              onClick={() => handleDateChange("prev")}
            ></i>
          )}
          <input
            className={`border-none text-lg`}
            type="date"
            id="date"
            name="date"
            value={selectedDate.toLocaleDateString("en-CA")}
            min={today.toISOString().slice(0, 10)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            required
          />
          <i
            className="bi bi-chevron-right text-lg hover:cursor-pointer"
            onClick={() => handleDateChange("next")}
          ></i>
        </div>

        <div className="hour-picker items-center flex flex-col gap-3">
          <h3>Dostępne godziny:</h3>
          {isLoading ? (
            <p>Ładowanie</p>
          ) : (
            <div className="available-hours flex gap-2 items-center mb-5">
              {startIndex > 0 && availableHours.length !== 0 && (
                <i
                  className="bi bi-chevron-left text-2xl hover:cursor-pointer"
                  onClick={() => handlePrevHours()}
                ></i>
              )}
              <ul className="flex gap-2">
                {availableHours !== null && availableHours.length > 0 ? (
                  availableHours
                    .slice(startIndex, startIndex + visibleHours)
                    .map((hour, index) => (
                      <li
                        className={`border h-12 w-16 sm:h-16 sm:w-20 flex justify-center items-center sm:text-lg rounded-lg bg-slate-300 hover:bg-slate-400 hover:cursor-pointer ${
                          selectedHour === hour ? "bg-slate-500 text-white" : ""
                        }`}
                        key={index}
                        onClick={() => handleHourClick(hour)}
                      >
                        {hour}
                      </li>
                    ))
                ) : (
                  <p>Brak dostępnych godzin na wybraną datę.</p>
                )}
              </ul>
              {startIndex + visibleHours < availableHours?.length && (
                <i
                  className="bi bi-chevron-right text-2xl hover:cursor-pointer"
                  onClick={() => handleNextHours()}
                ></i>
              )}
            </div>
          )}
        </div>
        <button onClick={() => handleUpdateEvent()}>Zmień date</button>
      </div>
    </div>
  );
}

export default ChangeReservationModal;
