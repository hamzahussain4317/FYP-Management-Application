"use client";
import Link from "next/link";
interface Props {
  group: GroupList;
}

const GroupList = ({ group }: Props) => {
  // const handleEditGroup = (groupId: number) => {};
  return (
    <>
      <Link
        href={`groups/editgroup/${group.id}`}
        className="border-blue-500 hover:border-blue-600 transition-all duration-200 hover:scale-110 hover:shadow-lg"
        // onClick={() => handleEditGroup(group.groupID)}
      >
        <div className="h-[10rem] dark:bg-dark-primary-hover rounded-lg">
          <h1 className="font-bold dark:text-dark-text text-light-text">
            {group.name}
          </h1>
        </div>
      </Link>

      <div className="p-2 grid grid-cols-2 md:grid-cols-1 gap-4 text-lg  [&_*]:flex [&_*]:items-center [&_*]:justify-start [&_*]:space-x-2">
        <div className="col-span-1 "></div>

        <div className="col-span-1">
          <h4 className=" font-medium text-gray-500">Project Name:</h4>
          <p className="text-base font-bold dark:text-dark-text text-light-text">
            {group.projectName}
          </p>
        </div>

        <div className="col-span-1">
          <h4 className=" font-medium text-gray-500">Status</h4>
          <p
            className={`text-base font-bold  ${
              group.status === "Active" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {group.status}
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-medium text-gray-500">Supervisor Name: </h4>
          <p className="text-base font-bold dark:text-dark-text text-light-text">
            {group.supervisorName}
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-medium text-gray-500">Number of Students: </h4>
          <p className="text-base font-bold dark:text-dark-text text-light-text">
            {group.studentsCount} Students
          </p>
        </div>
      </div>
    </>
  );
};

export default GroupList;
