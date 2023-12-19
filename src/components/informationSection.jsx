import { useEffect, useState } from "react";
import logo from "../assets/barbershopLogo.jpg";
import { fetchAllOpenHours } from "../services/managmentService";

function InformationSection() {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetcher = new fetchAllOpenHours();
        const response = await fetcher.get();
        setDays(response.data.days);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img src={logo} alt="barber_shop_logo" className="w-96 h-72" />
          <span className="flex flex-col gap-1 mt-2">
            <h2>Barber Shop - Jan Kowalski</h2>
            <h2>ul. Fabryczna 20 00-100, Wrocław</h2>
          </span>
          <h1 className="text-xl font-semibold mb-3 mt-3 border-b">Kontakt</h1>

          <div className="phone-contact flex gap-2 justify-between items-center">
            <span className="flex gap-2">
              <i className="bi bi-telephone-fill text-xl"></i>
              <p className="text-lg whitespace-nowrap ">534 166 602</p>
            </span>
            <button className="h-10 border flex items-center">Zadzwoń</button>
          </div>

          <div className="opening-hours mt-4">
            <h2 className="text-lg font-semibold mb-2 border-t">
              Godziny otwarcia:
            </h2>
            <ul className="gap-2 flex flex-col">
              {days.map((hour, index) => (
                <li key={index} className="flex justify-between">
                  <span>{hour.dayName}</span>
                  <span>{`${hour.openTime} - ${hour.closeTime}`}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="social-media mt-5 flex justify-around">
            <span>
              <a
                className="flex flex-col items-center  hover:text-zinc-500 hover:cursor-pointer text-black"
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook text-4xl"> </i>
                <p className="text-sm">Facebook</p>
              </a>
            </span>
            <span>
              <a
                className="flex flex-col items-center hover:text-zinc-500 hover:cursor-pointer text-black"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram text-4xl"></i>
                <p className="text-sm">Instagram</p>
              </a>
            </span>
            <span>
              <a
                className="flex flex-col items-center  hover:text-zinc-500 hover:cursor-pointer text-black"
                href="https://example.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-globe text-4xl"></i>
                <p className="text-sm">Strona</p>
              </a>
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default InformationSection;
