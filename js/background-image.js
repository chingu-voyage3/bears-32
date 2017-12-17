(function background() {
  "use strict";

  // Still deliberating on whether to use the Unsplash API, or just download
  // a few photos for the extension. The latter will perform faster.
  // const unsplashQuery = "https://api.unsplash.com/photos/random?collections=1490722" + "&client_id=" + config.unsplashAppId + "&orientation=landscape"

  const backgroundImage = document.querySelector(".background");

  // Build album for bg images, with img link and photographer credits
  var backgroundAlbum = [
    {
      url: 'url("img/andrew-neel-109201.jpg")'
      // photographer: ,
      // photographerURL:
    },
    {
      url: 'url("img/kelly-sikkema-455242.jpg")'
      // photographer: ,
      // photographerURL:
    }
  ];

  // Select random number for bg album array
  let currentBg = getRandom(backgroundAlbum.length);

  // Insert background image into DOM
  backgroundImage.style.backgroundImage = backgroundAlbum[currentBg].url;
})();
