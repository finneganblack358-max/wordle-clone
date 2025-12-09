# Wordle Clone

Simple browser Wordle-like game built with Flask templates and static JS/CSS.  
5 rows × 5 columns. Type letters, press Enter to submit a row, correct letters turn green, present letters turn yellow.

## Prerequisites
- Python 3.8+
- Flask (pip install Flask)

## Run (Windows)
1. From project root install dependencies:
   ```
   pip install Flask
   ```
2. Start your Flask app (adjust FLASK_APP to your entrypoint):
   ```
   set FLASK_APP=api.routes
   flask run
   ```
   Or run your existing app entry file (e.g., `python app.py`).

3. Open http://127.0.0.1:5000/new_game

## How to change the solution word
Inject a JS variable in the template before loading game.js:
```html
<script>window.TODAYS_WORD = "{{ secret_word|upper }}";</script>
<script src="{{ url_for('static', filename='game.js') }}"></script>
```
Or set window.TODAYS_WORD manually in the page for testing:
```html
<script>window.TODAYS_WORD = "APPLE";</script>
```

## Controls
- Type a letter → focus moves right
- Backspace on empty cell → moves left and clears
- Arrow keys navigate
- Enter submits the current row (required to evaluate)
- Play Again reloads page
- Home button appears on correct guess and links to `/`

## Expected template structure
new_game.html should include five `.inputs` rows each containing five `input.inputRow` elements and buttons with ids `Home` and `PlayAgain`. Example snippet:
```html
<div class="inputs">
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
</div>
<!-- repeat 5 rows total -->
<button id="Home">Go to Home</button>
<button id="PlayAgain">Play Again</button>
```

## Files
- templates/
  - index.html
  - new_game.html
- static/
  - style.css
  - script.js
  - game.js
- api/
  - routes.py

## Notes / Troubleshooting
- game.js runs on DOMContentLoaded; ensure script is referenced after the DOM or via template injection.
- If buttons don't respond, verify IDs `Home` and `PlayAgain` exist.
- If routes 404, ensure Flask blueprint names and url_for usage match your app.
- To test locally, hardcode window.TODAYS_WORD in the template as shown above.

License: MIT
```// filepath: c:\Users\finne\OneDrive\Desktop\Wordle Clone\README.md
# Wordle Clone

Simple browser Wordle-like game built with Flask templates and static JS/CSS.  
5 rows × 5 columns. Type letters, press Enter to submit a row, correct letters turn green, present letters turn yellow.

## Prerequisites
- Python 3.8+
- Flask (pip install Flask)

## Run (Windows)
1. From project root install dependencies:
   ```
   pip install Flask
   ```
2. Start your Flask app (adjust FLASK_APP to your entrypoint):
   ```
   set FLASK_APP=api.routes
   flask run
   ```
   Or run your existing app entry file (e.g., `python app.py`).

3. Open http://127.0.0.1:5000/new_game

## How to change the solution word
Inject a JS variable in the template before loading game.js:
```html
<script>window.TODAYS_WORD = "{{ secret_word|upper }}";</script>
<script src="{{ url_for('static', filename='game.js') }}"></script>
```
Or set window.TODAYS_WORD manually in the page for testing:
```html
<script>window.TODAYS_WORD = "APPLE";</script>
```

## Controls
- Type a letter → focus moves right
- Backspace on empty cell → moves left and clears
- Arrow keys navigate
- Enter submits the current row (required to evaluate)
- Play Again reloads page
- Home button appears on correct guess and links to `/`

## Expected template structure
new_game.html should include five `.inputs` rows each containing five `input.inputRow` elements and buttons with ids `Home` and `PlayAgain`. Example snippet:
```html
<div class="inputs">
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
  <input class="inputRow" type="text" maxlength="1"/>
</div>
<!-- repeat 5 rows total -->
<button id="Home">Go to Home</button>
<button id="PlayAgain">Play Again</button>
```

## Files
- templates/
  - index.html
  - new_game.html
- static/
  - style.css
  - script.js
  - game.js
- api/
  - routes.py

## Notes / Troubleshooting
- game.js runs on DOMContentLoaded; ensure script is referenced after the DOM or via template injection.
- If buttons don't respond, verify IDs `Home` and `PlayAgain` exist.
- If routes 404, ensure Flask blueprint names and url_for usage match your app.
- To test locally, hardcode window.TODAYS_WORD in the template as shown above.

License: MIT