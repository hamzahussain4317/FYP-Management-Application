// import { useAppData } from "@/context/IntegrationAPI";

const student = {
  studentRoll: "22k-4318",
  batch: "Fall 2022",
  departmentName: "CS",
  section: "BCS-5K",
  campus: "Karachi",
  email: "k224318@nu.edu.pk",
};

const projectDetails = {
  projectName: "MY Portal",
  projectDescription: "This is my Project regarding portal",
  startDate: "2024-12-11",
  status: "Pending",
};

const group = {
  groupID: "12",
  groupName: "My Team",
  supervisorName: "Shaka Hussain",
  supervisorEmail: "shaka.hussain@nu.edu.pk",
};
export default function StudentDashboard() {
  // const { allTasks } = useAppData();
  // console.log(allTasks);
  return (
    <section className="wrapper flex-col items-center justify-center overflow-y-auto space-y-8">
      <h1 className="mt-[1rem] text-center font-semibold">Student | Home</h1>
      <div className="uni-info info">
        <div className="info-head">
          <i className="fa-solid fa-building-columns fa-2x"></i>
          <h3>Student Information</h3>
        </div>
        <div className="info-body">
          <h3>
            <span>Roll No:</span>
            {student.studentRoll}
          </h3>
          <h3>
            <span>Batch:</span>
            {student.batch}
          </h3>
          <h3>
            <span>Department:</span>
            {student.departmentName}
          </h3>
          <h3>
            <span>Section:</span>
            {student.section}
          </h3>
          <h3>
            <span>Campus:</span>
            {student.campus}
          </h3>
          <h3>
            <span>Email:</span>
            {student.email}
          </h3>
        </div>
      </div>
      <div className="personal-info info">
        <div className="info-head">
          <i className="fa-solid fa-person"></i>
          <h3>Project Details</h3>
        </div>
        <div className="info-body">
          <h3>
            <span>Project Name:</span>
            {projectDetails.projectName}
          </h3>
          <h3>
            <span>Start Date:</span>
            {projectDetails.startDate}
          </h3>
          <h3>
            <span>Status:</span>
            {projectDetails.status}
          </h3>
          <h3>
            <span>Project Description:</span>
            {projectDetails.projectDescription}
          </h3>
        </div>
      </div>
      <div className="contact-info info">
        <div className="info-head">
          <i className="fa-solid fa-phone"></i>
          <h3>Group and Supervisor information</h3>
        </div>
        <div className="info-body">
          <h3>
            <span>Group ID:</span> {group.groupID}
          </h3>
          <h3>
            <span>Group Name:</span>
            {group.groupName}
          </h3>
          <h3>
            <span>Supervisor Name:</span>
            {group.supervisorName}
          </h3>
          <h3>
            <span>Supervisor Email:</span>
            {group.supervisorEmail}
          </h3>
        </div>
      </div>
      <div className="footer"></div>
    </section>
  );
}
