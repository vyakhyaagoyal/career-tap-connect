
import { CheckCircle2 } from "lucide-react";

const VerificationBadge = () => (
  <span title="Verified" className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 flex items-center gap-1 text-xs font-bold shadow hover-scale transition animate-fade-in">
    <CheckCircle2 className="w-4 h-4 text-green-500" />
    Verified
  </span>
);

export default VerificationBadge;
