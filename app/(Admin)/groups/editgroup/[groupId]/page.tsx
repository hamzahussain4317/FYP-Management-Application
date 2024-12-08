"use client";
import { useAdminContext } from "@/context/AdminContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import EditGroupForm from "../../../Components/EditGroupForm";

const EditGroup = () => {
  const { groupId } = useParams();
  const { findByGroupId, error, isLoading } = useAdminContext();
  const [group, setGroup] = useState<GroupDetails[] | null>(null);
  const fetchGroupData = async()=>{
    const data = await findByGroupId(Number(groupId));
    console.log(data);
    setGroup(data);
  }
  useEffect(() => {
    console.log(groupId);
    if (groupId) {
      fetchGroupData()
    }
  }, [groupId]); // Dependency array
  
  return (
    <section className="wrapper flex justify-center items-center">
      {isLoading && !error && <p>Loading Group Data...</p>}
      {group? (
        <EditGroupForm group={group} />
      ) : (
        <p>{error}</p>
      )}
    </section>
  );
};

export default EditGroup;
