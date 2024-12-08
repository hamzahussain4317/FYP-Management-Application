"use client";
import React, { useState ,useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/Schemas/createTaskForm";
import { useRouter } from "next/navigation";

interface createTask{
  taskName:string;
  taskDescription:string;
  taskDeadline:string;
  stdEmail:string;

}

const AssignTask = () => {
  const router = useRouter();
  const [userId , setUserId]=useState<number>(0);
  const [projectID,setProjectID]=useState<boolean>();


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<createTask>({
    resolver: zodResolver(createTaskSchema),
  });

  useEffect(()=>{
    setUserId(Number(sessionStorage.getItem("userId")));
    console.log("projectID:", sessionStorage.getItem("projectID"));
    if(sessionStorage.getItem("projectID")!==undefined){
      console.log("inside if")
      setProjectID(true)
    }

  },[])

 const createTask=async(data:createTask)=>{
  try {
    const response = await fetch(
      `http://localhost:3001/student/assignTask/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         stdMail:data.stdEmail,
         taskName:data.taskName,
         taskDescription:data.taskDescription,
         taskDeadline:data.taskDeadline
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
 } 


 

  const onSubmit = async (data: createTask) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
    createTask(data);
  };


  return (
    <section className="wrapper min-h-full space-y-4 p-6">
      <h1 className="text-2xl font-bold mb-10 text-center text-gray-700">
        Assign Task
      </h1>
      {(!projectID)?(
        <div>
          <h1>No project Started Yet</h1>
        </div>
      ):(
      <form className="space-y-8  ">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            {...register("stdEmail")}
            type="email"
            id="email"
            name="stdEmail"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          {errors.stdEmail && (
              <div className="errors">{errors.stdEmail?.message}</div>
            )}
        </div>

        <div>
          <label
            htmlFor="taskName"
            className="block text-sm font-medium text-gray-600"
          >
            Task Name
          </label>
          <input
          {...register("taskName")}
            type="text"
            id="taskName"
            name="taskName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          {errors.taskName && (
              <div className="errors">{errors.taskName?.message}</div>
            )}
        </div>

        <div>
          <label
            htmlFor="taskDescription"
            className="block text-sm font-medium text-gray-600"
          >
            Task Description
          </label>
          <textarea
          {...register("taskDescription")}
            id="taskDescription"
            name="taskDescription"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows={3}
            required
          ></textarea>
          {errors.taskDescription && (
              <div className="errors">{errors.taskDescription?.message}</div>
            )}
        </div>

        <div>
          <label
            htmlFor="taskDeadline"
            className="block text-sm font-medium text-gray-600"
          >
            Task Deadline
          </label>
          <input
          {...register("taskDeadline")}
            type="datetime-local"
            id="taskDeadline"
            name="taskDeadline"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
          {errors.taskDeadline && (
              <div className="errors">{errors.taskDeadline?.message}</div>
            )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 bottom-0"
          onClick={handleSubmit(onSubmit)}
        >
          Assign Task
        </button>
      </form>)}
    </section>
  );
};

export default AssignTask;
