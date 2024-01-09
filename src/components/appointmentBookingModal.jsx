import { useState, useEffect } from "react";
import getAvailableHours from "../utils/data_utils/getAvailableHours";
import { createEvent } from "../services/managementService";
import { calculateServiceEndHour } from "../utils/calculateServiceEndHour";
import { getPolishDayName } from "../utils/convertDate/getPolishDayName";
import ReservationNotify from "./reservationNotify";
import convertTimeStringToTimestampUTC from "../utils/convertDate/timeToTimeStampUTC";

function AppointmentBookingModal({
  closeModal,
  selectedService,
  selectedEmployee,
}) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [serviceInformation] = useState(selectedService);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [availableHours, setAvailableHours] = useState(null);
  const visibleHours = 3;
  const [startIndex, setStartIndex] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reservationStatus, setReservationStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const hours = await getAvailableHours(
          selectedDate,
          selectedEmployee._id
        );
        setAvailableHours(hours.availableHours);
      } catch (error) {
        console.error("Błąd podczas pobierania dostępnych godzin: ", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedDate, setAvailableHours]);

  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    setStartIndex(0);
    if (direction === "next") {
      newDate.setDate(selectedDate.getDate() + 1);
    } else if (direction === "prev" && selectedDate > today) {
      newDate.setDate(selectedDate.getDate() - 1);
    }

    setSelectedDate(newDate);
    setSelectedHour(null);
  };

  const handleNextHours = () => {
    if (startIndex + visibleHours < availableHours.length) {
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
    console.log(hour);
  };

  const handleReservation = () => {
    if (!name) {
      setNameError(true);
      return;
    } else {
      setNameError(false);
    }

    if (!email) {
      setEmailError(true);
    } else if (!email.includes("@")) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
      return;
    }

    submitReservation();
  };

  const submitReservation = async () => {
    if (nameError || emailError || !selectedHour) {
      console.error(
        "Błąd: Nie wszystkie wymagane pola zostały poprawnie wypełnione."
      );
      return;
    }

    try {
      const eventData = {
        employee_id: selectedEmployee._id,
        eventStart: convertTimeStringToTimestampUTC(selectedHour),
        serviceType: serviceInformation.serviceName,
        fullNameReserved: name,
        emailReserved: email,
        cost: serviceInformation.cost,
        duration: serviceInformation.serviceDuration,
      };
      console.log(eventData);
      const eventer = new createEvent();
      await eventer.post(eventData);
      console.log("Rezerwacja została utworzona pomyślnie.");
      setReservationStatus("success");
    } catch (error) {
      console.error("Błąd podczas tworzenia rezerwacji: ", error);
      setReservationStatus("error");
    }
  };

  if (reservationStatus == "success") {
    return (
      <div className="blur-background fixed top-0 left-0 w-full h-full backdrop-blur-md">
        <div className="modal-overlay fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full lg:w-2/4 bg-white p-5 md:p-8  rounded-md shadow-lg flex flex-col items-center">
          <i
            className="bi bi-x self-end text-4xl hover:cursor-pointer"
            onClick={closeModal}
          ></i>
          <ReservationNotify type={"success"}></ReservationNotify>
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
        <div className="flex flex-col justify-between items-center w-full">
          <i
            className="bi bi-x self-end text-4xl hover:cursor-pointer"
            onClick={closeModal}
          ></i>
          <h2 className="text-xl font-semibold">Zarezerwuj wizytę</h2>
        </div>
        <span className="dayName text-lg mt-3">
          {getPolishDayName(selectedDate)}
        </span>
        <div className="data-picker">
          {selectedDate.toISOString().slice(0, 10) !==
            today.toISOString().slice(0, 10) && (
            <i
              className="bi bi-chevron-left text-lg hover:cursor-pointer"
              onClick={() => handleDateChange("prev")}
            ></i>
          )}
          <input
            className={`border-none`}
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
        <h3>Dostępne godziny:</h3>
        {isLoading ? (
          <p> Ładowanie</p>
        ) : (
          <div className="available-hours flex gap-2 items-center mb-5">
            {startIndex > 0 && availableHours.length != 0 && (
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
        <div className="summaryEvenet w-72 sm:w-96 bg-slate-300 p-4 rounded-lg">
          <div className="eventInformation">
            <div className="serviceTitle">
              <span className="flex justify-between">
                <p>{serviceInformation.serviceName}</p>
                <p>{serviceInformation.cost} zł</p>
              </span>
              <span className="float-right text-xs">
                <p>
                  {calculateServiceEndHour(
                    selectedHour,
                    serviceInformation.serviceDuration
                  )}
                </p>
              </span>
              <span className="float-left text-sm mt-2">
                {selectedEmployee.name}
              </span>
            </div>
          </div>
        </div>
        <div className="form flex flex-col md:flex-row gap-2">
          <div className="email flex flex-col mt-2 text-center md:text-left">
            <label>Imie Nazwisko</label>
            <input
              className={`border-2 rounded-md w-60 ${
                nameError ? "border-red-500" : ""
              }`}
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <span className="text-red-500 text-xs">
                Imie Nazwisko jest wymagane
              </span>
            )}
          </div>
          <div className="email flex flex-col mt-2 text-center md:text-left">
            <label>Twój adres email</label>
            <input
              className={`border-2 rounded-md w-60 ${
                emailError ? "border-red-500" : ""
              }`}
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <span className="text-red-500 text-xs">
                Adres email jest wymagany i musi zawierać @
              </span>
            )}
          </div>
        </div>
        <div className="summaryPrice w-full mt-4">
          <span className="float-right flex flex-col">
            <span className="flex items-center gap-3">
              <p className="text-sm">Łącznie</p>
              <h2 className="text-2xl font-bold">
                {serviceInformation.cost} zł
              </h2>
            </span>
            <p className="text-right text-sm">
              {serviceInformation.serviceDuration} min
            </p>
          </span>
        </div>
        <div className="reserve w-full">
          <button
            className="w-full mt-2 lg:w-64 sm:float-right"
            onClick={handleReservation}
          >
            <label>Zarezerwuj wizytę</label>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBookingModal;
