import { Datepicker } from "flowbite-react";

import EmployeesList from "./employeesList";
function EventPicker() {
  return (
    <div className="content text-center">
      <div className="choose-date">
        <p>Wybierz datę wizyty</p>
        <Datepicker
          language="pl"
          className=""
          labelTodayButton="Dzisiaj"
          labelClearButton="Wyczyść"
          onSelectedDateChanged={(date) => {
            console.log(date);
          }}
        />
          </div>
          <div className="choose-employee">
              <EmployeesList></EmployeesList>
              </div>
    </div>
  );
}

export default EventPicker;
