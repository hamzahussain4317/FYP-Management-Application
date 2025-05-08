"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProposalSchema } from "@/Schemas/ProposalSchema";

interface proposalForm {
  supervisorEmail: string;
  projectName: string;
  projectDomain: string;
  projectDescription: string;
  groupName: string;
  proposalFile: File;
}

export default function Group() {
  // const [supervisorEmail, setSupervisorEmail] = useState<string>("");
  const [supervisors, setSupervisors] = useState<string[]>([]);


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch, // Allows watching a specific field value
    getValues,
    reset,
  } = useForm<proposalForm>({
    resolver: zodResolver(createProposalSchema),
  });



  
  const handleAddSupervisor = () => {
    const supervisorEmail = getValues("supervisorEmail"); // Dynamically grab the value directly from form state
    if (supervisorEmail?.trim() && !supervisors.includes(supervisorEmail)) {
      setSupervisors([...supervisors, supervisorEmail]);
    }
  };

  // const handleSupervisorChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSupervisorEmail(e.target.value);
  // };


  const onSubmit = async (data:proposalForm ) => {
    console.log(data);
    console.log(supervisors);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
   
  };
  return (
    <section className="wrapper">
      <h1 className="proposal-heading">Create Your Proposal</h1>
      {/* proposal form */}
      <div className="proposal-div">
        <form className="form-container">
          {/* Project Details */}
          <div className="form-section">
            <h2 className="section-title">Project Details</h2>
            <div className="input-row">
              <div className="input-group">
                <label className="form-label">Project Name:</label>
                <input
                {...register("projectName")}
                  type="text"
                  name="projectName"
                  className="input-field"
                  required
                />
                {errors.projectName && (
              <div className="errors">{errors.projectName?.message}</div>
            )}
              </div>
              <div className="input-group">
                <label className="form-label">Project Domain:</label>
                <input
                {...register("projectDomain")}
                  type="text"
                  name="projectDomain"
                  className="input-field"
                  required
                />
                {errors.projectDomain && (
              <div className="errors">{errors.projectDomain?.message}</div>
            )}
              </div>
            </div>
            <label className="form-label">Project Description:</label>
            <textarea
            {...register("projectDescription")}
              name="projectDescription"
              className="textarea-field"
              rows={4}
              required
            />
            {errors.projectDescription && (
              <div className="errors">{errors.projectDescription?.message}</div>
            )}
          </div>

          {/* Group Details */}
          <div className="form-section">
            <h2 className="section-title">Group Details</h2>
            <div className="student-details">
              <div className="input-row">
                <div className="input-group">
                  <label className="form-label">Group Name:</label>
                  <input
                  {...register("groupName")}
                    type="text"
                    name="groupName"
                    className="input-field"
                    required
                  />
                  {errors.groupName && (
              <div className="errors">{errors.groupName?.message}</div>
            )}
                </div>
              </div>
            </div>
          </div>

          {/* Supervisor Details */}
          <div className="form-section">
            <h2 className="section-title">Supervisor</h2>
            <div className="supervisor-input">
              <label className="form-label">Add Supervisor Email:</label>
              <input
              {...register("supervisorEmail")}
                type="email"
                className="input-field"
                name="supervisorEmail"
                placeholder="Enter supervisor's email"
                required
              />
              {errors.supervisorEmail && (
              <div className="errors">{errors.supervisorEmail?.message}</div>
            )}
              <button
                type="button"
                onClick={handleAddSupervisor}
                className="add-supervisor-button"
              >
                Add Supervisor
              </button>
            </div>
            {/* List of Added Supervisors */}
            {supervisors.length > 0 && (
              <div className="supervisor-list">
                <h3 className="list-title">Added Supervisors:</h3>
                <ul className="supervisor-list-items">
                  {supervisors.map((email, index) => (
                    <li key={index} className="supervisor-item">
                      {email}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Proposal Document Upload */}
          <div className="form-section">
            <h2 className="section-title">Proposal Document</h2>
            <label className="form-label">Upload Proposal (PDF/Word):</label>
            <input
            {...register("proposalFile")}
              type="file"
              accept=".pdf,.doc,.docx"
              className="file-input"
              name="proposalFile"
              required
            />
            {errors.proposalFile && (
              <div className="errors">{errors.proposalFile?.message}</div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button" onClick={handleSubmit(onSubmit)}>
            Submit Proposal
          </button>
        </form>
      </div>
    </section>
  );
}
