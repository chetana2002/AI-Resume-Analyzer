export const matchJobSkills = (
  resumeSkills: string[],
  jobDescription: string
) => {
  const jd = jobDescription.toLowerCase();

  const matched: string[] = [];
  const missing: string[] = [];

  resumeSkills.forEach((skill) => {
    if (jd.includes(skill.toLowerCase())) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });

  const score =
    resumeSkills.length === 0
      ? 0
      : Math.round((matched.length / resumeSkills.length) * 100);

  return {
    score,
    matched,
    missing,
  };
};