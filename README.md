

## Configuração do Projeto

### Requisitos
- Node.js : 20.0.0
- NPM

### Guia de Instalação dos Requisitos

#### Linux or MacOS
```bash
# Instalação do Node.js
sudo apt update
sudo apt install nodejs

# Instalação do NPM
sudo apt install npm

# Verificando a instalação
node -v
npm -v
```

### Windows
```bash
# Instalação do Node.js
https://nodejs.org/en/download/

# Instalação do NPM
Já vem instalado com o Node.js

# Verificando a instalação
node -v
npm -v
```

### Clone o repositório

```bash
# Clone o repositório
git clone https://github.com/GabrielOliveira9400/api_futebol.git

# Entre no diretório do repositório
cd api_futebol
```
## Installation

```bash
#Copia o arquivo .env.example para .env
$ cp .env.example .env

# Install dependencies
$ npm install
```

## Running the app

```bash
npm run build

# Roda o projeto e o banco de dados
docker-compose up --build
```