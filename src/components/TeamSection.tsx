"use client";

import Link from "next/link";
// import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { teamMembers } from "@/lib/team";
import CloudinaryImage from "./CloudinaryImage";

// Team member type definition


export function TeamSection() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl">
            Meet the talented individuals who drive our company forward with their expertise and vision.
          </p>
        </div>
        <Link
          href="/team"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
        >
          <span>View All Team</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {teamMembers.slice(0,5).map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="bg-gray-100 relative">
              <CloudinaryImage
                src={member.imageId}
                alt={`${member.name} - ${member.designation}`}
                width={400}
                height={400}
                removeBackground={true} // Optional: Set to true if you want to remove the background
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

// Export the team members data for reuse
export { teamMembers };

export default TeamSection;