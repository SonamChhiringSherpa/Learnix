# Learnix – Django Learning Platform

## Overview

Learnix is a Django-based learning platform that showcases courses, blogs, portfolios, and account flows. It is structured as a multi-app Django project with static assets and templates for a complete educational site.

- Python: 3.13 (project venv present)
- Django: 5.2.x
- Database: SQLite (default)

## Project Structure

- `project/` – Django project config (`settings.py`, `urls.py`, `wsgi.py`, `asgi.py`)
- `accounts/` – authentication/account-related views and URLs
- `app/` – core pages and forms (landing and common views)
- `blog/` – blog posts, authors, and related media
- `courses/` – courses and lessons
- `portfolio/` – portfolio items and details
- `static/` – CSS, JS, images, vendor assets
- `template/` – HTML templates (base, partials, pages)
- `media/` – uploaded images (authors, blog, portfolio, projects)

## Local Setup

1) Clone the repository

```bash
git clone <your-fork-or-repo-url>
cd Learnix
```

2) Create and activate a virtual environment (if you are not using the provided `venv/`)

```bash
python -m venv .venv
# Windows PowerShell
. .venv\Scripts\Activate.ps1
# Or cmd
.venv\Scripts\activate.bat
```

3) Install dependencies

If you have a `requirements.txt`, use it. Otherwise install the essentials:

```bash
pip install "django>=5.2,<6.0" pillow sqlparse tzdata
```

4) Run database migrations

```bash
python manage.py migrate
```

5) Create a superuser (optional but recommended for admin access)

```bash
python manage.py createsuperuser
```

6) Start the development server

```bash
python manage.py runserver
```

Then open `http://127.0.0.1:8000/` in your browser.

## Configuration Notes

- By default, SQLite is used and no extra setup is needed.
- For production, set `DEBUG = False` and configure `ALLOWED_HOSTS` in `project/settings.py`.
- To serve static files in production, run `python manage.py collectstatic` and configure your web server to serve `STATIC_ROOT` and `MEDIA_ROOT`.

## Apps and URLs

- `accounts/urls.py` – register, login, enroll/reset flows
- `app/urls.py` – core pages (home, about, contact)
- `blog/urls.py` – blog list and details
- `courses/urls.py` – courses and lessons
- `portfolio/urls.py` – portfolio list and details
- Root router: `project/urls.py`

## Static and Media

- Static assets live in `static/assets/...` (CSS, JS, images, vendor files)
- Uploaded media is stored under `media/` with subdirectories for authors, blogs, portfolio, and projects

## Screenshots

Screenshots are stored under `static/assets/screenshot/`.

- Homepage

```text
static/assets/screenshot/home.png
```

- About

```text
static/assets/screenshot/about.png
```

- Courses

```text
static/assets/screenshot/course.png
```

- Bash Practice

```text
static/assets/screenshot/bash-practice.png
```

- HTML Practice

```text
static/assets/screenshot/html-practice.png
```

- Contact

```text
static/assets/screenshot/contact.png
```

## Development Tips

- Use Django admin at `/admin/` with your superuser to manage content.
- Keep app-specific templates under `template/` and reference them via app views.
- When adding models, create migrations with `python manage.py makemigrations` then apply with `python manage.py migrate`.

## Contributors

- Sonam Chhiring Sherpa – HTML course, Project Lead
- Saket Yadav – JavaScript challenges, Documentation
- Papit Ghimire – Bash challenges, Documentation
- Prashant Singh – Blog, About us
- Siddharth Shrestha – Home

## License

This project is provided for educational purposes. Add a license of your choice (e.g., MIT) if distributing publicly.
