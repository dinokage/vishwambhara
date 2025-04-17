import Image from "next/image";
import { teamMembers } from "@/lib/team";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TeamsPage() {
  // For the full teams page, we can add more members or use the same list for now
  const allTeamMembers = [...teamMembers];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-6">
        <Link 
          href="/" 
          className="flex items-center text-blue-600 hover:underline mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold">Our Team</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        At Classique Engineering Enterprises, our success is driven by our dedicated team of professionals 
        who bring expertise, passion, and commitment to every project. Meet the individuals who make 
        our company a leader in the industry.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allTeamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow w-fit">
            <div className="bg-gray-100 relative">
              <Image
                src={member.imageId}
                alt={`${member.name} - ${member.designation}`}
                width={300}
                height={300}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.designation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}