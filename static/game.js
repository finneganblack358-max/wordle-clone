(() => {
  const ROW_COUNT = 5;
  const COL_COUNT = 5;
  const todaysWord = (window.TODAYS_WORD || "CRANE").toUpperCase();
  const COLOR_CORRECT = "#538d4e";
  const COLOR_PRESENT = "#b59f3b";
  const COLOR_ABSENT = "#3a3a3c";

  function getRows() {
    return Array.from(document.querySelectorAll(".inputs")).slice(0, ROW_COUNT);
  }

  function getRowInputs(rowIndex) {
    const rows = getRows();
    const row = rows[rowIndex];
    return row ? Array.from(row.querySelectorAll("input.inputRow")).slice(0, COL_COUNT) : [];
  }

  function getRowWord(rowIndex) {
    return getRowInputs(rowIndex)
      .map(i => (i.value || "").toUpperCase().slice(0, 1))
      .join("");
  }

  function setRowDisabled(rowIndex, disabled = true) {
    const inputs = getRowInputs(rowIndex);
    inputs.forEach(i => {
      i.disabled = disabled;
      if (disabled) i.classList.add("disabled-row");
      else i.classList.remove("disabled-row");
    });
  }

  function disableAllRows() {
    for (let r = 0; r < ROW_COUNT; r++) setRowDisabled(r, true);
  }

  function colorInput(inputEl, color) {
    inputEl.style.backgroundColor = color;
    inputEl.style.color = "white";
  }

  function evaluateGuess(guess, solution) {
    const result = Array(COL_COUNT).fill("absent");
    const solutionArr = solution.split("");
    const used = Array(COL_COUNT).fill(false);
    for (let i = 0; i < COL_COUNT; i++) {
      if (guess[i] === solutionArr[i]) {
        result[i] = "correct";
        used[i] = true;
      }
    }
    for (let i = 0; i < COL_COUNT; i++) {
      if (result[i] === "correct") continue;
      const g = guess[i];
      for (let j = 0; j < COL_COUNT; j++) {
        if (!used[j] && solutionArr[j] === g) {
          result[i] = "present";
          used[j] = true;
          break;
        }
      }
    }
    return result;
  }

  function showCongrats() {
    disableAllRows();
    const d = document.createElement("div");
    d.id = "congrats";
    d.innerText = "Congratulations! You guessed the word.";
    d.style.position = "fixed";
    d.style.left = "50%";
    d.style.top = "10%";
    d.style.transform = "translateX(-50%)";
    d.style.background = "#222";
    d.style.color = "white";
    d.style.padding = "12px 20px";
    d.style.borderRadius = "8px";
    d.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
    document.body.appendChild(d);
    const homeBtn = document.getElementById("Home");
    if (homeBtn) {
      homeBtn.style.display = "block";
      homeBtn.disabled = false;
      homeBtn.focus();
    }
    const playAgainBtn = document.getElementById("PlayAgain");
    if (playAgainBtn) {
      playAgainBtn.style.display = "block";
      playAgainBtn.disabled = false;
      playAgainBtn.focus();
    }
  }

function showWrong() {
    disableAllRows();
    const message = document.createElement("div");
    message.id = "wrong";
    message.innerText = `Sorry, the word was ${todaysWord}`;
    Object.assign(message.style, {
      position: "fixed",
      left: "50%",
      top: "10%",
      transform: "translateX(-50%)",
      background: "#222",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
      zIndex: 1000,
      textAlign: "center"
    });
    document.body.appendChild(message);

    const playAgainBtn = document.getElementById("PlayAgain");
    if (playAgainBtn) {
      playAgainBtn.style.display = "block";
      playAgainBtn.disabled = false;
      playAgainBtn.focus();
    }
  }

  function submitRow(rowIndex) {
    const inputs = getRowInputs(rowIndex);
    if (inputs.length !== COL_COUNT) return false;
    const guess = getRowWord(rowIndex);
    if (guess.length < COL_COUNT) return false;
    const solution = todaysWord;
    const evaluation = evaluateGuess(guess, solution);
    for (let i = 0; i < COL_COUNT; i++) {
      const inp = inputs[i];
      if (evaluation[i] === "correct") colorInput(inp, COLOR_CORRECT);
      else if (evaluation[i] === "present") colorInput(inp, COLOR_PRESENT);
      else colorInput(inp, COLOR_ABSENT);
      inp.disabled = true;
    }
    if (guess === solution) {
      showCongrats();
      return true;
    }

    if (guess !== solution && rowIndex === 4) {
      showWrong();
      return false;
    }
    const nextRow = rowIndex + 1;
    if (nextRow < ROW_COUNT) {
      setRowDisabled(nextRow, false);
      const nextFirst = getRowInputs(nextRow)[0];
      if (nextFirst) nextFirst.focus();
    }
    return true;
  }

  function attachRowListeners() {
    const rows = getRows();
    rows.forEach((rowEl, rowIndex) => {
      const inputs = getRowInputs(rowIndex);
      inputs.forEach((inputEl, colIndex) => {
        inputEl.setAttribute("maxlength", "1");
        inputEl.setAttribute("inputmode", "text");
        inputEl.autocomplete = "off";

        inputEl.addEventListener("input", () => {
          const raw = inputEl.value || "";
          const letter = raw.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 1);
          inputEl.value = letter;
          if (letter && colIndex < inputs.length - 1) {
            inputs[colIndex + 1].focus();
          }
        });

        inputEl.addEventListener("keydown", (e) => {
          if (e.key === "Backspace") {
            if (!inputEl.value && colIndex > 0) {
              inputs[colIndex - 1].focus();
              inputs[colIndex - 1].value = "";
              e.preventDefault();
            }
          } else if (e.key === "ArrowLeft") {
            if (colIndex > 0) {
              inputs[colIndex - 1].focus();
              e.preventDefault();
            }
          } else if (e.key === "ArrowRight") {
            if (colIndex < inputs.length - 1) {
              inputs[colIndex + 1].focus();
              e.preventDefault();
            }
          } else if (e.key === "Enter") {
            if (getRowWord(rowIndex).length === COL_COUNT) submitRow(rowIndex);
            e.preventDefault();
          }
        });

        inputEl.addEventListener("paste", (e) => {
          e.preventDefault();
          const paste = (e.clipboardData || window.clipboardData).getData("text").toUpperCase().replace(/[^A-Z]/g, "");
          if (!paste) return;
          for (let k = 0; k < paste.length && (colIndex + k) < inputs.length; k++) {
            inputs[colIndex + k].value = paste[k];
          }
          const filledWord = getRowWord(rowIndex);
          if (filledWord.length === COL_COUNT) submitRow(rowIndex);
          else {
            for (let k = 0; k < inputs.length; k++) {
              if (!inputs[k].value) {
                inputs[k].focus();
                break;
              }
            }
          }
        });
      });
    });
  }

  function init() {
    attachRowListeners();
    for (let r = 0; r < ROW_COUNT; r++) setRowDisabled(r, r !== 0);
    const first = getRowInputs(0)[0];
    if (first) first.focus();
    const homeBtn = document.getElementById("Home");
    if (homeBtn) {
      homeBtn.style.display = "none";
      homeBtn.disabled = true;
      homeBtn.addEventListener("click", () => {
        window.location.href = "/";
      });
    }
    const playAgainBtn = document.getElementById("PlayAgain");
    if (playAgainBtn) {
      playAgainBtn.style.display = "none";
      playAgainBtn.disabled = true;
      playAgainBtn.addEventListener("click", () => {
        location.reload();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();