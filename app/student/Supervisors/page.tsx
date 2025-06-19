"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

// export const defaultSupervisor: Supervisor = {
//   email: "",
//   supervisorid: 0,
//   supervisorname: "", 
//   departmentame: "",
//   specializeddomain: null,
//   groupscount: null,
//   cgpacriteria: 0,
// };

export const defaultSupervisorListResponse: SupervisorListResponse = {
  supervisorList: [],
};

export default function Group() {
  const [supervisorsList, setSupervisorsList] =
    useState<SupervisorListResponse>({supervisorList:[]});
  const [checkedSupervisors, setCheckedSupervisors] = useState([0]);
  const maxProjects = 7;

  useEffect(() => {
    getSupervisorList();
  }, []);
  useEffect(() => {
    console.log("supervisor lists: ", supervisorsList.supervisorList[0]);
  }, [supervisorsList]);

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
        console.log("Response Data: ", responseData);
        setSupervisorsList(responseData);
        // console.log("Supervisors List: ", supervisorsList.supervisorList);
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
          (supervisors: Supervisors, index: number) => (
            <li
              key={index}
              className={`supervisor-item ${
                index % 2 === 0 ? "even-row" : "odd-row"
              }`}
              onMouseEnter={(event) => handleHover(event, `${index}`)}
              onMouseLeave={(event) => handleHover(event, `${index}`)}
            >
              {/* {`/Picture${index + 1}.png`} */}
              <div className="supervisor-column supervisor-info relative ">
                <Image
                  src={`http://localhost:3001/${supervisors.profilepic.replace(/\\/g, "/")}`}
                  alt={""}
                  className="supervisor-image"
                  width={45}
                  height={45}
                />{" "}
                <span className="supervisor-name">
                  {supervisors.supervisorname}
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
                      {supervisors.cgpacriteria === null
                        ? "-"
                        : supervisors.cgpacriteria}
                    </b>
                  </p>
                </div>
              </div>
              <div className="supervisor-column supervisor-projects">
                {supervisors.groupscount === null
                  ? "0"
                  : supervisors.groupscount}
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
                      handleCheckboxChange(supervisors.supervisorid)
                    }
                    checked={checkedSupervisors.includes(
                      supervisors.supervisorid
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
          >REQUEST</button>
        </div>
      </ul>
    </section>
  );
}
