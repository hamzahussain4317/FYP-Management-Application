"use client";
import { useEffect } from "react";
import { useSupervisorContext } from "@/context/SupervisorContext";

const ProposalRequestsList = () => {
  const {
    fetchProposalRequests,
    supervisorId,
    handleAccept,
    handleReject,
    proposals,
    loading,
    error,
  } = useSupervisorContext();

  useEffect(() => {
    fetchProposalRequests(supervisorId);
  }, []);

  const handleDownloadFile = (proposal: Proposal) => {
    if (proposal.projectFile) {
      // Create a Blob URL for the file
      const blob = new Blob(
        [Uint8Array.from(atob(proposal.projectFile), (c) => c.charCodeAt(0))],
        { type: "application/octet-stream" }
      );
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${proposal.projectName}_file`;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      alert("No file attached for this proposal.");
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-600">Loading proposals...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <section className="wrapper">
      <div className="proposal-list-container max-w-5xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Proposals</h2>
        {proposals.map((proposal: Proposal) => (
          <div
            key={proposal.groupID}
            className="proposal-card border border-gray-200 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow grid grid-cols-2 gap-3"
          >
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {proposal.projectName}
              </h3>
              <p className="text-mdtext-gray-700 mb-1">
                <span className="font-medium">Group:</span> {proposal.groupName}
              </p>
              <p className="text-md text-gray-700 mb-1">
                <span className="font-medium">Domain:</span>{" "}
                {proposal.projectDomain || "N/A"}
              </p>
              <p className="text-md text-gray-700 mb-4">
                <span className="font-medium">Description:</span>{" "}
                {proposal.projectDescription}
              </p>
              {proposal.projectFile && (
                <button
                  onClick={() => handleDownloadFile(proposal)}
                  className="text-blue-500"
                >
                  <i className="fa-solid fa-download text-blue-500"></i>{" "}
                  <span>Download File</span>
                </button>
              )}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleAccept(proposal.groupID)}
                  className="bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(proposal.groupID)}
                  className="bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Reject
                </button>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Proposal Review
              </h3>
              <textarea
                name="review-message"
                id="review-message"
                className="w-full min-h-40 border-2 border-gray-500 rounded-lg text-lg p-2 "
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProposalRequestsList;
