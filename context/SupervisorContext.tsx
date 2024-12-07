import { useContext, createContext } from "react";
import { useState } from "react";

const SupervisorContext = createContext<any>(undefined);

export default function SupervisorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [profile, setProfile] = useState(undefined);
  const [baseUrl, setBaseUrl] = useState<string>(
    "http://localhost:3001/supervisor/"
  );
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<SupervisorProfile>();

  const fetchProfile = async (userId: number) => {
    try {
      const response = await fetch(`${baseUrl}/getProfile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(response);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
      } else {
        console.log("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

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
        projectFile: null,
        proposalStatus: false,
      },
      {
        groupID: 2,
        supervisorID: 2,
        projectName: "E-commerce Platform",
        groupName: "Team Beta",
        projectDomain: "Web Development",
        projectDescription: "A platform for online shopping.",
        projectFile: "/files/ecommerce.pdf",
        proposalStatus: true,
      },
    ];
    return proposals;
  }

  const getProposals = async () => {
    try {
      //here we will use real api route adn diminish the above function the above is just use for static data
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

  const handleAccept = (groupID: number) => {
    console.log(`Accepted Proposal for Group ID: ${groupID}`);
    // Integrate API to accept proposal
  };

  const handleReject = (groupID: number) => {
    console.log(`Rejected Proposal for Group ID: ${groupID}`);
    // Integrate API to reject proposal
  };
  return (
    <SupervisorContext.Provider
      value={{
        proposals,
        loading,
        error,
        fetchProfile,
        getProposals,
        handleReject,
        handleAccept,
      }}
    >
      {children}
    </SupervisorContext.Provider>
  );
}

export const useSupervisorContext = () => useContext(SupervisorContext);
