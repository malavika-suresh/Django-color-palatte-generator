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
