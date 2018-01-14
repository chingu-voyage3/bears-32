## Data structures

1. Timer
2. Session
3. Todo
4. User
5. Settings

```
Store {
  sessions: {
    byId: {[id]: session},
    ids: number[]
  },
  todos: {
    byId: {[id]: todo},
    ids: number[]
  }
  currentUser: user,
  settings,
  timer: {
    currentSession: id,
  }
}
```

```
Session: {
  start: date, (or milliseconds?)
  end: date,
  todoId: number,
  id: number
}
```

We can check if session is finished by doing `session.end <= Date.now`

If the user extends or reduces the session time, `end` will change.

```
Todo {
  title: string,
  id: number,
  expectedPomos: number >= 0.
  sessions: number[]
}
```

```
User {

}
```

```
Settings {

}
```

## Extension parts:

1. Background script.
2. New tab page.
3. Popup.

## Overview

We will have a single interface that all components are talking to. The new tab page or the popup don't need to know how to start or stop a new session, it will just talk to that interface, and that interface will return (or push) a new data.

The basic actions in the interface will be the following:

* `startTimer`: `(todoId?) => session`
* `stopTimer`: `() => session`
* `addTodo`: `(description) => todo`

We will probably want to add also:

* `updateTodo` or more specifically `renameTodo`, `setExpectedPomodoros`
* `setTimerEndTime`

a `Store` object represents our local state db. Each part of the extension will have a copy of it and they should be more or less synced. This is a global state object and when a component needs part of the state it's basically takes it from here.

Timer is a very lean object for now, I'm not really sure what's going inside of it. It will mostly just have methods to query the current session - checking when is the end time of the session to show in the timer. We might not need it in our store.

When calling `startTimer` our backend will create a new session and send it to the different parts of the extension. Same goes with the other methods, the interface sends the data to the extension backend and the backend updates the different parts.

## Extension Events

A chrome extension has different parts which are isolated from each other and the different parts are talking with each other by events.

We need to define which events can be sent and subscribed to. Which parameters each event is sending.

We also need to define who sends each event. It can get messy so it should be very simple event system.

I suggest we use the following:

1. background -> \* (meaning the background sends events to all extension parts (except itself)).
2. * -> background.

When background sends an event it's goind to every other part of the extension, when a different part sends an event, it goes only to the background.

Events names are written in `scope/CAPS_UNDERSCORE`

### 1. Background -> \*

* `background/SESSION_CREATED`: `{session}`
* `background/SESSION_UPDATED`: `{session}`
* `background/TODO_CREATED`: `{todo}`
* `background/TODO_UPDATED`: `{todo}`

### 2. \* -> Background

* `ui/START_TIMER`: `{todoId}`
* `ui/STOP_TIMER`: `{sessionId}`
* `ui/ADD_TODO`: `{description}`

## Project structure:

* build: the build files, this is the files that chrome loads.
* src: the source files - this is where we work.
  * background: files that are responsible for the extension background script.
  * newtab: files that are responsible for the newtab.
  * lib: common files
* root: config files and readme

### Similar files between background and newtab:

* events-handler - functions that responde to events that this module receives
* store - where the state store is created.
* index - root file
