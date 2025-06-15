
import { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// This is required for pdf.js to work in a Vite environment
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).toString();

type Props = {
  fileName: string | null;
  onUploadSuccess: (name: string, skills: string[]) => void;
};

const ResumeUpload = ({ fileName, onUploadSuccess }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const extractTextFromFile = async (file: File): Promise<string> => {
    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ");
      }
      return text;
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }
    throw new Error("Unsupported file type");
  };

  const handleFile = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const text = await extractTextFromFile(file);

      toast({
        title: "Resume parsed",
        description: "Now extracting skills with AI...",
      });
      
      // TODO: You need to set up a Supabase client and uncomment this section.
      // import { supabase } from "@/lib/supabaseClient"; // Create this file
      /*
      const { data, error } = await supabase.functions.invoke("extract-skills", {
        body: { text },
      });

      if (error) throw error;
      
      const skills = data.skills || [];
      */

      // Using mock data until Supabase client is configured
      console.log("Extracted resume text. Ready to send to AI.", { length: text.length });
      const skills = ["React (Demo)", "Node.js (Demo)", "AI Extracted (Demo)"];
      // End of mock data block

      onUploadSuccess(file.name, skills);
      toast({
        title: "Skills extracted!",
        description: "We've analyzed your resume and updated your skills.",
      });

    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Could not process your resume.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
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
        {uploading ? "Analyzing..." : fileName ? "Change Resume" : "Upload Resume"}
      </button>
      {fileName && (
        <span className="text-sm text-success bg-green-100 px-3 py-1 rounded transition">{fileName}</span>
      )}
    </div>
  );
};

export default ResumeUpload;
