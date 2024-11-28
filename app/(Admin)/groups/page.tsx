"use client";
import GroupList from "../Components/GroupList";
import SearchGroup from "../Components/SearchGroup";
import { useEffect, useState } from "react";

export default function FYPGroups() {
  const [filteredGroups, setFilteredGroups] = useState<GroupDetails[]>([
    {
      groupID: 0,
      groupName: "Group 1",
      status: "Completed",
      projectID: 12,
      projectName: "Food On the Go",
      supervisorID: 100,
      supervisorName: "Hamdan Vohra",
      students: ["22k-4318", "22k-4317", "22k-4280"],
    },
    {
      groupID: 1,
      groupName: "Group 2",
      status: "Not Started",
      projectID: 12,
      projectName: "Food On the Go",
      supervisorID: 100,
      supervisorName: "Hamdan Vohra",
      students: ["22k-4318", "22k-4317", "22k-4280"],
    },
    {
      groupID: 2,
      groupName: "Group 3",
      status: "Completed",
      projectID: 12,
      projectName: "Hello",
      supervisorID: 100,
      supervisorName: "Hamdan Vohra",
      students: ["22k-4318", "22k-4317", "22k-4280"],
    },
    {
      groupID: 3,
      groupName: "Group 4",
      status: "Completed",
      projectID: 12,
      projectName: "FYP Portal",
      supervisorID: 100,
      supervisorName: "Hamdan Vohra",
      students: ["22k-4318", "22k-4317", "22k-4280"],
    },
    {
      groupID: 4,
      groupName: "Group 5",
      status: "Completed",
      projectID: 12,
      projectName: "Food On the Go",
      supervisorID: 100,
      supervisorName: "Hamdan Vohra",
      students: ["22k-4318", "22k-4317", "22k-4280"],
    },
  ]);

  const [filter, setFilterBy] = useState<groupFilterBy>({
    byGroupName: true,
    byProjectName: false,
    byStudentRoll: false,
  });

  const handleFilterBy = (filterBy: groupFilterBy) => {
    setFilterBy(filterBy);
  };

  const handleSearch = (searchText: string) => {
    let filtered = filteredGroups;

    if (filter?.byGroupName)
      filtered = filteredGroups.filter((group) =>
        group.groupName.toLowerCase().includes(searchText.toLowerCase())
      );
    else if (filter?.byProjectName)
      filtered = filteredGroups.filter((group) =>
        group.projectName.toLowerCase().includes(searchText.toLowerCase())
      );
    else if (filter?.byStudentRoll)
      filtered = filteredGroups.filter((group) =>
        group.students.forEach((rollNo) =>
          rollNo.toLowerCase().includes(searchText.toLowerCase()) ? true : false
        )
      );
    setFilteredGroups(filtered);
  };

  return (
    <section className="wrapper">
      <SearchGroup onFilterBy={handleFilterBy} onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <ul className="flex flex-col jusitfy-center space-y-4 w-full">
          {filteredGroups.map((group: GroupDetails, index) => {
            return (
              <li
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-150"
                } rounded-lg p-2`}
              >
                <GroupList group={group} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
