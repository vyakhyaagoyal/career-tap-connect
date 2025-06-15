
import NavBar from "@/components/NavBar";
import ProfileForm from "@/components/ProfileForm";
import ResumeUpload from "@/components/ResumeUpload";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

const Profile = () => {
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  const handleUploadSuccess = async (fileName: string, skills: string[]) => {
    setResumeFileName(fileName);
    
    // TODO: Replace with actual logged-in user ID after implementing auth
    const jobseekerId = "22222222-2222-2222-2222-222222222222";

    const { error } = await supabase
      .from('profiles')
      .update({ skills })
      .eq('id', jobseekerId);

    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } else {
       toast({
        title: "Profile updated!",
        description: "Your skills have been updated from your resume.",
      });
    }
  };

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
            onUploadSuccess={handleUploadSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
