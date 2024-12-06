"use client";
import Link from "next/link";
interface Props {
  group: GroupDetails;
}

const GroupList = ({ group }: Props) => {
  // const handleEditGroup = (groupId: number) => {};
  return (
    // <>
    <Link
      href={`groups/editgroup/${group.groupID}`}
      className="border-blue-500 hover:border-blue-600 transition-all duration-200 hover:scale-110 hover:shadow-lg"
      // onClick={() => handleEditGroup(group.groupID)}
    >
      <div className="grid grid-cols-2 gap-4 text-lg">
        <div className="col-span-1">
          <h4 className="text-sm font-medium text-gray-500 text-lg">
            Group ID
          </h4>
          <p className="text-base font-bold text-gray-700">{group.groupID}</p>
        </div>
        <div className="col-span-1">
          <h4 className="text-sm font-medium text-gray-500">Group Name</h4>
          <p className="text-base font-bold text-gray-700">{group.groupName}</p>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-medium text-gray-500">Project Name</h4>
          <p className="text-base font-semibold text-gray-700">
            {group.projectName}
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <p
            className={`text-base font-semibold ${
              group.status === "Completed"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {group.status}
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-medium text-gray-500">Supervisor Name</h4>
          <p className="text-base font-semibold text-gray-700">
            {group.supervisorName}
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-medium text-gray-500">
            Number of Students
          </h4>
          <p className="text-base font-semibold text-gray-700">
            {group.students.length}
          </p>
        </div>
      </div>
    </Link>
    // </>
  );
};

export default GroupList;
