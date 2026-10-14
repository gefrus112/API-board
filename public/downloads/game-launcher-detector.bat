@echo off
REM ============================================================
REM  API Board — Game Launcher Detector v1.4
REM  Detects Steam + Roblox + Minecraft + Epic Games installed
REM  Writes games.json with every detected game.
REM  No administrator rights needed.
REM  https://github.com/gefrus112/API-board
REM ============================================================

setlocal enabledelayedexpansion
title API Board - Game Launcher Detector v1.4

echo.
echo ============================================================
echo   API Board - Game Launcher Detector v1.4
echo   https://github.com/gefrus112/API-board
echo ============================================================
echo.

REM --- output JSON file (in the same folder as the batch file) ---
set "OUT=%~dp0games.json"
echo {"games": [ > "%OUT%"
set "FIRST=1"

REM ============================================================
REM Phase 1 — Steam
REM ============================================================
echo [1/4] Detecting Steam games...

set "STEAM_DIR=%ProgramFiles(x86)%\Steam"
if not exist "%STEAM_DIR%" set "STEAM_DIR=%ProgramFiles%\Steam"
if not exist "%STEAM_DIR%" set "STEAM_DIR=%LOCALAPPDATA%\Steam"

if exist "%STEAM_DIR%\steamapps\libraryfolders.vdf" (
  echo   Found Steam at: %STEAM_DIR%
  set "MANIFEST_DIR=%STEAM_DIR%\steamapps"
  pushd "%MANIFEST_DIR%"
  for %%F in (manifest_*.acf) do (
    set "APPID="
    set "NAME="
    for /f "usebackq tokens=1,* delims==" %%A in ("%%F") do (
      echo %%A | findstr /C:"\"appid\"" >nul && (
        for /f "tokens=2 delims==" %%N in ("%%B") do (
          set "T=%%N"
          set "T=!T:"=!"
          set "T=!T: =!"
          set "APPID=!T!"
        )
      )
      echo %%A | findstr /C:"\"name\"" >nul && (
        for /f "tokens=2 delims==" %%N in ("%%B") do (
          set "T=%%N"
          set "T=!T:"=!"
          for /f "tokens=* usebackq" %%X in (`echo !T!`) do set "NAME=%%X"
        )
      )
    )
    if defined NAME if defined APPID (
      echo     - !NAME! ^ (appid !APPID!)
      if "!FIRST!"=="0" echo , >> "%OUT%"
      echo   { "platform": "steam", "appid": "!APPID!", "name": "!NAME!", "path": "%STEAM_DIR:\=/%" } >> "%OUT%"
      set "FIRST=0"
    )
  )
  popd
) else (
  echo   Steam not detected at the standard install paths.
)

REM ============================================================
REM Phase 2 — Roblox
REM ============================================================
echo.
echo [2/4] Detecting Roblox...

set "ROBLOX_DIR=%LOCALAPPDATA%\Roblox\Versions"
set "ROBLOX_FOUND=0"
if exist "%ROBLOX_DIR%" (
  pushd "%ROBLOX_DIR%"
  for /d %%D in (version-*) do (
    if exist "%%D\RobloxPlayerBeta.exe" (
      echo   Found Roblox at: %LOCALAPPDATA%\Roblox\Versions\%%D\RobloxPlayerBeta.exe
      if "!FIRST!"=="0" echo , >> "%OUT%"
      echo   { "platform": "roblox", "version": "%%D", "name": "Roblox Player" } >> "%OUT%"
      set "FIRST=0"
      set "ROBLOX_FOUND=1"
    )
  )
  popd
)
if "%ROBLOX_FOUND%"=="0" echo   Roblox not detected at %%LOCALAPPDATA%%\Roblox.

REM ============================================================
REM Phase 3 — Minecraft
REM ============================================================
echo.
echo [3/4] Detecting Minecraft...

set "MC_DIR=%APPDATA%\.minecraft"
if exist "%MC_DIR%\launcher_profiles.json" (
  echo   Found Minecraft at: %APPDATA%\.minecraft
  pushd "%MC_DIR%"
  set /a PROFCOUNT=0
  for /f "usebackq tokens=2 delims=:" %%A in (`findstr /C:"\"name\"" launcher_profiles.json`) do (
    set /a PROFCOUNT+=1
  )
  echo   Minecraft profiles detected: !PROFCOUNT!
  if "!FIRST!"=="0" echo , >> "%OUT%"
  echo   { "platform": "minecraft", "name": "Minecraft", "profiles": !PROFCOUNT! } >> "%OUT%"
  set "FIRST=0"
  popd
) else (
  echo   Minecraft not detected at %%APPDATA%%\.minecraft.
)

REM ============================================================
REM Phase 4 — Epic Games
REM ============================================================
echo.
echo [4/4] Detecting Epic Games...

set "EPIC_DIR=%ProgramData%\Epic\EpicGamesLauncher\Data\Manifests"
if exist "%EPIC_DIR%" (
  pushd "%EPIC_DIR%"
  set /a EPICCOUNT=0
  for %%F in (*.item) do (
    set /a EPICCOUNT+=1
    set "EPICNAME="
    for /f "usebackq tokens=1,* delims=" %%A in ("%%F") do (
      echo %%A | findstr /C:"DisplayName" >nul && (
        set "LINE=%%A"
        set "EPICNAME=!LINE:*DisplayName=!"
        set "EPICNAME=!EPICNAME:"=!"
        set "EPICNAME=!EPICNAME: =!"
      )
    )
    echo     - %%~nF
    if "!FIRST!"=="0" echo , >> "%OUT%"
    echo   { "platform": "epic", "manifest": "%%~nF.item", "name": "%%~nF" } >> "%OUT%"
    set "FIRST=0"
  )
  popd
  if "!EPICCOUNT!"=="0" echo   Epic Games manifests folder empty.
) else (
  echo   Epic Games not detected at %%ProgramData%%\Epic\EpicGamesLauncher.
)

REM --- close the JSON array ---
echo ] } >> "%OUT%"

echo.
echo ============================================================
echo   Detection complete.
echo   Output written to: %OUT%
echo.
echo   Pick any game in e# with:
echo     use api_board::Steam;
echo     game! Mashup {
echo         scenes: [
echo             Scene::from(Steam::library().pick("Portal 2")),
echo             Scene::from(Steam::library().pick("Stardew Valley")),
echo         ],
echo     }
echo.
echo   Then:  esharp build mashup.esharp
echo          esharp run mashup.game
echo ============================================================
echo.
pause
endlocal
