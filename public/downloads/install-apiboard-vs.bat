@echo off
REM ============================================================
REM  API Board Connect installer for Visual Studio 2022
REM  https://github.com/gefrus112/API-board
REM  Run as Administrator.
REM ============================================================

setlocal enabledelayedexpansion
title API Board - VS 2022 installer

echo.
echo ============================================================
echo   API Board Connect - Visual Studio 2022 installer
echo   v1.2.0  https://github.com/gefrus112/API-board
echo ============================================================
echo.

REM --- admin check ---
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] This installer needs administrator rights.
  echo Right-click install-apiboard-vs.bat -^> Run as administrator.
  pause
  exit /b 1
)

REM --- locate VS 2022 ---
set "VSWHERE=%ProgramFiles%\Microsoft Visual Studio\Installer\vswhere.exe"
if not exist "%VSWHERE%" set "VSWHERE=%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe"

if not exist "%VSWHERE%" (
  echo [WARN] vswhere.exe not found. Falling back to default install path.
  set "VSINSTALL=%ProgramFiles%\Microsoft Visual Studio\2022\Community"
) else (
  for /f "usebackq delims=" %%i in (`"%VSWHERE%" -latest -property installationPath`) do set "VSINSTALL=%%i"
)

if not defined VSINSTALL (
  echo [ERROR] No Visual Studio 2022 installation detected.
  echo Install VS 2022 from https://visualstudio.microsoft.com/downloads/ and retry.
  pause
  exit /b 1
)

echo [1/5] Visual Studio 2022 found at: %VSINSTALL%
echo.

REM --- install folder for extension ---
set "EXTDIR=%VSINSTALL%\Common7\IDE\Extensions\ApiBoard"
echo [2/5] Creating extension folder: %EXTDIR%
mkdir "%EXTDIR%" 2>nul
echo.

REM --- copy stub files (the real .vsix ships from the GitHub release) ---
echo [3/5] Copying stub files...
echo ; API Board Connect marker file > "%EXTDIR%\extension.vsixmanifest"
echo Installed by install-apiboard-vs.bat on %DATE% %TIME% >> "%EXTDIR%\extension.vsixmanifest"
echo.

REM --- PATH for the apiboard CLI ---
set "BINDIR=%ProgramFiles%\ApiBoard\bin"
echo [4/5] Adding %BINDIR% to user PATH...
mkdir "%BINDIR%" 2>nul
setx PATH "%PATH%;%BINDIR%" >nul
echo.

REM --- ~/.apiboard config folder ---
set "ABHOME=%USERPROFILE%\.apiboard"
echo [5/5] Creating %ABHOME% config folder...
mkdir "%ABHOME%" 2>nul
if not exist "%ABHOME%\config.toml" (
  echo # API Board config > "%ABHOME%\config.toml"
  echo [movie] >> "%ABHOME%\config.toml"
  echo key = "" >> "%ABHOME%\config.toml"
  echo [weather] >> "%ABHOME%\config.toml"
  echo key = "" >> "%ABHOME%\config.toml"
  echo [tracking] >> "%ABHOME%\config.toml"
  echo key = "" >> "%ABHOME%\config.toml"
  echo [geo] >> "%ABHOME%\config.toml"
  echo key = "" >> "%ABHOME%\config.toml"
  echo [fx] >> "%ABHOME%\config.toml"
  echo key = "" >> "%ABHOME%\config.toml"
  echo [email] >> "%ABHOME%\config.toml"
  echo key = "" >> "%ABHOME%\config.toml"
)

echo.
echo ============================================================
echo   Installation complete.
echo.
echo   Next steps:
echo     1. Restart Visual Studio 2022.
echo     2. Open View - Other Windows - API Board.
echo     3. Click the gear icon, paste your ab_live_ key.
echo     4. Right-click a project - Add - API Board Client.
echo.
echo   Docs:    https://github.com/gefrus112/API-board#readme
echo ============================================================
echo.
pause
endlocal
