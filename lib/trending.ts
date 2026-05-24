/**
 * Trending score from Section 7.7 of the PRD.
 * score = (likes×3 + copies×5 + views×1 + saves×4) / log(hours_since_posted + 2)
 */
export function trendingScore({
  likes,
  copies,
  views,
  saves,
  createdAt,
}: {
  likes: number;
  copies: number;
  views: number;
  saves: number;
  createdAt: Date;
}): number {
  const hoursSincePosted =
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
  const ageFactor = Math.log(hoursSincePosted + 2);
  const rawScore = likes * 3 + copies * 5 + views * 1 + saves * 4;
  return rawScore / ageFactor;
}
