export const ORDER_TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["ready", "cancelled"],
  ready: ["collected", "cancelled"],
  collected: [],
  cancelled: [],
};

export function canTransition(currentStatus, nextStatus) {
  return ORDER_TRANSITIONS[currentStatus]?.includes(nextStatus);
}
