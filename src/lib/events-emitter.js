const events = {};
export function initEventsManager() {
  chrome.extension.onMessage.addListener(function(
    message,
    sender,
    sendResponse
  ) {
    if (!message.type) {
      throw new Error('Missing message type', message);
    }
    const eventSubscribers = events[message.type];
    if (!eventSubscribers || !eventSubscribers.length) {
      console.log(`No subscribers found for evevnt ${message.type}`);
      return;
    }
    console.log(`Received ${message.type} with args:`, message.payload);

    eventSubscribers.forEach(e => e(message.payload));
  });
}
export function subscribe(event, method) {
  events[event] = events[event] || [];
  events[event].push(method);
}

export function emit(type, payload) {
  console.log(`Emitting ${type} with args:`, payload);

  chrome.extension.sendMessage({ type, payload });
}
