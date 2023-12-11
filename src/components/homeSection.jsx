import logo from "../assets/barbershopLogo.jpg";
function HomeSection() {
  const openHours = [
    { dayName: "day", openTime: "10:30", closeTime: "18:30" },
    { dayName: "day", openTime: "10:30", closeTime: "18:30" },
    { dayName: "day", openTime: "10:30", closeTime: "18:30" },
    { dayName: "day", openTime: "10:30", closeTime: "18:30" },
    { dayName: "day", openTime: "10:30", closeTime: "18:30" },
    { dayName: "day", openTime: "10:30", closeTime: "18:30" },
    { dayName: "day", openTime: "10:30", closeTime: "18:30" },
  ];

  return (
    <div className="content flex j items-center flex-col h-screen bg-white rounded-lg w-11/12">
      <div className="content-container flex  w-9/12 mt-10 ">
        <div className="services-section basis-3/5 w-96">
                  <h2>Usługi</h2>
                  
        </div>
        <div className="information-section border  basis-3/2 rounded-lg w-96  p-4  bg-slate-100">
          <img src={logo} alt="barber_shop_logo" className="w-96 h-72" />
          <span className="flex flex-col gap-1 mt-2">
            <h2>Barber Shop - Jan Kowalski</h2>
            <h2>ul. Fabryczna 20 00-100, Wrocław</h2>
          </span>
          <h1 className="text-xl font-semibold  mb-3 mt-3 border-bottom ">
            Kontakt
          </h1>

          <div className="phone-contact flex gap-2 justify-between items-center">
            <span className="flex gap-2">
              <i className="bi bi-telephone-fill text-xl"></i>
              <p className="text-xl">534 166 602</p>
            </span>
            <button className="h-10 border flex items-center">Zadzwoń</button>
          </div>

          <div className="opening-hours mt-4">
            <h2 className="text-lg font-semibold mb-2 border-top">
              Godziny otwarcia:
            </h2>
            <ul className="gap-2 flex flex-col">
              {openHours.map((hour, index) => (
                <li key={index} className="flex justify-between">
                  <span>{hour.dayName}</span>
                  <span>{`${hour.openTime} - ${hour.closeTime}`}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
