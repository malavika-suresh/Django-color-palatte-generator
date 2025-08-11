<<<<<<< HEAD
Color Palette Generator (Django)
=================================
This is a minimal Django project that serves a simple Color Palette Generator UI.

Quick start:
1. Create a virtualenv: python -m venv venv
2. Activate it:
   - Windows: venv\Scripts\activate
   - macOS/Linux: source venv/bin/activate
3. Install requirements:
   pip install -r requirements.txt
4. Run migrations (no models but required):
   python manage.py migrate
5. Run the dev server:
   python manage.py runserver
6. Open http://127.0.0.1:8000/ in your browser.

Notes:
- The generator is client-side JS located in generator/static/generator/js/palette.js
- Template is at generator/templates/generator/index.html
=======
# 🎨 Vertical Palette Generator

A simple **Python Django** app that generates beautiful vertical color palettes based on a selected base color and scheme. Palettes are displayed as stacked color columns with HEX codes for quick copy.

## 🚀 Features
- Choose base color via color picker.
- Multiple color schemes: Analogous, Complementary, Triadic, Split-Complementary, Monochromatic.
- Click a color to copy its HEX code.
- Fully responsive layout.
- Minimal, clean design.

## 🛠 Tech Stack
- **Language:** Python 3.x
- **Framework:** Django
- **Frontend:** HTML, CSS, JavaScript
- **Static Handling:** Django static files

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vertical-palette-generator.git
   cd vertical-palette-generator
>>>>>>> 1cc8833a1fe8ff84a176aee9cf17d3bc73e122d7
