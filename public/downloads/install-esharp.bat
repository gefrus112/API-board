@echo off
REM ============================================================
REM  e# (esharp) language installer for Windows
REM  https://github.com/gefrus112/API-board
REM  Run as Administrator.
REM ============================================================

setlocal enabledelayedexpansion
title e# (esharp) language installer

echo.
echo ============================================================
echo   e# (esharp) language installer
echo   Combine video games together with a Rust-inspired syntax
echo   v1.2.0  https://github.com/gefrus112/API-board
echo ============================================================
echo.

REM --- admin check ---
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo [ERROR] This installer needs administrator rights.
  echo Right-click install-esharp.bat -^> Run as administrator.
  pause
  exit /b 1
)

set "ESHARP_HOME=%ProgramFiles%\Esharp"
set "BINDIR=%ESHARP_HOME%\bin"

echo [1/5] Creating install folder: %ESHARP_HOME%
mkdir "%ESHARP_HOME%" 2>nul
mkdir "%BINDIR%" 2>nul
echo.

echo [2/5] Writing esharp stub binary...
REM Real binary ships from https://github.com/gefrus112/API-board/releases
REM This stub is a placeholder so the rest of the install succeeds.
@echo @echo esharp v1.2.0 (stub) - download the real binary from GitHub releases. > "%BINDIR%\esharp.cmd"
echo.

echo [3/5] Adding %BINDIR% to user PATH...
setx PATH "%PATH%;%BINDIR%" >nul
echo.

echo [4/5] Registering .esharp and .e# file associations...
assoc .esharp=esharp.source 2>nul
assoc .e#=esharp.source 2>nul
ftype esharp.source=notepad.exe "%%1" 2>nul
echo.

echo [5/5] Installing Visual Studio project template...
set "VSDEFTPL=%USERPROFILE%\Documents\Visual Studio 2022\Templates\ProjectTemplates"
mkdir "%VSDEFTPL%\e# Game" 2>nul
echo ^<?xml version="1.0"?^> > "%VSDEFTPL%\e# Game\e# Game.vstemplate"
echo ^<VSTemplate Type="Project" Version="3.0.0"^> >> "%VSDEFTPL%\e# Game\e# Game.vstemplate"
echo   ^<TemplateData^>^<Name^>e# Game^</Name^>^<Description^>Combine games together with esharp^</Description^>^</TemplateData^> >> "%VSDEFTPL%\e# Game\e# Game.vstemplate"
echo ^</VSTemplate^> >> "%VSDEFTPL%\e# Game\e# Game.vstemplate"
echo.

echo.
echo ============================================================
echo   e# installed (stub).
echo.
echo   To get the real compiler, download the latest release:
echo     https://github.com/gefrus112/API-board/releases
echo   and copy esharp.exe into %BINDIR%
echo.
echo   Then write your first program:
echo     esharp new hello
echo     cd hello
echo     esharp run
echo.
echo   Docs:  https://github.com/gefrus112/API-board#readme
echo ============================================================
echo.
pause
endlocal
