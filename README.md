# Otakore — Pirate-Themed Login Page

A stylized anime/pirate-themed authentication UI built with pure HTML, CSS, and vanilla JavaScript. No frameworks. No dependencies.

---

## Preview

<p align="center">
  <img src="./preview-anime.png" alt="Login Page Review" width="100%" />
</p>

---

## Features

- **Sign Up form** with real-time field validation
- **Password strength meter** with pirate-flavored feedback
- **Sign In modal** triggered from the top-right button
- **Google OAuth button** (UI only — wire to your backend)
- **Toast notifications** for success, error, and loading states
- **Ripple effect** on all interactive buttons
- **Animated background** — floating particles, rotating rings, compass rose, mouse-tracking glow
- Fully **responsive-ready** structure

---

## File Structure

```
/
├── index.html
├── style.css
├── script.js
└── kaishi_pict.png
```

---

## Usage

1. Clone or download the repo
2. Drop your character image in the same folder and name it `kaishi_pict.png`  
   *(or update the `src` in the `<img class="character">` tag)*
3. Open `index.html` in a browser — done

No build step. No npm install. Just open and go.

---

## Connecting a Real Backend

The form currently simulates async requests with `setTimeout`. To wire it up:

| Action | Where to hook |
|---|---|
| Sign Up | Replace the `setTimeout` in the `signupBtn` click handler with your API call |
| Sign In | Replace the `setTimeout` in the `signinBtn` click handler |
| Google OAuth | Replace the `showToast` in `googleBtn` handler with `window.location` or your OAuth flow |

---

## Customization

| What | Where |
|---|---|
| Colors & theme | `:root` CSS variables at the top of `<style>` |
| Character image | `<img class="character" src="...">` |
| Brand name | `.logo` element and `<title>` tag |
| Copy / pirate text | `.heading`, `.subtext`, button `.btn-text` spans |
| Particle count | `for (let i = 0; i < 28; i++)` in the JS block |

---

## Tech Stack

- HTML5
- CSS3 (custom properties, keyframe animations, grid/flex)
- Vanilla JavaScript (ES6+)
- Google Fonts — [Cinzel](https://fonts.google.com/specimen/Cinzel) + [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro)

---

## License

MIT — use it, fork it, plunder it freely. ⚓