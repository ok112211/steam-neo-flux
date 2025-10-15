import { Library, Store, Users, Info } from "lucide-react";

interface SidebarProps {
  totalGames: number;
  totalPlaytime: number;
  activeView: "store" | "library" | "community" | "about";
  onViewChange: (view: "store" | "library" | "community" | "about") => void;
}

const Sidebar = ({ totalGames, totalPlaytime, activeView, onViewChange }: SidebarProps) => {
  const formatPlaytime = (hours: number) => {
    return `${hours.toLocaleString()} hrs`;
  };

  return (
    <aside className="w-64 border-r border-border bg-background-secondary p-6">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-primary">STEAM 2.0</h1>
        <p className="text-sm text-muted-foreground">Fan UI Redesign</p>
      </div>

      <nav className="mb-8 space-y-2">
        <button
          onClick={() => onViewChange("store")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            activeView === "store"
              ? "bg-card text-foreground shadow-glow"
              : "text-muted-foreground hover:bg-card hover:text-foreground"
          }`}
        >
          <Store className="h-5 w-5" />
          <span className="font-medium">Store</span>
        </button>
        <button
          onClick={() => onViewChange("library")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            activeView === "library"
              ? "bg-card text-foreground shadow-glow"
              : "text-muted-foreground hover:bg-card hover:text-foreground"
          }`}
        >
          <Library className="h-5 w-5" />
          <span className="font-medium">Library</span>
        </button>
        <button
          onClick={() => onViewChange("community")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            activeView === "community"
              ? "bg-card text-foreground shadow-glow"
              : "text-muted-foreground hover:bg-card hover:text-foreground"
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="font-medium">Community</span>
        </button>
        <button
          onClick={() => onViewChange("about")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            activeView === "about"
              ? "bg-card text-foreground shadow-glow"
              : "text-muted-foreground hover:bg-card hover:text-foreground"
          }`}
        >
          <Info className="h-5 w-5" />
          <span className="font-medium">About</span>
        </button>
      </nav>

      <div className="mt-auto rounded-lg border border-border bg-card/50 p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Games:</span>
            <span className="font-semibold text-primary">{totalGames}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Playtime:</span>
            <span className="font-semibold text-foreground">{formatPlaytime(totalPlaytime)}</span>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-muted-foreground text-xs">Last played: Yesterday</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
