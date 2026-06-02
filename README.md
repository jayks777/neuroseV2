# NeuroseV2

Projeto com objetivo de treinar para a Code Race de 2026. O projeto é uma api CRUD simples de criação de usuários, desenvolvido em Python e Javascript, utilizando Frameworks como React, React-Router, Tailwind-css, FastAPI e Uvicorn para servidor assíncrono.

## Desenvolvedores
- Jaykson Araujo Bolico (desenvolvedor Full Stack e Analista de Cybersegurança)
- Raul Bauer (desenvolvedor Backend)

## Começando
Para rodar esse projeto localmente, oferecemos dois modos de inicialização: **manual** e **automática**. Em ambas as formas, você vai precisar dos seguintes requisitos:

- **Node**
- **Python3** ou superior
- **Conexão com a internet**
- **Git** - *opcional, mas facilita muito*

Recomendamos também que você execute esses processos a partir de um **venv** do python, para evitar eventuais conflitos.

### 1. Automática

clone e acesse o repositório (*ou baixe e extraia o [zip](https://github.com/jayks777/neuroseV2/archive/refs/heads/master.zip) em sua máquina*):
```bash
git clone https://github.com/jayks777/neuroseV2/
cd neuroseV2
```

execute um dos scrips de instalação e inicialização pré criados a partir do seu sistema operacional

**Windows:**

Em um terminal PowerShell com permissões de administrador:

```ps1
Set-ExecutionPolicy RemoteSigned
./init.ps1
```
**Linux:**

```bash
chmod +x init.sh
sudo bash init.sh
```

Após a instalação e execução acesse

- **[localhost:5173](localhost:5173) para a interface gráfica da aplicação**
- *[localhost:8000/docs](localhost:8000/docs)* para a documentação da API

### 2. Manual

Caso você queira rodar apenas parte da aplicação ou queira iniciá-la manualmente, comece clonando e abrindo o repositório:

```bash
git clone https://github.com/jayks777/neuroseV2/
cd neuroseV2
```

Vamos começar iniciando o **backend**. Acesse a pasta /backend e instale as dependências.

```bash
cd backend
python3 -m pip install -r requirements.txt
```

Após a instalação, inicie o servidor assíncrono do **Uvicorn** e acesse [localhost:8000/docs](localhost:8000/docs) para visualizar a documentação da API

```bash
uvicorn app:app --reload
```

Agora, em outro terminal vamos iniciar o **frontend** da aplicação. Abra o repositório na pasta /frontend

```bash
cd frontend
```

Agora, baixe e instale as dependências usando o **npm** e após inicie o servidor **vite**. Acesse a interface gráfica da aplicação em [localhost:5173](localhost:5173)

```bash
npm install
npm run dev
```