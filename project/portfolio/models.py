from django.db import models
class Portfolio(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="portfolio/")
    short_description = models.CharField(max_length=200)
    long_description = models.TextField()
    slug = models.SlugField(unique=True)

    # Contact Info
    email = models.EmailField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)

    # Skills (stored as simple text lists for SQLite)
    technical_skills = models.TextField(blank=True, null=True,
        help_text="Comma-separated values, e.g. HTML, CSS, JS")
    soft_skills = models.TextField(blank=True, null=True,
        help_text="Comma-separated values, e.g. Communication, Teamwork")

    # Education (stored as text for simplicity in SQLite)
    education = models.TextField(blank=True, null=True,
        help_text="Use format: Degree - Year, separated by semicolons")

    def get_technical_skills(self):
        skills = []
        if self.technical_skills:
            for s in self.technical_skills.split(","):
                try:
                    name, percent = s.split("-")
                    skills.append({"name": name.strip(), "percent": int(percent.strip())})
                except:
                    pass
        return skills


    def get_soft_skills(self):
        return [s.strip() for s in self.soft_skills.split(",")] if self.soft_skills else []

    def get_education(self):
        return [e.strip() for e in self.education.split(";")] if self.education else []

    def __str__(self):
        return self.name

class Project(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=150)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/", blank=True, null=True)
    live_demo = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} ({self.portfolio.name})"
