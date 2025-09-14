import { useSearchParams } from "react-router-dom";

export function useUrlPosition(): [number | null, number | null] {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const latNum = lat ? Number(lat) : null;
  const lngNum = lng ? Number(lng) : null;

  return [latNum, lngNum];
}
