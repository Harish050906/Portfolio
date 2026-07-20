@echo off
echo Initializing Git (if not already initialized)...
git init

echo.
echo Setting remote origin to https://github.com/Harish050906/Portfolio ...
git remote remove origin 2>nul
git remote add origin https://github.com/Harish050906/Portfolio

echo.
echo Fetching from GitHub...
git fetch origin

echo.
echo Pulling LICENSE from remote to prevent losing it...
git checkout origin/main -- LICENSE 2>nul

echo.
echo Resetting Git tracking cache (respecting .gitignore)...
git rm -r --cached . 2>nul

echo.
echo Staging changes...
git add .

echo.
echo Committing changes...
git commit -m "Initial monorepo commit: React frontend, FastAPI backend, and deployment config"

echo.
echo Pushing to GitHub (main branch)...
git branch -M main
git push -u origin main --force

echo.
echo Process complete!
pause
