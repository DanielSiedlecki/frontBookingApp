import { useState, useEffect } from "react";
import { fetchAllHairdressers } from "../services/hairdressersService";
import AppointmentBookingModal from "./appointmentBookingModal";

function ServiceList() {
  const [servicesList, setServices] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetcher = new fetchAllHairdressers();
        const response = await fetcher.get();
        setServices(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

 const handleServiceClick = (service) => {
  setSelectedService(service);
  openModal();
};
  
  const handleEmployeeClick = (employeeName) => {
    setSelectedEmployee(
      selectedEmployee === employeeName ? null : employeeName
    );
  };

  return (
    <div className="content ">
      <h2 className="font-semibold text-2xl lg:text-4xl border-b pb-2 ">
        Usługi
      </h2>
      <ul className="flex flex-col gap-4 mt-5 ">
        {servicesList.map((employee, index) => (
          <li
            
            key={index}
            className="text-lg lg:text-2xl hover:cursor-pointer"
          >
            <strong onClick={() => handleEmployeeClick(employee.name)}>
              <span className="flex items-center gap-1">
                <i
                  className={
                    selectedEmployee === employee.name
                      ? "bi bi-chevron-down text-sm"
                      : "bi bi-chevron-right text-sm"
                  }
                ></i>
                {employee.name}
              </span>
            </strong>
            {selectedEmployee === employee.name && (
              <ul className="flex flex-col mt-5">
                {employee.services.map((service, serviceIndex) => (
                  <li
                     onClick={() => handleServiceClick(service)}
                    key={serviceIndex}
                    className="flex h-18 sm:h-16 justify-between border-b text-sm lg:text-lg"
                  >
                    <p>{service.serviceName}</p>
                    <div className="button-text flex-row flex items-center gap-2">
                      <span className="text-sm">
                        <p>{service.cost}zł</p>
                        <p>{service.serviceDuration}min</p>
                      </span>
                      <button
                        className="h-8 lg:h-10 text-sm lg:text-lg flex items-center"
                        onClick={openModal}
                      >
                        Umów
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="modal ">
         <AppointmentBookingModal closeModal={closeModal} selectedService={selectedService} selectedEmployee={selectedEmployee} />
        </div>
      )}
    </div>
  );
}

export default ServiceList;