import StdSideBar from "../../Components/stdSideBar";
import StdNavBar from "../../Components/stdNavBar";
export default function StudentDashboard() {
  return (
    <section className="stdDashboard">
      <StdNavBar />
      <StdSideBar />
      <div className="Home">
        <h1>student | Home</h1>
        <div className="uni-info"></div>
        <div className="personal-info"></div>
        <div className="contact-info"></div>
      </div>
    </section>
  );
}
