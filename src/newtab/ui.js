import { startTimer } from "./actions";

const startTimerButton = document.querySelector("#start-timer");

startTimerButton.addEventListener("click", () => startTimer());
