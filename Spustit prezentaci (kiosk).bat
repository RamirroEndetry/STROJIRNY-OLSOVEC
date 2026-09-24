@echo off
rem Spusti prezentaci v kiosk rezimu (cela obrazovka, bez list prohlizece). Ukonceni: Alt+F4.
set "APP=%~dp0index.html"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%EDGE%" (
  start "" "%EDGE%" --kiosk "file:///%APP%" --edge-kiosk-type=fullscreen --no-first-run --disable-pinch --overscroll-history-navigation=0
) else if exist "%CHROME%" (
  start "" "%CHROME%" --kiosk "file:///%APP%" --no-first-run --disable-pinch --overscroll-history-navigation=0
) else (
  start "" "%APP%"
)
