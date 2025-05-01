"use client";
import { useAdminContext } from "@/context/AdminContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditGroupForm from "../../../Components/EditGroupForm";
import FormSkeleton from "../../../Components/FormSkeleton";

const EditGroup = () => {
  const groupTemplate: GroupDetails = {
    id: 0,
    name: "",
    status: "",
    projectId: 0,
    projectName: "",
    supervisorId: 0,
    supervisorName: "",
    students: [],
  };

  const { groupId } = useParams();
  const { findDummyGroupById, error, isLoading } = useAdminContext();
  const [group, setGroup] = useState<GroupDetails>({} as GroupDetails);

  const fetchGroupData = async () => {
    const data = await findDummyGroupById(Number(groupId));
    console.log(data);
    setGroup(data);
  };
  useEffect(() => {
    console.log(groupId);
    if (groupId) {
      console.log("Fetching group data...");
      fetchGroupData();
    }
  }, [groupId]);

  return (
    <section className="wrapper overflow-y-auto scroll-smooth">
      {error && (
        <p className="text-center text-red-500 mt-4">
          {error ? error : "No group data available"}
        </p>
      )}
      {isLoading && !error && (
        <FormSkeleton fields={Object.keys(groupTemplate).length} />
      )}
      {!isLoading && group && <EditGroupForm group={group} />}
    </section>
  );
};

export default EditGroup;
