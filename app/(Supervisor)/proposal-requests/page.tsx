"use client";
import { useEffect, useState } from "react";
interface Proposal {
  groupID: number;
  supervisorID: number;
  projectName: string;
  groupName: string;
  projectDomain?: string;
  projectDescription: string;
  projectFile?: string | null; // URL or null if no file
  proposalStatus: boolean; // false for pending, true for reviewed
}

async function fetchProposals(): Promise<Proposal[]> {
  // here will be the fetch request for API
  const proposals = [
    {
      groupID: 1,
      supervisorID: 2,
      projectName: "AI Chatbot",
      groupName: "Team Alpha",
      projectDomain: "AI",
      projectDescription: "A chatbot using NLP.",
      projectFile: null, // Simulate no file
      proposalStatus: false, // Pending
    },
    {
      groupID: 2,
      supervisorID: 2,
      projectName: "E-commerce Platform",
      groupName: "Team Beta",
      projectDomain: "Web Development",
      projectDescription: "A platform for online shopping.",
      projectFile: "/files/ecommerce.pdf", // Simulated file URL
      proposalStatus: true, // Reviewed
    },
  ];
  return proposals;
}

const ProposalRequestsList = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProposals = async () => {
      try {
        const data = await fetchProposals();
        // Sort proposals to show pending ones first
        const pendingProposals = data.filter((p) => !p.proposalStatus);
        const reviewedProposals = data.filter((p) => p.proposalStatus);
        setProposals([...pendingProposals, ...reviewedProposals]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    getProposals();
  }, []);

  const handleAccept = (groupID: number) => {
    console.log(`Accepted Proposal for Group ID: ${groupID}`);
    // TODO: Add API call to accept proposal
  };

  const handleReject = (groupID: number) => {
    console.log(`Rejected Proposal for Group ID: ${groupID}`);
    // TODO: Add API call to reject proposal
  };

  if (loading) return <div>Loading proposals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="proposal-list-container">
      <h2 className="text-xl font-bold mb-4">Proposals</h2>
      {proposals.map((proposal) => (
        <div
          key={proposal.groupID}
          className="proposal-card border rounded-md p-4 mb-4 shadow-md"
        >
          <h3 className="font-semibold text-lg">{proposal.projectName}</h3>
          <p className="text-sm text-gray-600">
            <strong>Group:</strong> {proposal.groupName}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Domain:</strong> {proposal.projectDomain || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Description:</strong> {proposal.projectDescription}
          </p>
          {proposal.projectFile && (
            <div className="mt-2">
              <a
                href={proposal.projectFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                📎 View File
              </a>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleAccept(proposal.groupID)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(proposal.groupID)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
