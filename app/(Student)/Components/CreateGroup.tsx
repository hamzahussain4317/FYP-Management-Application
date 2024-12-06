"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGroupSchema } from "@/Schemas/createGroup";

interface group {
  groupName: string;
  email1: string;
  email2:string;
  email3:string;
}

const CreateGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    // setError,
    // setValue,
    // getValues,
    formState: { errors },
    reset,
  } = useForm<group>({
    resolver: zodResolver(createGroupSchema),
  });
  const onSubmit = async (data: group) => {
    setIsLoading(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    reset();
    //will use setErrorMessage if the data doesnot matches the api result//
  };

  // const [groupMembers, setGroupMembers] = useState<string[]>([]);
  // const [memberEmail, setMemberEmail] = useState<string>("");
  // const addNewMember = () => {
  //   setGroupMembers((prev) => [...prev, memberEmail]);
  //   setMemberEmail("");
  //   if (groupMembers.length === 2) {
  //     const buttonEl: HTMLButtonElement =
  //       document.getElementById("add-member")!;
  //     if (buttonEl instanceof HTMLButtonElement) {
  //       buttonEl.style.opacity = "0.5";
  //       buttonEl.disabled = true;
  //     }
  //   }
  // };
  return (
    <>
      <h1 className="proposal-heading">Initialize Your FYP Group</h1>
      <div className="flex flex-col justify-start items-center h-auto p-[10px]">
        <form className="h-full p-[20px] rounded-xl border-4 border-[#ccc] w-full">
          <div className="input-group">
            <label className="form-label">Group Name:</label>
            <input
              {...register("groupName")}
              type="string"
              name="groupName"
              className="input-field"
              required
            />
            {errors.groupName && (
              <div className="errors">{errors.groupName?.message}</div>
            )}
          </div>
          <div className="form-section">
            <h2 className="section-title">Group Members</h2>
            <div className="supervisor-input">
              <label className="form-label">Add Member 1 email:</label>
              <input
                {...register("email1")}
                type="email"
                className="input-field"
                placeholder="Enter group member's email"
                required
              />
              <div className="errors">{errors.email1?.message}</div>
              <label className="form-label">Add Member 2 email:</label>
              <input
                {...register("email2")}
                type="email"
                className="input-field"
               
                placeholder="Enter group member's email"
                required
              />
              <div className="errors">{errors.email2?.message}</div>
              <label className="form-label">Add member 3 email:</label>
              <input
                {...register("email3")}
                type="email"
                className="input-field"
               
                placeholder="Enter group member's email"
                required
              />
              <div className="errors">{errors.email3?.message}</div>
              {errors.email1?.type === "refine" && (
              <div className="errors">{errors.email1.message}</div>
            )}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="p-3 border-gray-500 border-2 w-[120px] rounded-lg hover:border-green-500"
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
