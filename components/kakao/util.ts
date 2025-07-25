import { Position } from "./kakaoMap";

export function getLocalDistanceString(distance: number) {
  if (distance > 1000)
    return (distance / 1000).toFixed(1).toLocaleString() + "Km";
  else return distance.toFixed(0) + "m";
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

export function calcDistance(center: Position | undefined, marker: Position) {
  // Haversine 공식
  if (!center) return undefined;
  const R = 6371 * 1000; // 단위: m
  const dLat = toRad(marker.lat - center.lat);
  const dLng = toRad(marker.lng - center.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(toRad(center.lat)) *
      Math.cos(toRad(marker.lat));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
