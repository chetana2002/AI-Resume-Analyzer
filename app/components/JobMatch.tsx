import React from "react";

interface JobMatchProps {
  score: number;
  matched: string[];
  missing: string[];
}

const JobMatch: React.FC<JobMatchProps> = ({ score, matched, missing }) => {

  const color =
    score > 70 ? "text-green-600" :
    score > 40 ? "text-yellow-600" :
    "text-red-600";

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">

      <h2 className="text-2xl font-bold mb-4">
        Job Match Score
      </h2>

      <p className={`text-4xl font-bold ${color}`}>
        {score}%
      </p>

      <div className="mt-6">

        <h3 className="font-semibold text-lg mb-2">
          Matched Skills
        </h3>

        <ul className="list-disc pl-5 text-green-700">
          {matched.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

      </div>

      <div className="mt-6">

        <h3 className="font-semibold text-lg mb-2">
          Missing Skills
        </h3>

        <ul className="list-disc pl-5 text-red-600">
          {missing.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default JobMatch;