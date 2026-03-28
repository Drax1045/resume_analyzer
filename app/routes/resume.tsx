import { Link, useNavigate, useParams } from "react-router";
import type { Route } from "../../.react-router/types/app/routes/+types/auth";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import Details from "~/components/Details";
import ATS from "~/components/ATS";

export const meta = ({}: Route.MetaArgs) => ([
    { title: "Runtime Resume | Review" },
    { name: "description", content: "Detailed overview of your resume" },
]);

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();

    const [imageUrl, setImageUrl] = useState<string>("");
    const [resumeUrl, setResumeUrl] = useState<string>("");
    const [feedback, setFeedback] = useState<any>(null);

    const [isReady, setIsReady] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading]);

    useEffect(() => {
        const loadResume = async () => {
            try {
                const resume = await kv.get(`resume:${id}`);
                if (!resume) return;

                const data = JSON.parse(resume);

                // PDF
                const resumeBlob = await fs.read(data.resumePath);
                if (resumeBlob) {
                    const pdfBlob = new Blob([resumeBlob], {
                        type: "application/pdf",
                    });
                    setResumeUrl(URL.createObjectURL(pdfBlob));
                }

                // Image
                const imageBlob = await fs.read(data.imagePath);
                if (imageBlob) {
                    setImageUrl(URL.createObjectURL(new Blob([imageBlob])));
                }

                setFeedback(data.feedback);

                // Animation flow
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    setIsReady(true);
                }, 2000);

            } catch (error) {
                console.error("Error loading resume:", error);
            }
        };

        loadResume();
    }, [id, fs, kv]);

    return (
        <main className="min-h-screen bg-[url('/images/bg-small.svg')] bg-cover bg-no-repeat">

            {/* Navbar */}
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">
                        Back to Homepage
                    </span>
                </Link>
            </nav>

            <div className="flex flex-col w-full items-center min-h-[90vh] px-4">

                {/* HEADER */}
                <section className="mb-8 flex flex-col items-center">

                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Resume Review
                    </h1>

                    {/* LOADING */}
                    {!isReady && !showSuccess && (
                        <div className="flex flex-col items-center gap-6 animate-in fade-in">
                            <img src="/images/resume-scan-2.gif" className="w-64" />
                            <p className="text-gray-500 text-sm">
                                Analyzing your resume...
                            </p>
                        </div>
                    )}

                    {/* SUCCESS */}
                    {showSuccess && (
                        <div className="flex flex-col items-center gap-4 animate-in zoom-in">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-green-600 animate-bounce"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-green-600 font-semibold">
                                Analysis Completed
                            </p>
                        </div>
                    )}

                </section>

                {/* FEEDBACK UI (SAFE RENDER) */}
                {isReady && feedback && (
                    <div className="w-full max-w-5xl mb-6">
                        <Summary feedback={feedback} />
                        <Details feedback={feedback} />
                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                    </div>
                )}

                {/* RESUME */}
                {isReady && imageUrl && resumeUrl && (
                    <div className="gradient-border w-full max-w-5xl h-[90vh] overflow-auto">
                        <a href={resumeUrl} target="_blank">
                            <img
                                src={imageUrl}
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </a>
                    </div>
                )}

            </div>
        </main>
    );
};

export default Resume;