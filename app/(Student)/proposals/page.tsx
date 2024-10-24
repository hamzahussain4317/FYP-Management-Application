import StdSideBar from "../../../Components/stdSideBar";
import StdNavBar from "../../../Components/stdNavBar";
export default function Group() {
  return (
    <section className="stdDashboard">
      <StdNavBar />
      <StdSideBar />
      <div className="Home">
        {/* proposal form */}
        <form className="proposal-form">
            
        </form>
      </div>
    </section>
  );
}
