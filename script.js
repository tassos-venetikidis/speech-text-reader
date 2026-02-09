const main = document.querySelector("main");
const textBox = document.getElementById("text-box");
const voicesSelect = document.getElementById("voice");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

let voices = [];
data.forEach(createBox);
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Functions
function createBox(item) {
  const box = document.createElement("div");
  box.classList.add("box");
  const { image, text } = item;
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
  main.append(box);
}

function populateVoiceList() {
  voices = speechSynthesis.getVoices();

  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voicesSelect.append(option);
  }
}

function readText(text) {
  const voiceName = voicesSelect.selectedOptions[0].getAttribute("data-name");
  if (text === "") return;
  const utterThis = new SpeechSynthesisUtterance(text);
  for (const voice of voices) {
    if (voice.name === voiceName) {
      utterThis.voice = voice;
    }
  }
  speechSynthesis.speak(utterThis);
  return utterThis;
}

// Event Listeners
toggleBtn.addEventListener("click", () => {
  textBox.classList.toggle("show");
});
closeBtn.addEventListener("click", () => {
  textBox.classList.remove("show");
});
readBtn.addEventListener("click", () => {
  const text = textArea.value;
  readText(text);
});
main.addEventListener("click", (e) => {
  const box = e.target.closest(".box");
  const text = box.querySelector(".info").textContent;
  box.classList.add("active");
  const utterance = readText(text);
  utterance.addEventListener("end", () => box.classList.remove("active"));
});
