
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Inbox", path: "/inbox" },
  { label: "Chats", path: "/chats" },
  { label: "Profile", path: "/profile" },
  { label: "About", path: "/about" },
];

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="w-full sticky top-0 bg-white/80 backdrop-blur z-40 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <span className="text-primary font-extrabold text-2xl tracking-tight">SwipeHire</span>
          <span className="text-xs font-semibold ml-1 px-2 bg-primary/10 text-primary rounded-full">BETA</span>
        </div>
        <div className="flex gap-2 md:gap-4">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              path={item.path}
              isActive={location.pathname.startsWith(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
        {/* Temporary: Login/SignUp Buttons - wire up actual auth later */}
        <div className="hidden md:flex items-center gap-2">
          <button className="text-primary font-bold px-4 py-1.5 rounded hover:bg-primary/10 transition">Login</button>
          <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded font-bold hover-scale transition hover:bg-primary/90">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

function NavItem({
  label,
  path,
  isActive,
  onClick,
}: {
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex items-center gap-1 px-3 py-2 rounded transition text-base relative
        ${isActive ? "text-primary font-bold after:content-[''] after:absolute after:w-full after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:rounded" : "text-foreground hover:bg-primary/10"}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default NavBar;
