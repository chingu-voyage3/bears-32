// import { getRandom } from '../lib/helpers';
import store from "./store";
// Still deliberating on whether to use the Unsplash API, or just download
// a few photos for the extension. The latter will perform faster.
// const unsplashQuery = "https://api.unsplash.com/photos/random?collections=1490722" + "&client_id=" + config.unsplashAppId + "&orientation=landscape"

const backgroundImage = document.querySelector(".background");

// // Build album for bg images, with img link and photographer credits

// Select random number for bg album array

// Insert background image into DOM

store.subscribe(state => {
  backgroundImage.style.backgroundImage = `url('${state.currentBackground}')`;
});
