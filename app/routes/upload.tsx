import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { detectSkills } from "~/lib/skillEngine";
import { matchJobSkills } from "~/lib/jobMatcher";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    try {

      /* ---------------- Upload Resume ---------------- */

      setStatusText("Uploading resume...");
      const uploadedFile = await fs.upload([file]);

      if (!uploadedFile) {
        setStatusText("Error uploading resume");
        return;
      }

      /* ---------------- Convert Resume to Image ---------------- */

      setStatusText("Converting resume to image...");
      const imageFile = await convertPdfToImage(file);

      if (!imageFile.file) {
        setStatusText("Failed to convert PDF");
        return;
      }

      /* ---------------- Upload Image ---------------- */

      setStatusText("Uploading preview image...");
      const uploadedImage = await fs.upload([imageFile.file]);

      if (!uploadedImage) {
        setStatusText("Failed to upload image");
        return;
      }

      /* ---------------- Extract Resume Text ---------------- */

      setStatusText("Extracting resume text...");

      const resumeText = await ai.img2txt(imageFile.file);

      if (!resumeText) {
        setStatusText("Failed to read resume text");
        return;
      }

      /* ---------------- Detect Skills ---------------- */

      setStatusText("Detecting skills...");

      const detectedSkills = detectSkills(resumeText);

      console.log("Detected Skills:", detectedSkills);

      /* ---------------- Match Job Description ---------------- */

      setStatusText("Matching skills with job description...");

      const jobMatch = matchJobSkills(detectedSkills, jobDescription);

      console.log("Job Match Result:", jobMatch);

      /* ---------------- Prepare Resume Data ---------------- */

      setStatusText("Saving resume data...");

      const uuid = generateUUID();

      const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        skills: detectedSkills,
        jobMatch: jobMatch,
        feedback: "",
      };

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      /* ---------------- AI Resume Feedback ---------------- */

      setStatusText("Running AI resume analysis...");

      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription })
      );

      if (!feedback) {
        setStatusText("AI analysis failed");
        return;
      }

      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      data.feedback = JSON.parse(feedbackText);

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      /* ---------------- Finish ---------------- */

      setStatusText("Analysis complete! Redirecting...");

      console.log("Final Resume Data:", data);

      navigate(`/resume/${uuid}`);

    } catch (error) {
      console.error(error);
      setStatusText("Something went wrong during analysis");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.closest("form");

    if (!form) return;

    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) {
      alert("Please upload a resume");
      return;
    }

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>AI Resume Analyzer</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Upload your resume to get ATS score and improvement tips</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >

              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Paste job description"
                  id="job-description"
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyze Resume
              </button>

            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
