import { useState } from 'react';

function EmployeesList() {
  const employeeList = ['Daniel', 'Ewa', 'Marcin'];

  const [selectedEmployee, setSelectedEmployee] = useState('');

  const handleSelectChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  return (
    <div className="flex flex-col ">
      <label htmlFor="employeeSelect">Wybierz pracownika: </label>
      <select
        id="employeeSelect"
        value={selectedEmployee}
        onChange={handleSelectChange}
      >
        <option value="">Wybierz pracownika</option>
        {employeeList.map((employee, index) => (
          <option key={index} value={employee}>
            {employee}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EmployeesList;