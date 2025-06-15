import VerificationBadge from "./VerificationBadge";
import TagChip from "./TagChip";
import { MapPin, Briefcase, CircleDollarSign } from "lucide-react";

type Props = {
  title: string;
  pay: string;
  company: string;
  location: string;
  tags: string[];
  verified?: boolean;
};

const CardJob = ({
  title,
  pay,
  company,
  location,
  tags,
  verified,
}: Props) => {
  const description = "Join our dynamic team to build amazing user interfaces and shape the future of web development. We value creativity and collaboration.";

  return (
    <div className="w-full bg-white rounded-2xl border shadow-xl p-7 flex flex-col gap-4 animate-scale-in backdrop-blur-md min-h-[500px]">
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0"></div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{title}</span>
            {verified && <VerificationBadge />}
          </div>
          <div className="text-base font-medium text-gray-600">
            {company}
          </div>
        </div>
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
    </div>
  );
};

export default CardJob;
