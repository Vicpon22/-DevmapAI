FROM node:16

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia código da aplicação
COPY . .

# Build da aplicação
RUN npm run build

# Expõe porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
