"use client";
import GroupDetails from "../Components/GroupDetails";
import CreateGroup from "../Components/CreateGroup";
import { useState } from "react";

const groupMember: Student[] = [
  {
    id: 1,
    name: "John Doe",
    studentId: "STU001",
    domain: "Web Development",
    department: "Computer Science",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  {
    id: 2,
    name: "Jane Smith",
    studentId: "STU002",
    domain: "Data Science",
    department: "Information Technology",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  {
    id: 3,
    name: "Alice Brown",
    studentId: "STU003",
    domain: "Cybersecurity",
    department: "Computer Engineering",
    section: "BCS-5K",
    Degree: "BS(CS)",
  },
  // Add more students if needed
];

const groupMembers: Student[] = [];
const supervisor = {
  supervisorID: 1,
  supervisorName: "Saleh Vohra",
  supervisorDomain: "Artificial Intellligence",
  supervisorEmail: "saleh.vohra@nu.edu.pk",
};

export default function Group() {
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const handleButton = () => {
    setIsButtonClicked(true);
  };

  return (
    <section
      className={`wrapper justify-center items-center h-full ${
        !isButtonClicked && !groupMembers.length && "flex"
      }`}
    >
      {groupMembers.length === 0 ? (
        <>
          {!isButtonClicked ? (
            <button
              id="create-button"
              className="rounded-xl h-[60px] w-[150px]   bg-green-500 hover:bg-blue-500 hover:text-zinc-50 border-2px"
              onClick={handleButton}
            >
              Create Group
            </button>
          ) : (
            <CreateGroup />
          )}
        </>
      ) : (
        <GroupDetails groupMembers={groupMembers} supervisor={supervisor} />
      )}
    </section>
  );
}
