
import NavBar from "@/components/NavBar";
import ProfileForm from "@/components/ProfileForm";
import ResumeUpload from "@/components/ResumeUpload";
import { useState } from "react";

const Profile = () => {
  // ProfileForm will handle mock profile completion
  // ResumeUpload will validate and show upload state
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#fafdff] via-[#f5efff] to-[#e7f0ff]">
      <NavBar />
      <div className="flex-1 px-3 max-w-2xl mx-auto flex flex-col gap-8 py-8">
        <h1 className="text-3xl font-extrabold mb-2">My Profile</h1>
        <ProfileForm />
        <div>
          <h2 className="text-2xl font-bold mb-2">Resume Upload</h2>
          <ResumeUpload
            fileName={resumeFileName}
            onUploadSuccess={setResumeFileName}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
