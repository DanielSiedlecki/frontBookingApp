import { currentTime } from "../utils/data_utils/clock_currentTime";
import { actualDate } from "../utils/data_utils/actualDate";
import { useEffect, useState } from "react";

function DashboardNavBar() {
  const [actualTimeFullFormat, setActualTimeFullFormat] = useState(currentTime);
  const actualTime = actualTimeFullFormat.slice(0, -3);
  const nowDate = actualDate();
  const nowDateSplitFormat = actualDate().slice(0, -5);
  useEffect(() => {
    setInterval(() => {
      setActualTimeFullFormat(currentTime());
    }, 1000);
  }, []);

  return (
    <div className="bg-black h-screen w-20 lg:w-52">
      <div className="navbar-overlay">
        <ul className="flex flex-col gap-5 lg:gap-3 pt-40 p-3 items-center lg:items-start">
          <span>
            <p className="text-white text-2xl self-center hidden lg:block">
              {actualTimeFullFormat}
            </p>
            <p className="text-white text-xl self-center block lg:hidden">
              {actualTime}
            </p>
            <p className="text-white text-2xl self-center hidden lg:block">
              {nowDate}
            </p>
            <p className="text-white text-xl self-center block lg:hidden">
              {nowDateSplitFormat}
            </p>
          </span>
          <li>
            <span className="flex gap-2 text-white text-lg">
              <i className="bi bi-house-fill text-2xl lg:text-lg"></i>
              <p className="hidden lg:block">Strona główna</p>
            </span>
          </li>
          <li>
            <span className="flex gap-2 text-white text-lg">
              <i className="bi-calendar-fill  text-2xl lg:text-lg"></i>
              <p className="hidden lg:block">Moje wizyty</p>
            </span>
          </li>
          <li>
            <span className="flex gap-2 text-white text-lg">
              <i className="bi bi-door-closed-fill  text-xl lg:text-lg"></i>
              <p className="hidden lg:block">Wyloguj</p>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardNavBar;
