interface Props {
  group: GroupDetails;
}

const GroupList = ({ group }: Props) => {
  return (
    <>
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
          <p className="text-base text-gray-700">{group.projectName}</p>
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
          <p className="text-base text-gray-700">{group.supervisorName}</p>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-medium text-gray-500">
            Number of Students
          </h4>
          <p className="text-base text-gray-700">{group.students.length}</p>
        </div>

        <div className="col-span-2">
          <button className="w-full text-center text-xl bg-green-500 rounded-lg hover:bg-blue-500">
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupList;
