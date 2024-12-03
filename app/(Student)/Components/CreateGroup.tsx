"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGroupSchema } from "@/Schemas/createGroup";

interface group {
  groupName: string;
  email: string;
}

const CreateGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [memberEmail, setMemberEmail] = useState<string>("");
  const addNewMember = () => {
    setGroupMembers((prev) => [...prev, memberEmail]);
    setMemberEmail("");
    if (groupMembers.length === 2) {
      const buttonEl: HTMLButtonElement =
        document.getElementById("add-member")!;
      if (buttonEl instanceof HTMLButtonElement) {
        buttonEl.style.opacity = "0.5";
        buttonEl.disabled = true;
      }
    }
  };
  return (
    <>
      <h1 className="proposal-heading">Initialize Your FYP Group</h1>
      <div className="flex flex-col justify-start items-center h-auto p-[10px]">
        <form className="h-full p-[20px] rounded-xl border-4 border-[#ccc] w-full">
          <div className="input-group">
            <label className="form-label">Group Name:</label>
            <input
              {...register("groupName")}
              type="text"
              name="projectName"
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
              <label className="form-label">Add New Member Email:</label>
              <input
                {...register("email")}
                type="email"
                className="input-field"
                onChange={(event) => {
                  setMemberEmail(event?.target.value);
                }}
                value={memberEmail}
                placeholder="Enter group member's email"
                required
              />
              <div className="errors">{errors.email?.message}</div>
              <div className="px-8 py-2">
                <ul
                  className="h-auto w-full flex flex-col justify-start items-start space-y-2"
                  style={{ listStyle: "number" }}
                >
                  {groupMembers.map((member, index) => (
                    <li key={index} className="border-b-1px border-p-gray-500">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="add-member"
                type="button"
                onClick={addNewMember}
                // onClick={handleAddMember}
                className="add-supervisor-button disabled:opacity-50"
              >
                Add New Member
              </button>
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
