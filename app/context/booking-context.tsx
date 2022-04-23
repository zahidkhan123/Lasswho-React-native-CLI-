import React, { createContext, useState } from 'react';
import { Speaker } from '@generated/graphql';

const today = new Date();

type BookingContextData = {
  speaker: Speaker | null;
  duration: number;
  date: Date;
  slot: string; // TODO Why is this string and not number?
  setDuration: (time: number) => void;
  setSpeaker: (speaker: Speaker) => void;
  setDate: (date: Date) => void;
  setSlot: (slot: string) => void;
};

const BookingContext = createContext<BookingContextData>({
  speaker: null,
  duration: 0,
  date: today,
  slot: '',
  setDuration: () => null,
  setSpeaker: () => null,
  setDate: () => null,
  setSlot: () => null,
});

export default BookingContext;

export const BookingContextProvider: React.FC = ({ children }) => {
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [date, setDate] = useState<Date>(today);
  const [slot, setSlot] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const value = {
    speaker,
    setSpeaker,
    date,
    setDate,
    slot,
    setSlot,
    duration,
    setDuration,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
