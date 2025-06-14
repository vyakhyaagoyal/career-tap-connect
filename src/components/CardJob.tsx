
import VerificationBadge from "./VerificationBadge";
import TagChip from "./TagChip";

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
  return (
    <div className="w-full bg-white rounded-2xl border shadow-xl p-7 flex flex-col gap-2 items-start animate-scale-in backdrop-blur-md">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl font-bold">{title}</span>
        {verified && <VerificationBadge />}
      </div>
      <div className="text-sm font-medium text-gray-500 mb-2">
        {company}
      </div>
      <div className="flex gap-4 mb-2">
        <span className="text-secondary px-3 py-1 border rounded">{location}</span>
        <span className="text-accent px-3 py-1 border rounded">{pay}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((t) => (
          <TagChip key={t}>{t}</TagChip>
        ))}
      </div>
    </div>
  );
};

export default CardJob;
