import ServiceList from "./servicesList";
import InformationSection from "./informationSection";
function HomeSection() {
  return (
    <div className="content flex items-center flex-col bg-white rounded-lg w-screen lg:w-10/12">
      <div className="content-container flex flex-col lg:flex-row items-center lg:items-start w-9/12 mt-10 gap-5 ">
        <div className="services-section basis-full lg:basis-4/5 w-full  md:w-96">
          <ServiceList></ServiceList>
        </div>
        <div className="information-section border rounded-lg  md:w-96 p-4 bg-slate-100 ">
          <InformationSection></InformationSection>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
