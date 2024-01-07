const letters = document.querySelector(".letters");
const englishWords = [
  "apple",
  "banana",
  "car",
  "dog",
  "elephant",
  "flower",
  "guitar",
  "happy",
  "island",
  "jazz",
  "kite",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "puzzle",
  "quilt",
  "rainbow",
  "sunshine",
  "tiger",
  "umbrella",
  "vibrant",
  "wonderful",
  "xylophone",
  "yellow",
  "zeppelin",
];
let randomWord = englishWords[Math.floor(Math.random() * englishWords.length)];

let numberTry = 5;
let numberLetters = randomWord.length;
let currentTry = 1;

console.log(randomWord, numberLetters);
function generateInputs() {
  for (let i = 1; i <= numberTry; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>T-${i < 10 ? `0${i}` : i}</span>`;

    if (i !== 1) {
      tryDiv.classList.add("input-disabled");
    }

    for (let l = 1; l <= numberLetters; l++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `try-${i}-letter-${l}`;
      input.autocomplete = "off";
      input.maxLength = 1;
      tryDiv.append(input);
    }

    letters.appendChild(tryDiv);
  }
  // console.log(letters);
  letters.children[0].children[1].focus();

  const inputWithDisabled = document.querySelectorAll(".input-disabled input");
  inputWithDisabled.forEach((elem) => (elem.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.oninput = () => {
      const next = inputs[index + 1];
      const prev = inputs[index - 1];
      if (next && input.value !== "" && input.value !== " ") {
        next.focus();
      } else if (prev && input.value === "") {
        prev.focus();
      }
      // if (inputs[index].value === "" || inputs[index].value === " ") {
      //   if (inputs[index].classList.contains("right")) {
      //     inputs[index].classList.remove("right");
      //   } else if (inputs[index].classList.contains("not-place")) {
      //     inputs[index].classList.remove("not-place");
      //   } else if (inputs[index].classList.contains("wrong")) {
      //     inputs[index].classList.remove("wrong");
      //   }
      // }
      console.log(inputs[index], inputs[index].value);
    };
    input.onkeydown = (e) => {
      const current = Array.from(inputs).indexOf(e.target);
      if (e.key === "ArrowRight") {
        const next = current + 1;
        if (next < inputs.length) {
          inputs[next].focus();
        }
      } else if (e.key === "ArrowLeft") {
        const prev = current - 1;
        if (prev >= 0) {
          inputs[prev].focus();
        }
      }
    };
  });
}

function check() {
  let success = true;
  // checkBtn.current.disabled = true;
  for (let i = 1; i <= numberLetters; i++) {
    const input = document.querySelector(`#try-${currentTry}-letter-${i}`);
    const letter = input.value;
    const currentLetter = randomWord[i - 1];

    // console.log(input);

    if (letter === currentLetter) {
      input.classList.add("right");
    } else if (randomWord.includes(letter) && letter !== "") {
      input.classList.add("not-place");
      success = false;
    } else if (!randomWord.includes(letter) && letter !== "") {
      input.classList.add("wrong");
      success = false;
    }
    if (
      input.classList.contains("right") ||
      input.classList.contains("not-place") ||
      input.classList.contains("wrong")
    ) {
      input.disabled = true;
    }

    const tip = document.querySelector(".tip");
    if (success && letter !== "") {
      tip.innerHTML = `Great! You Win ... The Word is 
      <p>${randomWord.toUpperCase()}</p>`;
      tip.classList.add("win");
    } else if (!success && letter !== "") {
      tip.innerHTML = `Wrong!, Try Again ..`;
      tip.classList.add("lose");
    }
  }
}

generateInputs();
