@echo off
REM Quick import script for achievements data

echo Importing achievements data to Sanity...
echo.

sanity dataset import achievements.ndjson production --replace

if errorlevel 1 (
    echo [ERROR] Failed to import achievements
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Achievements imported successfully!
echo Your AWS AIdeas Challenge achievement should now appear in the popup.
echo.
pause
