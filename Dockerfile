# Use uma imagem base do Node.js
FROM node:22.13.1

RUN apt-get update && apt-get install -qq -y --no-install-recommends

# Defina a variável de ambiente para o caminho de instalação
ENV INSTALL_PATH /barber-shop-ui

# Crie o diretório de instalação
RUN mkdir -p $INSTALL_PATH

# Defina o diretório de trabalho
WORKDIR $INSTALL_PATH

# Copie os arquivos de dependências (package.json e package-lock.json)
COPY package*.json ./

# Instale as dependências do projeto (usando npm com opção --legacy-peer-deps, se necessário)

RUN npm install -g @angular/cli --save-dev

RUN npm install

#RUN npm install --save-dev @angular-devkit/build-angular


# Copie o restante dos arquivos do projeto para o contêiner
COPY . .

# Defina o comando para rodar o Angular ou outro script, dependendo do seu projeto
CMD ["npm", "start"]
