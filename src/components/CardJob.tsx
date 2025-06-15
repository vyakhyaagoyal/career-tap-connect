
import VerificationBadge from "./VerificationBadge";
import TagChip from "./TagChip";
import { MapPin, Briefcase, CircleDollarSign, Github, Linkedin, X, Instagram } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  title: string;
  pay: string;
  company: string;
  companyPhotoUrl?: string;
  location: string;
  tags: string[];
  verified?: boolean;
  description: string;
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
  };
};

const CardJob = ({
  title,
  pay,
  company,
  companyPhotoUrl,
  location,
  tags,
  verified,
  description,
  socials,
}: Props) => {
  return (
    <div className="w-full bg-white rounded-2xl border shadow-xl p-7 flex flex-col gap-4 animate-scale-in backdrop-blur-md min-h-[500px]">
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl font-bold">{title}</span>
            {verified && <VerificationBadge />}
          </div>
          <div className="text-base font-medium text-gray-600">
            {company}
          </div>
        </div>
        <Avatar className="w-20 h-20 border-2 border-white shadow-md">
          <AvatarImage src={companyPhotoUrl} alt={company} />
          <AvatarFallback>{company.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-gray-500" /> {location}
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-gray-500" /> Internship
        </div>
        <div className="flex items-center gap-1.5">
          <CircleDollarSign className="w-4 h-4 text-gray-500" /> {pay}
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-gray-500" /> Hybrid
        </div>
      </div>
      
      <p className="text-gray-600 text-sm">{description}</p>

      <div>
        <h3 className="font-semibold text-base mb-2">Required Skills:</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagChip key={t}>{t}</TagChip>
          ))}
        </div>
      </div>

      {socials && (
        <div className="flex gap-4 pt-2 mt-auto">
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
    </div>
  );
};

export default CardJob;
