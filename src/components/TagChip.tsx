
const TagChip = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-accent px-3 py-1 rounded-full text-primary text-xs font-medium border shadow-sm hover-scale cursor-default transition">
    {children}
  </span>
);

export default TagChip;
