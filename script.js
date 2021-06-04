const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

const API_KEY = "9a7c4976f7ee4c6db83052874c786182";

function toggleButton() {
  button.disabled = !button.disabled;
}

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    data.type === "twopart"
      ? (joke = `${data.setup} ... ${data.delivery}`)
      : (joke = data.joke);

    tellMeJoke(joke);
    toggleButton();
  } catch (err) {
    console.error(err);
  }
}

function tellMeJoke(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: API_KEY,
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
