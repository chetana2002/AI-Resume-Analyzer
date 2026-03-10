import React from "react";

interface SkillTagsProps {
  skills: string[];
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">

      <h2 className="text-2xl font-bold mb-4">
        Detected Skills
      </h2>

      <div className="flex flex-wrap gap-2">

        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
};

export default SkillTags;