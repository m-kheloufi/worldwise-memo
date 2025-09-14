type Position = {
  lat: number;
  lng: number;
};

export type City = {
  id: number;
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: Position;
};
