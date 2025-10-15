import { Play, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Game } from "@/pages/Index";

interface GameCardProps {
  game: Game;
  onPlay: (id: number) => void;
  onDetails: () => void;
  onReviews: () => void;
}

const GameCard = ({ game, onPlay, onDetails, onReviews }: GameCardProps) => {
  const avgRating = game.reviews.reduce((sum, r) => sum + r.score, 0) / game.reviews.length;
  const playtimePercent = Math.min((game.playtime / 2000) * 100, 100);

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-glow">
      <div className="relative overflow-hidden">
        <img
          src={game.img}
          alt={game.title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {game.genre} • {game.platform}
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Your time: {game.playtime} hrs</span>
            <span>{Math.round(playtimePercent)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
              style={{ width: `${playtimePercent}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onPlay(game.id)}
            size="sm"
            className="flex-1 bg-primary text-primary-foreground hover:shadow-glow-strong"
          >
            <Play className="mr-1 h-4 w-4" />
            Play
          </Button>
          <Button
            onClick={onDetails}
            size="sm"
            variant="outline"
            className="bg-card hover:bg-card-hover"
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button
            onClick={onReviews}
            size="sm"
            variant="outline"
            className="bg-card hover:bg-card-hover"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="flex items-center gap-1 text-primary">
            <span className="text-base">★</span>
            {avgRating.toFixed(1)}
          </span>
          <span className="text-muted-foreground">{game.reviews.length} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
