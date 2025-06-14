
import VerificationBadge from "./VerificationBadge";
import TagChip from "./TagChip";
import ProgressBar from "./ProgressBar";

type Props = {
  name: string;
  skills: string[];
  education: string;
  location: string;
  atsScore: number;
  verified?: boolean;
};

const CardCandidate = ({
  name,
  skills,
  education,
  location,
  atsScore,
  verified,
}: Props) => {
  return (
    <div className="w-full bg-white rounded-2xl border shadow-xl p-7 flex flex-col gap-2 items-start animate-scale-in backdrop-blur-md">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl font-bold">{name}</span>
        {verified && <VerificationBadge />}
      </div>
      <div className="text-sm font-medium text-gray-500 mb-2">{education}</div>
      <div className="flex gap-4 mb-2">
        <span className="text-secondary px-3 py-1 border rounded">{location}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.slice(0, 5).map((t) => (
          <TagChip key={t}>{t}</TagChip>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 w-full">
        <ProgressBar value={atsScore * 20} />
        <span className="ml-1 text-sm text-gray-600">
          ATS Score: <b>{atsScore}/5</b>
        </span>
      </div>
    </div>
  );
};

export default CardCandidate;
