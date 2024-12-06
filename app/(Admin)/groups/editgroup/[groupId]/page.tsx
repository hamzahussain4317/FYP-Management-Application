"use client";
import { useAdminContext } from "@/context/AdminContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditGroupForm from "../../../Components/EditGroupForm";

const EditGroup = () => {
  const { groupId } = useParams();
  const { findByGroupId } = useAdminContext();
  const [group, setGroup] = useState<GroupDetails[] | null>(null);
  useEffect(() => {
    if (groupId) {
      const groupData = findByGroupId(Number(groupId));
      setGroup(groupData);
    }
  }, [groupId, findByGroupId]); // Dependency array
  return (
    <section className="wrapper flex justify-center items-center">
      {group ? <EditGroupForm group={group} /> : <p>No such Group Exist</p>}
    </section>
  );
};

export default EditGroup;
