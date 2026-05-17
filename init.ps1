[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$RED = "`e[31m"
$GREEN = "`e[32m"
$YELLOW = "`e[33m"
$CYAN = "`e[36m"
$RESET = "`e[0m"

Write-Host "${YELLOW}[i] Verificando dependências...${RESET}"

# Detectar Python
if (Get-Command python -ErrorAction SilentlyContinue) {
    $py = "python"
}
elseif (Get-Command py -ErrorAction SilentlyContinue) {
    $py = "py"
}
else {
    Write-Host "${RED}[X] Python não instalado ou não está no PATH.${RESET}"
    exit
}

# Verificar Node
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "${RED}[X] Node não instalado ou não está no PATH.${RESET}"
    exit
}

# Verificar npm
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "${RED}[X] npm não instalado ou não está no PATH.${RESET}"
    exit
}

Write-Host "${GREEN}[✓] Dependências OK${RESET}"

# ========================
# BACKEND
# ========================
Write-Host "${CYAN}[i] Configurando backend...${RESET}"

Set-Location .\backend

& $py -m pip install -r requirements.txt -q

Write-Host "${GREEN}[✓] Backend pronto${RESET}"

# Rodar backend em outro terminal
#Start-Process powershell -ArgumentList '-NoExit -Command "& python -m uvicorn app:app --reload"'

Set-Location ..

Write-Host "${CYAN}[i] Configurando frontend...${RESET}"

Set-Location .\frontend

npm install --silent

Write-Host "${GREEN}[v] Frontend pronto${RESET}"
#Write-Host "${CYAN}[i] Iniciando frontend...${RESET}"

npm run dev