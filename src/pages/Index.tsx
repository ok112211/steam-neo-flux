import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import GameCard from "@/components/GameCard";
import GameModal from "@/components/GameModal";
import Toast from "@/components/Toast";
import { Search, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Game {
  id: number;
  title: string;
  img: string;
  playtime: number;
  genre: string;
  platform: string;
  desc: string;
  reviews: Array<{ user: string; score: number; text: string }>;
}

const initialGames: Game[] = [
  {
    id: 730,
    title: "Counter-Strike 2",
    img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop",
    playtime: 1400,
    genre: "FPS",
    platform: "PC",
    desc: "Fast-paced competitive tactical shooter with global tournaments and endless replayability.",
    reviews: [
      { user: "ProGamer", score: 5, text: "Best FPS ever made. Period." },
      { user: "CasualPlayer", score: 4, text: "Steep learning curve but worth it." },
    ],
  },
  {
    id: 292030,
    title: "The Witcher 3: Wild Hunt",
    img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=400&fit=crop",
    playtime: 534,
    genre: "RPG",
    platform: "PC",
    desc: "Epic open-world fantasy RPG with deep narrative and stunning visuals.",
    reviews: [
      { user: "FantasyFan", score: 5, text: "Masterpiece. Best RPG of the decade." },
      { user: "Geralt99", score: 5, text: "Incredible story and side quests." },
    ],
  },
  {
    id: 1091500,
    title: "Cyberpunk 2077",
    img: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&h=400&fit=crop",
    playtime: 287,
    genre: "RPG",
    platform: "PC",
    desc: "Futuristic open-world RPG in Night City with deep customization and branching stories.",
    reviews: [
      { user: "TechRunner", score: 4, text: "Much improved since launch. Great atmosphere." },
      { user: "NightCityNomad", score: 5, text: "Finally living up to the hype!" },
    ],
  },
  {
    id: 1174180,
    title: "Red Dead Redemption 2",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    playtime: 612,
    genre: "Action-Adventure",
    platform: "PC",
    desc: "Stunning Wild West adventure with incredible attention to detail and emotional storytelling.",
    reviews: [
      { user: "CowboyFan", score: 5, text: "Most immersive game I've ever played." },
      { user: "OutlawArthur", score: 5, text: "Story made me cry. 10/10" },
    ],
  },
  {
    id: 219740,
    title: "Hotline Miami",
    img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=400&fit=crop",
    playtime: 89,
    genre: "Action",
    platform: "PC",
    desc: "Ultra-violent top-down shooter with pulsing synth soundtrack and brutal gameplay.",
    reviews: [
      { user: "RetroGamer", score: 5, text: "Addictive, stylish, and insanely fun." },
      { user: "JacketFan", score: 4, text: "Perfect soundtrack, perfect gameplay." },
    ],
  },
  {
    id: 582010,
    title: "Monster Hunter: World",
    img: "https://images.unsplash.com/photo-1626258597284-effbb62e0b63?w=800&h=400&fit=crop",
    playtime: 923,
    genre: "Action RPG",
    platform: "PC",
    desc: "Hunt massive creatures in stunning ecosystems with deep progression and co-op gameplay.",
    reviews: [
      { user: "HunterVeteran", score: 5, text: "1000+ hours and still not bored." },
      { user: "NewbieLancer", score: 4, text: "Steep learning curve but extremely rewarding." },
    ],
  },
  {
    id: 413150,
    title: "Stardew Valley",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=400&fit=crop",
    playtime: 456,
    genre: "Simulation",
    platform: "PC",
    desc: "Relaxing farm simulation with charming pixel art and surprisingly deep gameplay.",
    reviews: [
      { user: "FarmLover", score: 5, text: "Perfect game to unwind after work." },
      { user: "PixelFarmer", score: 5, text: "600 hours in. Still finding new things." },
    ],
  },
  {
    id: 252490,
    title: "Rust",
    img: "https://images.unsplash.com/photo-1600320844521-aa49b5a4b109?w=800&h=400&fit=crop",
    playtime: 1847,
    genre: "Survival",
    platform: "PC",
    desc: "Brutal multiplayer survival where trust is rare and betrayal is common.",
    reviews: [
      { user: "SoloSurvivor", score: 4, text: "Intense and unforgiving. I love it." },
      { user: "ClanLeader", score: 5, text: "Best with friends. Total chaos." },
    ],
  },
];

const Index = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "playtime" | "alphabetical">("popular");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [activeView, setActiveView] = useState<"store" | "library" | "community" | "about">("library");

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handlePlayGame = (gameId: number) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      showToast(`Launching ${game.title}...`);
      setTimeout(() => {
        setGames((prev) =>
          prev.map((g) =>
            g.id === gameId ? { ...g, playtime: g.playtime + Math.floor(Math.random() * 5) + 1 } : g
          )
        );
      }, 1500);
    }
  };

  const handleAddReview = (gameId: number, review: { user: string; score: number; text: string }) => {
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, reviews: [...g.reviews, review] } : g))
    );
    showToast("Review posted successfully!");
  };

  const handleInstallAll = () => {
    showToast("Installing all games...");
    setTimeout(() => {
      showToast("All installations queued");
    }, 1000);
  };

  const cycleSortMode = () => {
    const modes: Array<typeof sortBy> = ["popular", "rating", "playtime", "alphabetical"];
    const currentIndex = modes.indexOf(sortBy);
    setSortBy(modes[(currentIndex + 1) % modes.length]);
  };

  const filteredAndSortedGames = games
    .filter((game) => {
      const query = searchQuery.toLowerCase();
      return (
        game.title.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        game.desc.toLowerCase().includes(query) ||
        game.reviews.some((r) => r.text.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          const avgA = a.reviews.reduce((sum, r) => sum + r.score, 0) / a.reviews.length;
          const avgB = b.reviews.reduce((sum, r) => sum + r.score, 0) / b.reviews.length;
          return avgB - avgA;
        case "playtime":
          return b.playtime - a.playtime;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const totalPlaytime = games.reduce((sum, game) => sum + game.playtime, 0);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b0f14] via-background to-[#08131a]">
      <Sidebar 
        totalGames={games.length} 
        totalPlaytime={totalPlaytime}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          showToast(`Switched to ${view.charAt(0).toUpperCase() + view.slice(1)}`);
        }}
      />

      <main className="flex-1 p-8">
        {activeView === "library" && (
          <>
            <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">All Games ({filteredAndSortedGames.length})</h2>
              </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card pl-10 sm:w-64"
              />
            </div>

            <Button
              variant="outline"
              onClick={cycleSortMode}
              className="bg-card hover:bg-card-hover"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </Button>

            <Button onClick={handleInstallAll} className="bg-primary text-primary-foreground hover:shadow-glow">
              Install All
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onPlay={handlePlayGame}
              onDetails={() => setSelectedGame(game)}
              onReviews={() => setSelectedGame(game)}
            />
          ))}
        </div>

            {filteredAndSortedGames.length === 0 && (
              <div className="mt-16 text-center">
                <p className="text-xl text-muted-foreground">No games found matching your search.</p>
              </div>
            )}
          </>
        )}

        {activeView === "store" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured & Recommended</h2>
              <p className="text-muted-foreground">Discover new games handpicked for you</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {games.slice(0, 6).map((game) => (
                <div key={game.id} className="group overflow-hidden rounded-xl border border-primary/30 bg-card p-6 transition-all hover:border-primary hover:shadow-glow">
                  <h3 className="text-xl font-bold text-foreground mb-2">{game.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{game.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">$29.99</span>
                    <Button 
                      onClick={() => showToast(`Added ${game.title} to cart!`)}
                      className="bg-primary text-primary-foreground hover:shadow-glow"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === "community" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Community Hub</h2>
              <p className="text-muted-foreground">Connect with players around the world</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {["ProGamer achieved 'Legendary' in CS2", "FantasyFan completed Witcher 3", "TechRunner streamed Cyberpunk for 8 hours"].map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background-secondary">
                      <div className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
                      <span className="text-sm text-muted-foreground">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Friend Requests</h3>
                <div className="space-y-3">
                  {["Player123", "GamerPro99", "NightOwl"].map((friend, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-secondary">
                      <span className="text-sm text-foreground">{friend}</span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => showToast(`Accepted friend request from ${friend}`)}
                          className="bg-primary text-primary-foreground"
                        >
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => showToast(`Declined friend request from ${friend}`)}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === "about" && (
          <div className="max-w-3xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">About Steam 2.0</h2>
              <p className="text-muted-foreground">A futuristic reimagining of the gaming platform</p>
            </div>
            
            <div className="rounded-xl border border-primary/30 bg-card p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">What is Steam 2.0?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Steam 2.0 is a fan-made concept UI that reimagines the gaming library experience with modern design principles, 
                  smooth interactions, and a cyberpunk-inspired aesthetic. Built with cutting-edge web technologies, it showcases 
                  what the future of gaming platforms could look like.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Live search and intelligent filtering
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Real-time review system with rating updates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Playtime tracking and progress visualization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Responsive design with glass morphism effects
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons"].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onAddReview={handleAddReview}
        />
      )}

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
};

export default Index;
