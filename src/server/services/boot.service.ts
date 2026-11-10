export interface BootInput {
  bootCapacityLitres?: number;
  luggageItems?: { name: string; volumeLitres: number }[];
}

export function simulateBoot(input: BootInput) {
  const capacity = Number(input.bootCapacityLitres || 0);
  const items = input.luggageItems || [];
  const total = items.reduce((s, i) => s + Number(i.volumeLitres || 0), 0);
  return {
    bootCapacityLitres: capacity,
    luggageVolumeLitres: total,
    fits: total <= capacity,
    remainingLitres: capacity - total,
    items,
  };
}
