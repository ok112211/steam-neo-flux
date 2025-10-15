import { useState } from "react";
import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Game } from "@/pages/Index";

interface GameModalProps {
  game: Game;
  onClose: () => void;
  onAddReview: (gameId: number, review: { user: string; score: number; text: string }) => void;
}

const GameModal = ({ game, onClose, onAddReview }: GameModalProps) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewScore, setReviewScore] = useState(5);
  const [username, setUsername] = useState("Anonymous");

  const avgRating = game.reviews.reduce((sum, r) => sum + r.score, 0) / game.reviews.length;

  const handleSubmitReview = () => {
    if (reviewText.trim()) {
      onAddReview(game.id, {
        user: username || "Anonymous",
        score: reviewScore,
        text: reviewText,
      });
      setReviewText("");
      setReviewScore(5);
      setUsername("Anonymous");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-primary/30 bg-card p-6 shadow-glow-strong animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="space-y-6">
          <div>
            <img
              src={game.img}
              alt={game.title}
              className="mb-4 h-64 w-full rounded-xl object-cover"
            />
            <h2 className="mb-2 text-3xl font-bold text-foreground">{game.title}</h2>
            <p className="text-muted-foreground">
              {game.genre} • {game.platform} • {game.playtime} hours played
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground">{game.desc}</p>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-border bg-card/50 p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="text-2xl font-bold text-primary">{avgRating.toFixed(1)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {game.reviews.length} reviews
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-foreground">Reviews</h3>
            <div className="space-y-3">
              {game.reviews.map((review, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-card/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-foreground">{review.user}</span>
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: review.score }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-primary/30 bg-card/50 p-4">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Write a Review</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">Username</label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-card"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">
                  Rating: {reviewScore} / 5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={reviewScore}
                  onChange={(e) => setReviewScore(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-foreground">Your Review</label>
                <Textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] bg-card"
                />
              </div>

              <Button
                onClick={handleSubmitReview}
                className="w-full bg-primary text-primary-foreground hover:shadow-glow"
                disabled={!reviewText.trim()}
              >
                Submit Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
