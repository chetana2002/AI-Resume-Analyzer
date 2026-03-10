import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import JobMatch from "~/components/JobMatch";
import Improvements from "~/components/Improvements";
import SkillTags from "~/components/SkillTags";
import AIRewrite from "~/components/AIRewrite";

export const meta = () => ([
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
]);

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumePath, setResumePath] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [jobMatch, setJobMatch] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);

  const navigate = useNavigate();

  /* ---------------- Authentication Check ---------------- */

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  /* ---------------- Load Resume Data ---------------- */

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      /* ---------- Load Resume Path ---------- */

      if (data.resumePath) {
        setResumePath(data.resumePath);
      }

      /* ---------- Load Resume PDF ---------- */

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      /* ---------- Load Resume Image ---------- */

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      /* ---------- Load AI Feedback ---------- */

      setFeedback(data.feedback);

      /* ---------- Load Job Match ---------- */

      if (data.jobMatch) {
        setJobMatch(data.jobMatch);
      }

      /* ---------- Load Skills ---------- */

      if (data.skills) {
        setSkills(data.skills);
      }

      console.log({
        resumeUrl,
        imageUrl,
        feedback: data.feedback,
        jobMatch: data.jobMatch,
        skills: data.skills,
      });
    };

    loadResume();
  }, [id]);

  /* ---------------- Resume Strength Score ---------------- */

  const strength =
    feedback && jobMatch
      ? Math.round((feedback.ATS.score + jobMatch.score) / 2)
      : 0;

  return (
    <main className="!pt-0">

      {/* ---------- Navigation ---------- */}

      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">

        {/* ---------- Resume Preview ---------- */}

        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">

          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">

              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>

            </div>
          )}

        </section>

        {/* ---------- Feedback Section ---------- */}

        <section className="feedback-section">

          <h2 className="text-4xl !text-black font-bold">
            Resume Review
          </h2>

          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">

              {/* ---------- Resume Strength ---------- */}

              {jobMatch && (
                <div className="bg-white rounded-2xl shadow-md p-6 w-full">
                  <h2 className="text-2xl font-bold mb-2">
                    Resume Strength
                  </h2>

                  <p className="text-4xl font-bold text-purple-600">
                    {strength}%
                  </p>
                </div>
              )}

              {/* ---------- AI Summary ---------- */}

              <Summary feedback={feedback} />

              {/* ---------- Skill Tags ---------- */}

              {skills.length > 0 && (
                <SkillTags skills={skills} />
              )}

              {/* ---------- AI Resume Rewriter ---------- */}

              {resumePath && (
                <AIRewrite resumePath={resumePath} />
              )}

              {/* ---------- Job Match ---------- */}

              {jobMatch && (
                <JobMatch
                  score={jobMatch.score}
                  matched={jobMatch.matched}
                  missing={jobMatch.missing}
                />
              )}

              {/* ---------- Improvements ---------- */}

              {jobMatch && (
                <Improvements missingSkills={jobMatch.missing} />
              )}

              {/* ---------- ATS Score ---------- */}

              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />

              {/* ---------- Detailed Feedback ---------- */}

              <Details feedback={feedback} />

            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}

        </section>

      </div>
    </main>
  );
};

export default Resume;
