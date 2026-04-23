import { Suspense } from "react";
import { useLazyComponent } from "@/hooks/useLazyComponent";
import type { Room } from "@/data/rooms";

type Props = {
  room: Room;
  index?: number;
  priority?: boolean;
};

/**
 * Skeleton placeholder matching RoomCard's visual dimensions.
 * Reserves exact layout space (aspect-[4/5] image + 3 text lines)
 * so there is zero CLS when the real card loads in.
 */
const RoomCardSkeleton = () => (
  <article className="flex flex-col animate-pulse">
    {/* Image skeleton */}
    <div className="aspect-[4/5] bg-secondary rounded-sm" />
    {/* Text skeletons */}
    <div className="mt-4 flex flex-col gap-2">
      <div className="h-3 w-24 rounded bg-secondary" />
      <div className="h-5 w-3/4 rounded bg-secondary" />
      <div className="mt-1 h-4 w-20 rounded bg-secondary" />
    </div>
  </article>
);

/**
 * LazyRoomCard — wraps RoomCard with IntersectionObserver-based dynamic import.
 *
 * Until the card's container scrolls within 200px of the viewport, only a
 * lightweight skeleton is rendered. This dramatically reduces initial JS
 * payload on Slow 4G connections typical in Bangladesh.
 */
const LazyRoomCard = ({ room, index = 0, priority = false }: Props) => {
  const { ref, Component, hasIntersected } = useLazyComponent(
    () => import("@/components/site/RoomCard"),
    { rootMargin: "200px" },
  );

  return (
    <div ref={ref}>
      {hasIntersected && Component ? (
        <Suspense fallback={<RoomCardSkeleton />}>
          <Component room={room} index={index} priority={priority} />
        </Suspense>
      ) : (
        <RoomCardSkeleton />
      )}
    </div>
  );
};

export default LazyRoomCard;
