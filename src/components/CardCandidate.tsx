import VerificationBadge from "./VerificationBadge";
import TagChip from "./TagChip";
import ProgressBar from "./ProgressBar";
import { Github, Linkedin, X, Instagram, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = {
  name: string;
  skills: string[];
  education: string;
  location: string;
  atsScore: number;
  verified?: boolean;
  photoUrl?: string;
  resumeUrl?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
  };
};

const CardCandidate = ({
  name,
  skills,
  education,
  location,
  atsScore,
  verified,
  photoUrl,
  resumeUrl,
  socials,
}: Props) => {
  return (
    <div className="w-full bg-white rounded-2xl border shadow-xl p-7 flex flex-col gap-4 items-start animate-scale-in backdrop-blur-md min-h-[500px]">
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold">{name}</span>
            {verified && <VerificationBadge />}
          </div>
          <div className="text-sm font-medium text-gray-500">{education}</div>
        </div>
        <Avatar className="w-20 h-20 border-2 border-white shadow-md">
          <AvatarImage src={photoUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex gap-2">
        <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 border rounded-full font-medium">{location}</span>
      </div>

      <div className="w-full">
        <h3 className="font-semibold text-base mb-2 text-gray-700">Top Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 7).map((t) => (
            <TagChip key={t}>{t}</TagChip>
          ))}
        </div>
      </div>

      <div className="w-full">
        <h3 className="font-semibold text-base mb-2 text-gray-700">ATS Match Score</h3>
        <div className="flex items-center gap-2 w-full">
          <ProgressBar value={atsScore * 20} />
          <span className="ml-1 text-sm text-gray-600 font-bold">
            {atsScore}/5
          </span>
        </div>
      </div>
      
      {socials && (
        <div className="flex gap-4 pt-2">
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
          )}
          {socials.x && (
            <a href={socials.x} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors">
              <X className="w-6 h-6" />
            </a>
          )}
          {socials.instagram && (
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          )}
        </div>
      )}

      {resumeUrl && (
        <Button asChild variant="outline" className="w-full mt-auto">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2" /> <span className="font-bold">View Resume</span>
          </a>
        </Button>
      )}
    </div>
  );
};

export default CardCandidate;
