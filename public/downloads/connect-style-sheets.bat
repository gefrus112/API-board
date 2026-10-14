@echo off
REM ============================================================
REM  Connect API Board style sheets to your project
REM  https://github.com/gefrus112/API-board
REM  Run from any project root. No admin rights needed.
REM ============================================================

setlocal enabledelayedexpansion
title API Board - style sheet connector

echo.
echo ============================================================
echo   API Board style.css connector
echo   v1.2.0  https://github.com/gefrus112/API-board
echo ============================================================
echo.

REM --- detect project type ---
set "PROJTYPE=plain-html"
if exist *.csproj (
  set "PROJTYPE=dotnet"
  set "DEST=wwwroot\css"
) else if exist *.vbproj (
  set "PROJTYPE=dotnet"
  set "DEST=wwwroot\css"
) else if exist package.json (
  set "PROJTYPE=node"
  set "DEST=public\css"
) else (
  set "DEST=css"
)

echo [1/5] Project type detected: %PROJTYPE%
echo [2/5] Target folder: .\%DEST%
echo.

REM --- create css folder ---
if not exist "%DEST%" mkdir "%DEST%"
echo [3/5] Created folder: .\%DEST%
echo.

REM --- download style.css from the GitHub raw URL ---
set "URL=https://raw.githubusercontent.com/gefrus112/API-board/main/public/downloads/style.css"
set "OUT=%DEST%\style.css"

echo [4/5] Downloading style.css from GitHub...
where curl >nul 2>&1
if %errorlevel% equ 0 (
  curl -sL "%URL%" -o "%OUT%"
) else (
  where powershell >nul 2>&1
  if %errorlevel% equ 0 (
    powershell -NoProfile -Command "(New-Object Net.WebClient).DownloadFile('%URL%', '%OUT%')"
  ) else (
    echo [ERROR] Neither curl nor powershell found. Cannot download.
    pause
    exit /b 1
  )
)
echo       Wrote %OUT%
echo.

echo [5/5] Paste this ^<link^> tag into your layout:
echo.
if "%PROJTYPE%"=="dotnet" (
  echo   ^<link rel="stylesheet" href="~/css/style.css" asp-append-version="true" /^>
) else (
  echo   ^<link rel="stylesheet" href="./css/style.css" /^>
)
echo.
echo ============================================================
echo   style.css is in place. Done.
echo   Docs:  https://github.com/gefrus112/API-board#readme
echo ============================================================
echo.
pause
endlocal
