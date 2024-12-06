"use client";
import { useAdminContext } from "@/context/AdminContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditGroupForm from "../../../Components/EditGroupForm";

const EditGroup = () => {
  const { groupId } = useParams();
  const { findByGroupId, error, isLoading } = useAdminContext();
  const [group, setGroup] = useState<GroupDetails[] | null>(null);
  useEffect(() => {
    if (groupId) {
      const groupData = findByGroupId(Number(groupId));
      setGroup(groupData);
    }
  }, [groupId, findByGroupId]); // Dependency array
  return (
    <section className="wrapper flex justify-center items-center">
      {isLoading && !error && <p>Loading Group Data...</p>}
      {!error && group?.length ? (
        <EditGroupForm group={group} />
      ) : (
        <p>{error}</p>
      )}
    </section>
  );
};

export default EditGroup;
