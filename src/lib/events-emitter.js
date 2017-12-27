const events = {};

export function subscribe(event, method) {
  events[event] = events[event] || [];
  events[event].push(method);
}

export function emit(event, ...args) {
  const eventSubscribers = events[event];
  if (!eventSubscribers || !eventSubscribers.length) {
    return;
  }
  console.log(`Emitting ${event} with args:`, args);
  eventSubscribers.forEach(e => e(...args));
}
