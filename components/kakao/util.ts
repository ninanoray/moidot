import { Position } from "./map/kakaoMap";

export function getLocalDistanceString(distance: number) {
  if (distance > 1000)
    return (distance / 1000).toFixed(1).toLocaleString() + "Km";
  else return distance.toFixed(0) + "m";
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

/**
 * 기준 위치와 대상 위치 사이의 거리를 계산한다.(단위: m)
 * @param center 기준 위치
 * @param position 거리를 구할 대상 위치
 */
export function calcDistance(center: Position | undefined, position: Position) {
  // Haversine 공식
  if (!center) return undefined;
  const R = 6371 * 1000; // 단위: m
  const dLat = toRad(position.lat - center.lat);
  const dLng = toRad(position.lng - center.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(toRad(center.lat)) *
      Math.cos(toRad(position.lat));
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
