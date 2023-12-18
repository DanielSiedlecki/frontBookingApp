import ServiceList from "./servicesList";
import InformationSection from "./informationSection";
function HomeSection() {
  return (
    <div className="content flex j items-center flex-col h-screen bg-white rounded-lg w-10/12">
      <div className="content-container flex  w-9/12 mt-10 gap-5 ">
        <div className="services-section basis-4/5 w-96">
          <ServiceList></ServiceList>
        </div>
        <div className="information-section border  rounded-lg w-96  p-4  bg-slate-100">
          <InformationSection></InformationSection>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
