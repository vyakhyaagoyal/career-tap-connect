
import NavBar from "@/components/NavBar";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

const RecruiterSetup = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [pay, setPay] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDescription || !company || !location || !pay) {
      toast({ title: "Please fill all job fields.", variant: "destructive" });
      return;
    }
    setIsPosting(true);
    try {
      const { data, error } = await supabase.functions.invoke("extract-skills", {
        body: { text: jobDescription },
      });

      if (error) throw error;
      const skills = data.skills || [];

      toast({
        title: "Job Skills Extracted!",
        description: `Found skills: ${skills.join(", ")}. Now posting...`,
      });

      // TODO: Replace with actual logged-in user ID after implementing auth
      const recruiterId = "11111111-1111-1111-1111-111111111111";

      const { error: insertError } = await supabase.from("jobs").insert({
        title: jobTitle,
        company,
        location,
        pay,
        tags: skills,
        recruiter_id: recruiterId,
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      toast({
        title: "Job Posted Successfully!",
        description: `Your job "${jobTitle}" is now live.`,
      });

      // Reset form
      setJobTitle("");
      setJobDescription("");
      setCompany("");
      setLocation("");
      setPay("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not post job.",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff] flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white border rounded-xl shadow-lg p-7 flex flex-col gap-5 animate-fade-in">
            <h1 className="text-2xl font-bold mb-2">Recruiter Setup</h1>
            <p className="text-muted-foreground">
              Set up your company profile and post your first job.
            </p>
          </div>

          <div className="bg-white border rounded-xl shadow-lg p-7 flex flex-col gap-5 animate-fade-in mt-8">
            <h2 className="text-2xl font-bold mb-2">Post a Job</h2>
            <form onSubmit={handlePostJob} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-sm mb-1 block">Job Title</label>
                  <input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Frontend Developer"
                    className="w-full border rounded px-3 py-1.5 outline-primary"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm mb-1 block">Company</label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g., Acme Inc."
                    className="w-full border rounded px-3 py-1.5 outline-primary"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm mb-1 block">Location</label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                    className="w-full border rounded px-3 py-1.5 outline-primary"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm mb-1 block">Pay / Salary</label>
                  <input
                    value={pay}
                    onChange={(e) => setPay(e.target.value)}
                    placeholder="e.g., $120,000 - $150,000"
                    className="w-full border rounded px-3 py-1.5 outline-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-sm mb-1 block">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here. Our AI will analyze it for required skills."
                  className="w-full border rounded px-3 py-1.5 outline-primary min-h-[150px]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isPosting}
                className="mt-2 px-6 py-2 bg-primary text-white w-max rounded-lg shadow hover-scale font-semibold disabled:opacity-60"
              >
                {isPosting ? "Analyzing..." : "Post Job"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSetup;
