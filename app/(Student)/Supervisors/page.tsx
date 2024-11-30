"use client";
import Image from "next/image";
import { useState } from "react";
const supervisors: Supervisor[] = [
  {
    id: 1,
    name: "Dr. Alice Johnson",
    image: "/Hamza.jpg",
    projectsSupervised: 3,
    rating: 4,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 2,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "mark.lee@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 3,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "Salah.junejo@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 4,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "irfan.pathan@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 5,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "ghulam.hamza@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 6,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 7,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 8,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 9,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 10,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 11,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
  {
    id: 12,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
    email: "alice.johnson@nu.edu.pk",
    cgpaCriteria: 3.4,
  },
];
export default function Group() {
  const [checkedSupervisors, setCheckedSupervisors] = useState([0]);
  const maxProjects = 7;

  const handleCheckboxChange = (supervisorID: number) => {
    setCheckedSupervisors((prev) =>
      prev.includes(supervisorID)
        ? prev.filter((id) => id !== supervisorID)
        : [...prev, supervisorID]
    );
  };

  const handleRequestButton = () => {
    const supervisorEmails = checkedSupervisors
      .map((supID) => {
        const checkedSupervisor = supervisors.find((sup) => sup.id === supID);
        return checkedSupervisor ? { id: checkedSupervisor.id } : null;
      })
      .filter((supEmail) => supEmail !== null);

    //implementing query passed using Router If got time then we should implement contextAPI for this as data can be too long
  };

  const handleHover = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    id: string
  ) => {
    const element = document.getElementById(id); // Get the DOM element by id
    if (element && event.type === "mouseenter") {
      element.checkVisibility() ? null : element.classList.toggle("hidden");
    } else if (element && event.type === "mouseleave") {
      element.checkVisibility() ? element.classList.toggle("hidden") : null;
    } else {
      console.warn(`Element with id "${id}" not found`);
    }
  };

  return (
    <section className="wrapper">
      <h1 className="supervisor-heading">Supervisors</h1>
      <ul className="supervisor-list">
        <li className="supervisor-header">
          <div className="supervisor-column supervisor-info">Supervisor</div>
          <div className="supervisor-column supervisor-projects">
            Projects Supervised
          </div>
          <div className="supervisor-column supervisor-rating">Ratings</div>
          <div className="supervisor-column supervisor-request">
            Proposal Request
          </div>
        </li>
        {supervisors.map((supervisor, index) => (
          <li
            key={supervisor.id}
            className={`supervisor-item ${
              index % 2 === 0 ? "even-row" : "odd-row"
            }`}
            onMouseEnter={(event) => handleHover(event, `${index}`)}
            onMouseLeave={(event) => handleHover(event, `${index}`)}
          >
            <div className="supervisor-column supervisor-info relative">
              <Image
                src={supervisor.image}
                alt={supervisor.name}
                className="supervisor-image"
                width={45}
                height={45}
              />{" "}
              <span className="supervisor-name">{supervisor.name}</span>
              <div
                id={`${index}`}
                className="supervisor-more-details absolute left-[-10] top-10 hidden"
              >
                <i className="fa-solid fa-email fa-2px">{`:${supervisor.email}`}</i>
                <p>Above CGPA: {supervisor.cgpaCriteria}</p>
              </div>
            </div>
            <div className="supervisor-column supervisor-projects">
              {supervisor.projectsSupervised}/{maxProjects} Projects
            </div>
            <div className="supervisor-column supervisor-rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`star ${i < supervisor.rating ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="supervisor-column request-proposal">
              <label className="share-label">
                <input
                  type="checkbox"
                  className="share-check"
                  onChange={() => handleCheckboxChange(supervisor.id)}
                  checked={checkedSupervisors.includes(supervisor.id)}
                />
                <i className="fa-regular fa-share-from-square share-icon"></i>
              </label>
            </div>
          </li>
        ))}
        <div className="button-container">
          <button
            className="proposal-button"
            onClick={handleRequestButton} //this will enable when we integrate API
          ></button>
        </div>
      </ul>
    </section>
  );
}
