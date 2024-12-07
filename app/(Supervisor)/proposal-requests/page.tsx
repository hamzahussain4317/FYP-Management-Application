"use client";
import { useEffect } from "react";
import { useSupervisorContext } from "@/context/SupervisorContext";

const ProposalRequestsList = () => {
  const {
    getProposals,
    handleAccept,
    handleReject,
    proposals,
    loading,
    error,
  } = useSupervisorContext();

  useEffect(() => {
    getProposals();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-600">Loading proposals...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="proposal-list-container max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Proposals</h2>
      {proposals.map((proposal: Proposal) => (
        <div
          key={proposal.groupID}
          className="proposal-card border border-gray-200 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {proposal.projectName}
          </h3>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Group:</span> {proposal.groupName}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <span className="font-medium">Domain:</span>{" "}
            {proposal.projectDomain || "N/A"}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            <span className="font-medium">Description:</span>{" "}
            {proposal.projectDescription}
          </p>
          {proposal.projectFile && (
            <div className="mt-2">
              <a
                href={proposal.projectFile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                📎 View File
              </a>
            </div>
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
      ))}
    </div>
  );
};

export default ProposalRequestsList;
