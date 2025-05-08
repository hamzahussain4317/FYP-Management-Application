"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGroupSchema } from "@/Schemas/createGroup";
import { useRouter } from "next/navigation";

interface group {
  groupName: string;
  email1: string;
  email2: string;
  email3: string;
}

const CreateGroup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<group>({
    resolver: zodResolver(createGroupSchema),
  });

  

  const assignGroup = async (data: group) => {
    try {
      const response = await fetch(
        "http://localhost:3001/student/createGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emails: [data.email1, data.email2, data.email3],
            groupName: data.groupName,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        router.push("/Home");
      } else if (response.status === 400) {
        throw new Error("exactly three emails required");
      } else if (response.status === 500) {
        throw new Error("Transcation start failed");
      } else {
        throw new Error("failed to create group");
      }
    } catch (error: any) {
      setError("root", {
        message: error?.message,
      });
      console.log(error);
    }
  };

  const onSubmit = async (data: group) => {
    setIsLoading(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    reset();
    assignGroup(data);
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
