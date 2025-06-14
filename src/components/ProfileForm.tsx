import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import VerificationBadge from "./VerificationBadge";
import ResumeUpload from "./ResumeUpload";

const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer", "UI/UX Designer", "Product Manager", "Data Analyst", "Data Scientist", "DevOps Engineer"];
const skillsList = ["React", "Node.js", "Python", "Tailwind", "Figma", "MongoDB", "Express", "TypeScript", "JavaScript", "Go", "Ruby", "AWS", "Docker", "Kubernetes", "SQL"];
const sectors = ["Tech", "Finance", "Healthcare", "Education", "E-commerce", "Gaming", "Entertainment"];
const locations = ["Remote", "On-site", "Hybrid"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
const seekingTypes = ["Internship", "Job"];

const ProfileForm = () => {
  const [name, setName] = useState("Jane Doe");
  const [seeking, setSeeking] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [sector, setSector] = useState("");
  const [locationPref, setLocationPref] = useState("");
  const [jobType, setJobType] = useState("");
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const complete = [name, seeking, role, skills.length, sector, locationPref, jobType, resumeFile].every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated!",
      description: `Profile is now ${complete ? "complete" : "incomplete"}.`,
    });
  };

  // TODO: Integrate DigiLocker/company verification
  const handleVerify = () => {
    setTimeout(() => {
      setVerified(true);
      toast({
        title: "Verification complete",
        description: "Your identity was verified (demo)!",
      });
    }, 900);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl shadow-lg p-7 flex flex-col gap-5 animate-fade-in"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="text-xl font-bold">{name || "Your Name"}</div>
        {verified && <VerificationBadge />}
        {!verified && (
          <button
            type="button"
            className="ml-2 text-xs text-blue-600 underline"
            onClick={handleVerify}
          >
            Verify Now
          </button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Display Name" value={name} onChange={setName} />
        <Select
          label="Seeking"
          value={seeking}
          onChange={setSeeking}
          options={seekingTypes}
        />
        <Select
          label="Role"
          value={role}
          onChange={setRole}
          options={roles}
        />
        <MultiSelect
          label="Skills"
          value={skills}
          onChange={setSkills}
          options={skillsList}
        />
        <Select
          label="Sector/Industry"
          value={sector}
          onChange={setSector}
          options={sectors}
        />
        <Select
          label="Location Preference"
          value={locationPref}
          onChange={setLocationPref}
          options={locations}
        />
        <Select
          label="Job Type"
          value={jobType}
          onChange={setJobType}
          options={jobTypes}
        />
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-2">Resume (Required)</h3>
        <ResumeUpload fileName={resumeFile} onUploadSuccess={setResumeFile} />
      </div>
      <button
        type="submit"
        className={`mt-3 px-6 py-2 bg-primary text-white w-max rounded-lg shadow hover-scale font-semibold ${complete ? "opacity-100" : "opacity-60 pointer-events-none"}`}
      >
        Save Profile
      </button>
      {!complete && (
        <div className="mt-3 text-sm text-red-500">
          Complete all fields and upload your resume to appear in recruiter feeds!
        </div>
      )}
    </form>
  );
};

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-semibold text-sm">{label}</span>
      <input
        className="border rounded px-3 py-1.5 outline-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-semibold text-sm">{label}</span>
      <select
        className="border rounded px-3 py-1.5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function MultiSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-sm">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((skill) => (
          <button
            key={skill}
            type="button"
            className={`rounded-full px-3 py-1 border ${value.includes(skill)
                ? "bg-primary text-white border-primary"
                : "bg-muted text-foreground"
              } text-xs font-medium hover-scale transition`}
            onClick={() =>
              onChange(
                value.includes(skill)
                  ? value.filter((v) => v !== skill)
                  : [...value, skill]
              )
            }
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileForm;
