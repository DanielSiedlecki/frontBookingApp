import { useEffect, useState } from "react";
import { fetchAllOpenHours } from "../services/managementService";
import {
  getPolishDayName,
  translateDayToPolishName,
} from "../utils/convertDate/getPolishDayName";
import { updateOpenHour } from "../services/managementService";
async function updateHour(dayName, startTime, endTime) {
  const requestData = {
    dayName,
    startTime: startTime.hours + ":" + startTime.minutes,
    endTime: endTime.hours + ":" + endTime.minutes,
  };

  try {
    const updater = new updateOpenHour();
    await updater.put(requestData);
    return { success: true };
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return {
        success: false,
        error:
          "Godzina otwarcia nie może być większa od godziny zamknięcia lub godzina zamknięcia nie może byc mniejsza od godziny otwarcia",
      };
    }
    console.error(err);
    return { success: false, error: "Update failed" };
  }
}

function DashboardSettings() {
  const [allOpenHours, setAllOpenHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingDay, setEditingDay] = useState(null);
  const [updatedOpenHour, setUpdatedOpenHour] = useState({
    hours: "",
    minutes: "",
  });

  const [updatedEndHour, setUpdatedEndHour] = useState({
    hours: "",
    minutes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetcher = new fetchAllOpenHours();
        const response = await fetcher.get();
        setAllOpenHours(response.data.days);
        setLoading(false);
        fetchData()
      } catch (error) {
        setError(error.message || "Error fetching open hours");
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (dayName) => {
    setEditingDay(dayName);
    const selectedOpenHour = allOpenHours.find(
      (hour) => hour.dayName === dayName
    );
    setUpdatedOpenHour({
      hours: selectedOpenHour.openTime.split(":")[0],
      minutes: selectedOpenHour.openTime.split(":")[1],
    });
    setUpdatedEndHour({
      hours: selectedOpenHour.closeTime.split(":")[0],
      minutes: selectedOpenHour.closeTime.split(":")[1],
    });
  };

  const handleSaveClick = async () => {
    try {
      const update = await updateHour(
        editingDay,
        updatedOpenHour,
        updatedEndHour
      );

      if (update.success) {
        console.log("Updates");
        setEditingDay(null);
      } else {
        alert(update.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen ms-20 lg:ms-52 overflow-auto">
      <div className="users-management p-5">
        <h1 className="text-5xl font-bold mb-4">Godziny otwarcia</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-none p-0">
            {allOpenHours.map((openHour, index) => (
              <li key={index} className="mb-4">
                <span className="flex gap-2 flex-col md:flex-row md:items-center flex">
                  <h3 className="text-2xl font-medium">
                    {translateDayToPolishName(openHour.dayName)}
                  </h3>
                  {editingDay === openHour.dayName ? (
                    <>
                      <label className="mr-2">Godzina:</label>
                      <select
                        value={updatedOpenHour.hours}
                        onChange={(e) =>
                          setUpdatedOpenHour({
                            ...updatedOpenHour,
                            hours: e.target.value,
                          })
                        }
                        className="mr-2 p-2 border border-gray-300 rounded"
                        style={{ maxHeight: "20vh" }}
                      >
                        {Array.from({ length: 24 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((hour) => (
                          <option className="h-10" key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                      <label className="mr-2">Minuta:</label>
                      <select
                        value={updatedOpenHour.minutes}
                        onChange={(e) =>
                          setUpdatedOpenHour({
                            ...updatedOpenHour,
                            minutes: e.target.value,
                          })
                        }
                        className="mr-2 p-2 border border-gray-300 rounded"
                      >
                        {Array.from({ length: 60 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((minute) => (
                          <option className="" key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      -<label className="mr-2">Godzina:</label>
                      <select
                        value={updatedEndHour.hours}
                        onChange={(e) =>
                          setUpdatedEndHour({
                            ...updatedEndHour,
                            hours: e.target.value,
                          })
                        }
                        className="mr-2 p-2 border border-gray-300 rounded"
                      >
                        {Array.from({ length: 24 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((minute) => (
                          <option className="" key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <label className="mr-2">Minuta:</label>
                      <select
                        value={updatedEndHour.minutes}
                        onChange={(e) =>
                          setUpdatedEndHour({
                            ...updatedEndHour,
                            minutes: e.target.value,
                          })
                        }
                        className="mr-2 p-2 border border-gray-300 rounded"
                      >
                        {Array.from({ length: 60 }, (_, i) =>
                          i.toString().padStart(2, "0")
                        ).map((minute) => (
                          <option className="" key={minute} value={minute}>
                            {minute}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleSaveClick()}>
                        <i className="bi bi-check-lg text-2xl"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 text-2xl">{`(${openHour.openTime} - ${openHour.closeTime})`}</p>
                      <i
                        className="bi bi-pencil-square text-3xl cursor-pointer hover:text-gray-300"
                        onClick={() => handleEditClick(openHour.dayName)}
                      ></i>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardSettings;
