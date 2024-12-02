"use client";
import React from "react";
import { useState } from "react";

const CreateGroup = () => {
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [memberEmail, setMemberEmail] = useState<string>("");
  const addNewMember = () => {
    setGroupMembers((prev) => [...prev, memberEmail]);
    if (groupMembers.length === 3) {
      const buttonEl: HTMLElement = document.getElementById("add-member")!;
      if (buttonEl instanceof HTMLElement) {
        buttonEl.classList.toggle("hidden");
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
              type="text"
              name="projectName"
              className="input-field"
              required
            />
          </div>
          <div className="form-section">
            <h2 className="section-title">Group Members</h2>
            <div className="supervisor-input">
              <label className="form-label">Add New Member Email:</label>
              <input
                type="email"
                className="input-field"
                onChange={(event) => {
                  setMemberEmail(event?.target.value);
                }}
                value={memberEmail}
                placeholder="Enter group member's email"
                required
              />
              <div className="">
                <ul className="h-auto w-auto" style={{ listStyle: "none" }}>
                  {groupMembers.length &&
                    groupMembers.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                </ul>
              </div>
              <button
                id="add-member"
                type="button"
                onClick={addNewMember}
                className="add-supervisor-button"
              >
                Add New Member
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
