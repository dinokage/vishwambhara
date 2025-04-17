export type TeamMember = {
  id: number;
  name: string;
  designation: string;
  imageId: string;
};

// Sample team data with CloudinaryImage public_ids
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Gouri Prasad Patnaik",
    designation: "Manager - Stores",
    imageId: "/team/pp-gouri.png", // Cloudinary public_id
  },
  {
    id: 2,
    name: "Govindu rajulu Kotipalli",
    designation: "Service Manager - South",
    imageId: "/team/govindu.png",
  },
  {
    id: 3,
    name: "Santosh Sahoo",
    designation: "Service Manager - North",
    imageId: "/team/santosh.png",
  },
  {
    id: 4,
    name: "Satyanarayana Kotipalli",
    designation: "service Team Leader - South",
    imageId: "/team/satyanarayana.png",
  },
  {
    id: 5,
    name: "Satyakiran Kandula",
    designation: "Manager - CECB ",
    imageId: "/team/satyakiran.png",
  },
  {
    id: 6,
    name: "Sai Kumar Metta",
    designation: "Service Team Leader-North",
    imageId: "/team/saikumar.png",
  },
];