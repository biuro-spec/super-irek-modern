# Deploy superirek.pl -> CyberFolks (WinSCP, FTP), wzorowane na life-ratownictwo-web/deploy.ps1
# Haslo pobierane W LOCIE z zapisanej sesji FileZilli (ntroixgelh@s75) - brak sekretow w repo.
# Uzycie:  powershell -ExecutionPolicy Bypass -File deploy.ps1          (sam upload dist/)
#          powershell -ExecutionPolicy Bypass -File deploy.ps1 -Build   (najpierw npm run build)
param([switch]$Build)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if ($Build) {
  Write-Host ">> npm run build..." -ForegroundColor Cyan
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "Build nieudany" }
}
if (-not (Test-Path "$PSScriptRoot\dist\index.html")) { throw "Brak dist/index.html - najpierw build" }
if (-not (Test-Path "$PSScriptRoot\dist\.htaccess")) { throw "Brak dist/.htaccess - SPA fallback by przepadl" }

[xml]$r = Get-Content "$env:APPDATA\FileZilla\recentservers.xml"
$s = @($r.FileZilla3.RecentServers.Server | Where-Object {
  $_.Host -eq 's75.cyber-folks.pl' -and $_.User -eq 'ntroixgelh' -and $_.Pass.'#text'
})[0]
if (-not $s) { throw "Brak zapisanej sesji ntroixgelh@s75 w FileZilli" }
$pass  = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($s.Pass.'#text'))
$passQ = $pass -replace '"','""'

$REMOTE = '/domains/superirek.pl/public_html'

$lines = @(
  'option batch abort',
  'option confirm off',
  ('open ftp://ntroixgelh@s75.cyber-folks.pl:21 -passive=on -password="' + $passQ + '"'),
  ('synchronize remote -criteria=either "' + "$PSScriptRoot\dist" + '" "' + $REMOTE + '"'),
  'exit'
)
$tmp = "$env:TEMP\ws_deploy_irek.txt"
Set-Content $tmp $lines -Encoding ascii

Write-Host ">> Wysylka dist/ -> $REMOTE ..." -ForegroundColor Cyan
cmd /c "`"C:\Program Files (x86)\WinSCP\WinSCP.com`" /script=`"$tmp`" /ini=nul > `"$env:TEMP\ws_deploy_irek_out.txt`" 2>&1"
$kod = $LASTEXITCODE
$out = Get-Content "$env:TEMP\ws_deploy_irek_out.txt"
Remove-Item $tmp,"$env:TEMP\ws_deploy_irek_out.txt" -Force
$out | Select-Object -Last 15
if ($kod -ne 0) { throw "WinSCP zakonczyl z kodem $kod" }
Write-Host ">> OK - https://superirek.pl zaktualizowane." -ForegroundColor Green
