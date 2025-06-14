
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

const ResumeUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Please upload a PDF or DOCX resume.",
      });
      return;
    }
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setFileName(file.name);
      toast({
        title: "Resume uploaded!",
        description: "Your resume is saved and ready for analysis.",
      });
    }, 1200);
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <button
        type="button"
        className="px-5 py-2 border rounded-lg text-primary font-semibold bg-accent hover:bg-primary hover:text-white shadow transition hover-scale"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
      {fileName && (
        <span className="text-sm text-success bg-green-100 px-3 py-1 rounded transition">{fileName}</span>
      )}
    </div>
  );
};

export default ResumeUpload;
