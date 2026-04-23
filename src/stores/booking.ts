import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookingDraft = {
  roomId: string | null;
  roomTitle: string | null;
  roomImage: string | null;
  pricePerNight: number | null;
  checkIn: string | null; // ISO yyyy-mm-dd
  checkOut: string | null;
  guests: number;
};

type BookingState = {
  draft: BookingDraft;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (guests: number) => void;
  selectRoom: (room: { id: string; title: string; image: string; price: number }) => void;
  reset: () => void;
};

const empty: BookingDraft = {
  roomId: null,
  roomTitle: null,
  roomImage: null,
  pricePerNight: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
};

export const useBooking = create<BookingState>()(
  persist(
    (set) => ({
      draft: empty,
      setDates: (checkIn, checkOut) =>
        set((s) => ({ draft: { ...s.draft, checkIn, checkOut } })),
      setGuests: (guests) =>
        set((s) => ({ draft: { ...s.draft, guests: Math.max(1, guests) } })),
      selectRoom: (room) =>
        set((s) => ({
          draft: {
            ...s.draft,
            roomId: room.id,
            roomTitle: room.title,
            roomImage: room.image,
            pricePerNight: room.price,
          },
        })),
      reset: () => set({ draft: empty }),
    }),
    { name: "travela-booking" },
  ),
);

export const nightsBetween = (checkIn: string | null, checkOut: string | null) => {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
};
