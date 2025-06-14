
type Props = {
  value: number; // 0 - 100
};

const ProgressBar = ({ value }: Props) => (
  <div className="flex-1 h-3 rounded bg-muted overflow-hidden">
    <div
      className="h-3 rounded bg-gradient-to-r from-lime-400 via-green-400 to-green-600 transition-all duration-300"
      style={{ width: `${Math.min(100, value)}%` }}
    />
  </div>
);

export default ProgressBar;
