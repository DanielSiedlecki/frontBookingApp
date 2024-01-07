import currentTime from "../utils/data_utils/clock_currentTime";
import { useEffect, useState } from "react";

function DashboardNavBar() {
  const [actualTimeFullFormat, setActualTimeFullFormat] = useState(currentTime);
  const actualTime = actualTimeFullFormat.slice(0, -3);
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActualTimeFullFormat(currentTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-black h-screen w-20 lg:w-52">
      <div className="navbar-overlay">
        <ul className="flex flex-col gap-5 lg:gap-3 pt-40 p-3 items-center lg:items-start">
                  <p className="text-white text-2xl self-center mb-10 hidden lg:block">{actualTimeFullFormat}</p>
                  <p className="text-white text-xl self-center mb-10 block lg:hidden">{actualTime}</p>
          <li>
            <span className="flex gap-2 text-white text-lg">
              <i className="bi bi-house-fill text-4xl lg:text-lg"></i>
              <p className="hidden lg:block">Strona główna</p>
            </span>
          </li>
          <li>
            <span className="flex gap-2 text-white text-lg">
              <i className="bi-calendar-fill  text-4xl lg:text-lg"></i>
              <p className="hidden lg:block">Moje wizyty</p>
            </span>
          </li>
          <li>
            <span className="flex gap-2 text-white text-lg">
              <i className="bi bi-door-closed-fill  text-4xl lg:text-lg"></i>
              <p className="hidden lg:block">Wyloguj</p>
            </span>
          </li>
              </ul>
              
      </div>
    </div>
  );
}

export default DashboardNavBar;
