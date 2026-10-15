# CODEX CAMAEL: Local Wi-Fi / Phone & Desktop Server
# Serves the complete offline survival reference to any PC or phone on your local Wi-Fi network

$port = 8080
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'Loopback|vEthernet' -and $_.IPAddress -notmatch '^169\.' } | Select-Object -First 1).IPAddress

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  ⚔️  CODEX CAMAEL OFFLINE SURVIVAL SERVER RUNNING" -ForegroundColor Cyan
Write-Host "  A life-saving digital reference. 100% offline." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  💻 On this PC:    http://localhost:$port" -ForegroundColor Yellow
if ($ip) {
    Write-Host "  📱 On your Phone: http://${ip}:$port" -ForegroundColor Magenta
    Write-Host "  (Ensure your phone is connected to the same Wi-Fi)" -ForegroundColor Gray
}
Write-Host ""
Write-Host "Press Ctrl+C to stop the server at any time." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green

# Open browser locally
Start-Process "http://localhost:$port"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")
try {
    $listener.Start()
} catch {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

$webRoot = $PSScriptRoot

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".webmanifest" = "application/manifest+json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".woff2" = "font/woff2"
    ".woff"  = "font/woff"
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($urlPath)) {
        $urlPath = "index.html"
    }

    $localPath = Join-Path $webRoot ($urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

    if (Test-Path $localPath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
        if ($mimeTypes.ContainsKey($ext)) {
            $response.ContentType = $mimeTypes[$ext]
        } else {
            $response.ContentType = "application/octet-stream"
        }
        $content = [System.IO.File]::ReadAllBytes($localPath)
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 File Not Found: $urlPath")
        $response.ContentLength64 = $notFoundMsg.Length
        $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
    }
    $response.OutputStream.Close()
}
