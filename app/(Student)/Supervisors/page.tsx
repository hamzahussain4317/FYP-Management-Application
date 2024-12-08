"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
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

export const defaultSupervisor: Supervisor = {
  email: "",
  profilePic: "",
  supervisorID: 0,
  supervisorName: "",
  departmentName: "",
  specializedDomain: null,
  groupsCount: null,
  cgpaCriteria: 0,
};

export const defaultSupervisorListResponse: SupervisorListResponse = {
  supervisorList: [],
};

export default function Group() {
  const [supervisorsList, setSupervisorsList] =
    useState<SupervisorListResponse>(defaultSupervisorListResponse);
  const [checkedSupervisors, setCheckedSupervisors] = useState([0]);
  const maxProjects = 7;

  useEffect(() => {
    getSupervisorList();
    console.log("supervisor lists: ", supervisorsList);
  }, []);

  const getSupervisorList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/student/getSupervisors`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setSupervisorsList(responseData);
      } else if (response.status === 404) {
        throw new Error("No supervisor in the list");
      } else if (response.status === 500) {
        throw new Error("Error while retreiving data from view");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

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
    const element = document.getElementById(id);
    const parent = element?.parentNode;

    if (element && event.type === "mouseenter") {
      element.checkVisibility() ? null : element.classList.toggle("hidden");
      Array.from(parent?.children || []).forEach((child) => {
        if (child !== element && child instanceof HTMLElement) {
          child.style.opacity = "0.5"; 
        }
      });
    } else if (element && event.type === "mouseleave") {
      element.checkVisibility() ? element.classList.toggle("hidden") : null;

      Array.from(parent?.children || []).forEach((child) => {
        if (child !== element && child instanceof HTMLElement) {
          child.style.opacity = "1.0";
        }
      });
    } else {
      console.warn(`Element with id "${id}" not found`);
    }
  };

  
    const randomRating = Math.floor(Math.random() * 5) + 1;


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
        {supervisorsList.supervisorList.map(
          (supervisors: Supervisor, index: number) => (
            <li
              key={index}
              className={`supervisor-item ${
                index % 2 === 0 ? "even-row" : "odd-row"
              }`}
              onMouseEnter={(event) => handleHover(event, `${index}`)}
              onMouseLeave={(event) => handleHover(event, `${index}`)}
            >
              <div className="supervisor-column supervisor-info relative ">
                <Image
                  src={`/Hamza.jpg`}
                  alt={""}
                  className="supervisor-image"
                  width={45}
                  height={45}
                />{" "}
                <span className="supervisor-name">
                  {supervisors.supervisorName}
                </span>
                <div
                  id={`${index}`}
                  className="supervisor-more-details space-x-2 rounded-lg hidden"
                >
                  <div>
                    <i
                      className="fa-solid fa-envelope fa-0.5x text-center"
                      style={{ color: "black" }}
                    >
                      {" "}
                    </i>{" "}
                    <span className="text-center">{` : ${supervisors.email}`}</span>
                  </div>
                  <p>
                    Above CGPA:
                    <b>
                      {" "}
                      {supervisors.cgpaCriteria === null
                        ? "-"
                        : supervisors.cgpaCriteria}
                    </b>
                  </p>
                </div>
              </div>
              <div className="supervisor-column supervisor-projects">
                {supervisors.groupsCount === null
                  ? "0"
                  : supervisors.groupsCount}
                /{maxProjects} Projects
              </div>
              <div className="supervisor-column supervisor-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`star ${i < randomRating ? "filled" : ""}`}
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
                    onChange={() =>
                      handleCheckboxChange(supervisors.supervisorID)
                    }
                    checked={checkedSupervisors.includes(
                      supervisors.supervisorID
                    )}
                  />
                  <i className="fa-regular fa-share-from-square share-icon"></i>
                </label>
              </div>
            </li>
          )
        )}
        <div className="button-container">
          <button
            className="proposal-button"
            onClick={handleRequestButton} 
          ></button>
        </div>
      </ul>
    </section>
  );
}
