@echo off
echo Initializing Git (if not already initialized)...
git init

echo.
echo Resetting Git tracking cache (respecting new .gitignore)...
git rm -r --cached . 2>nul

echo.
echo Setting remote origin to https://github.com/Harish050906/Portfolio ...
git remote remove origin 2>nul
git remote add origin https://github.com/Harish050906/Portfolio

echo.
echo Staging changes...
git add .

echo.
echo Committing changes...
git commit -m "Update portfolio images, slider UX, and README setup instructions"

echo.
echo Pushing to GitHub (main branch)...
git branch -M main
git push -u origin main

echo.
echo Process complete!
pause
