import { useContext, createContext, useEffect } from "react";
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
  const [supervisorId, setSupervisorId] = useState<number>();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [groups, setGroups] = useState<groupDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<SupervisorProfile>();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    setSupervisorId(Number(userId));
  },[]);
  // Profile Fetching
  const fetchProfile = async (userId: number) => {
    try {
      const response = await fetch(`${baseUrl}/getProfile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        const destructedData: SupervisorProfile = {
          personalInfo: {
            name: `${result.supervisor.firstName} ${result.supervisor.lastName}`,
            email: result.supervisor.email,
            contactNumber: result.supervisor.contactNo,
            department: result.supervisor.departmentName,
          },
          academicInfo: {
            domain: result.supervisor.specializedDomain,
            cgpaCriteria: result.supervisor.cgpaCriteria,
            designation: result.supervisor.designation,
            qualification: result.supervisor.qualification,
          },
        };

        setProfile(destructedData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
      } else {
        console.log("Unknown error:", error);
      }
    } finally {
      setError(null);
      setLoading(false);
    }
  };

  //Groups Fetching
  const fetchGroups = async (userId: number) => {
    try {
      const response = await fetch(
        `${baseUrl}/getSupervisingGroups/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error);
      } else {
        console.log("Unknown error:", error);
      }
    } finally {
      setError(null);
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
        supervisorId,
        profile,
        groups,
        proposals,
        loading,
        error,
        fetchProfile,
        fetchGroups,
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
