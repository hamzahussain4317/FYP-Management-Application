"use client";
import { useState } from "react";
import StdSideBar from "../../../Components/stdSideBar";
import StdNavBar from "../../../Components/stdNavBar";
export default function Group() {
  const [supervisorEmail, setSupervisorEmail] = useState<string>("");
  const [supervisors, setSupervisors] = useState<string[]>([]);

  const handleAddSupervisor = () => {
    if (supervisorEmail.trim() !== "") {
      setSupervisors([...supervisors, supervisorEmail]);
      setSupervisorEmail(""); // Clear the input field after adding
    }
  };

  const handleSupervisorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSupervisorEmail(e.target.value);
  };
  return (
    <section className="stdDashboard">
      <StdNavBar />
      <StdSideBar />
      <div className="Proposal">
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
                    type="text"
                    name="projectName"
                    className="input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="form-label">Project Domain:</label>
                  <input
                    type="text"
                    name="projectDomain"
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <label className="form-label">Project Description:</label>
              <textarea
                name="projectDescription"
                className="textarea-field"
                rows={4}
                required
              />
            </div>

            {/* Group Details */}
            <div className="form-section">
              <h2 className="section-title">Group Details</h2>
              <div className="student-details">
                <h3 className="student-title">Student 1</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label className="form-label">Student ID:</label>
                    <input
                      type="text"
                      name="student1Id"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">Domain:</label>
                    <input
                      type="text"
                      name="student1Domain"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="student-details">
                <h3 className="student-title">Student 2</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label className="form-label">Student ID:</label>
                    <input
                      type="text"
                      name="student2Id"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">Domain:</label>
                    <input
                      type="text"
                      name="student2Domain"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="student-details">
                <h3 className="student-title">Student 3</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label className="form-label">Student ID:</label>
                    <input
                      type="text"
                      name="student3Id"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label className="form-label">Domain:</label>
                    <input
                      type="text"
                      name="student3Domain"
                      className="input-field"
                      required
                    />
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
                  type="email"
                  className="input-field"
                  onChange={handleSupervisorChange}
                  value={supervisorEmail}
                  placeholder="Enter supervisor's email"
                  required
                />
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
                type="file"
                accept=".pdf,.doc,.docx"
                className="file-input"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Submit Proposal
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
