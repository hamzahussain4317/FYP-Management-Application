import Image from "next/image";
type Supervisor = {
  id: number;
  name: string;
  image: string;
  projectsSupervised: number;
  rating: number;
};
const supervisors: Supervisor[] = [
  {
    id: 1,
    name: "Dr. Alice Johnson",
    image: "/Hamza.jpg",
    projectsSupervised: 3,
    rating: 4,
  },
  {
    id: 2,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 3,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 4,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 5,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 6,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 7,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 8,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 9,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 10,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 11,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
  {
    id: 12,
    name: "Prof. Mark Lee",
    image: "/Hamza.jpg",
    projectsSupervised: 5,
    rating: 3,
  },
];
export default function Group() {
  const maxProjects = 7;
  return (
    <section className="supervisor">
      <h1 className="supervisor-heading">Supervisors</h1>
      <ul className="supervisor-list">
        <li className="supervisor-header">
          <div className="supervisor-column supervisor-info">Supervisor</div>
          <div className="supervisor-column supervisor-projects">
            Projects Supervised
          </div>
          <div className="supervisor-column supervisor-rating">Ratings</div>
        </li>
        {supervisors.map((supervisor, index) => (
          <li
            key={supervisor.id}
            className={`supervisor-item ${
              index % 2 === 0 ? "even-row" : "odd-row"
            }`}
          >
            <div className="supervisor-column supervisor-info">
              <Image
                src={supervisor.image}
                alt={supervisor.name}
                className="supervisor-image"
                width={45}
                height={45}
              ></Image>
              <span className="supervisor-name">{supervisor.name}</span>
            </div>
            <div className="supervisor-column supervisor-projects">
              {supervisor.projectsSupervised}/{maxProjects} Projects
            </div>
            <div className="supervisor-column supervisor-rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`star ${i < supervisor.rating ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
