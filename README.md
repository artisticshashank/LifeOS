# LifeOS — Daily Planner

A responsive, static productivity dashboard for DSA/placements, development, college, competitive exams, fitness, and painting.

## Features
- College-day, holiday, and weekly-focus views
- Interactive daily checklist with progress ring
- Saves checklist, theme, and tomorrow's priority in browser localStorage
- Responsive layout for mobile and desktop
- No dependencies, backend, API keys, or build step

## Deploy
This is a static site. In GitHub, open Settings → Pages, select Deploy from a branch, choose main and /(root), then Save.

The site URL should be https://artisticshashank.github.io/LifeOS/

## Notes
- The routine assumes college runs approximately 8:00 AM–4:30 PM; edit the schedule in app.js to match your timetable.
- Checklist and notes are stored only in the current browser on the current device and do not sync between devices.
- A 10:30 PM bedtime gives a 6:00 AM wake-up time 7.5 hours in bed.


Deployment workflow configured in `.github/workflows/pages.yml`.
