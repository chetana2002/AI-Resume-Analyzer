import { useState } from "react";
import { usePuterStore } from "~/lib/puter";

interface Props {
  resumePath: string;
}

const AIRewrite = ({ resumePath }: Props) => {
  const { ai } = usePuterStore();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleRewrite = async () => {
    setLoading(true);

    try {
      const response = await ai.chat(
        "Improve this resume and rewrite weak sections with better bullet points and ATS keywords.",
        {
          file: resumePath
        }
      );

      const text =
        typeof response.message.content === "string"
          ? response.message.content
          : response.message.content[0].text;

      setResult(text);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">

      <h2 className="text-2xl font-bold mb-4">
        AI Resume Rewriter
      </h2>

      <button
        onClick={handleRewrite}
        className="primary-button mb-4"
      >
        {loading ? "Improving Resume..." : "Improve My Resume"}
      </button>

      {result && (
        <div className="bg-gray-50 p-4 rounded-xl whitespace-pre-wrap text-sm">
          {result}
        </div>
      )}
    </div>
  );
};

export default AIRewrite;