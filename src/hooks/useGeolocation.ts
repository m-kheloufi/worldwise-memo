import { useState } from "react";

type GeolocationPositionType = {
  lat: number;
  lng: number;
} | null;

export function useGeolocation(
  defaultPosition: GeolocationPositionType = null
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] =
    useState<GeolocationPositionType>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
