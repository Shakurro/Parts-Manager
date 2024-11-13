# Verwende ein Node.js-Image als Basis
FROM node:18

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Projekts
COPY . .

# Baue das Nuxt-Projekt
RUN npm run build

# Exponiere den Port, auf dem die App läuft
EXPOSE 3000

# Starte die Nuxt-App im Produktionsmodus
CMD ["npm", "run", "start"]