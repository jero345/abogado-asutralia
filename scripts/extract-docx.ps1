# Extract plain text from every .docx under class-actions-cases/.
# Outputs to scripts/extracted-content.txt with one section per case.
# Usage:  powershell -ExecutionPolicy Bypass -File scripts/extract-docx.ps1

Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = Join-Path $PSScriptRoot '..\class-actions-cases'
$out  = Join-Path $PSScriptRoot 'extracted-content.txt'

Remove-Item $out -ErrorAction SilentlyContinue
New-Item -ItemType File -Path $out -Force | Out-Null

function Extract-DocxText {
  param([string]$DocxPath)
  $zip = [System.IO.Compression.ZipFile]::OpenRead($DocxPath)
  try {
    $entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
    if (-not $entry) { return '' }
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $xml = $reader.ReadToEnd()
    $reader.Close()
    # Convert each paragraph break to a newline; each tab to a tab.
    $xml = [regex]::Replace($xml, '<w:p[^>]*/>', "`n")
    $xml = [regex]::Replace($xml, '</w:p>', "`n")
    $xml = [regex]::Replace($xml, '<w:tab[^>]*/>', "`t")
    # Strip every other XML tag.
    $text = [regex]::Replace($xml, '<[^>]+>', '')
    # Decode common XML entities.
    $text = $text -replace '&amp;','&' -replace '&lt;','<' -replace '&gt;','>' -replace '&quot;','"' -replace '&apos;',"'" -replace '&#8217;',"'" -replace '&#8216;',"'" -replace '&#8220;','"' -replace '&#8221;','"' -replace '&#8211;','-' -replace '&#8212;','-' -replace '&#160;',' '
    # Collapse runs of blank lines.
    $text = [regex]::Replace($text, "(\r?\n){3,}", "`n`n")
    return $text.Trim()
  } finally {
    $zip.Dispose()
  }
}

$folders = Get-ChildItem -Path $root -Directory | Sort-Object Name
foreach ($folder in $folders) {
  $docx = Get-ChildItem -Path $folder.FullName -Filter '*.docx' | Where-Object { $_.Name -notlike '~$*' }
  foreach ($file in $docx) {
    $header = "`n`n========================================================================`n"
    $header += "CASE FOLDER: $($folder.Name)`n"
    $header += "FILE:        $($file.Name)`n"
    $header += "========================================================================`n"
    Add-Content -Path $out -Value $header -Encoding UTF8
    $body = Extract-DocxText -DocxPath $file.FullName
    Add-Content -Path $out -Value $body -Encoding UTF8
  }
}

Write-Output "Done. Wrote $out"
