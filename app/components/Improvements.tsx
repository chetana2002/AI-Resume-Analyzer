import React from "react";

interface ImprovementsProps {
  missingSkills: string[];
}

const Improvements: React.FC<ImprovementsProps> = ({ missingSkills }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">

      <h2 className="text-2xl font-bold mb-4">
        Resume Improvement Suggestions
      </h2>

      <p className="text-gray-600 mb-4">
        Based on the job description and resume analysis, consider improving the following areas.
      </p>

      {missingSkills.length > 0 ? (
        <ul className="list-disc pl-6 text-amber-700 space-y-2">
          {missingSkills.map((skill, index) => (
            <li key={index}>
              Consider adding experience with <b>{skill}</b>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-700">
          Great! Your resume already matches most of the job requirements.
        </p>
      )}

    </div>
  );
};

export default Improvements;