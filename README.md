## Carlos Romeu

[@CarlosRomeuBot](https://twitter.com/CarlosRomeuBot) feito com Node.js

#### Arquivo .env
```
D_TOKEN= // Discord token
T_APIKEY= // Twitter API key
T_APISECRET= // Twiter API secret
T_TOKEN= // Twitter token
T_TOKENSECRET= // Twitter secret
```

#### Dependências - package.json
```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  },
  "dependencies": {
    "discord.js": "12.4.1",
    "dotenv": "^10.0.0",
    "twit": "^2.2.11"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}
```

#### localhost
```bash
# instalar dependências
yarn
# rodar em local
yarn dev
```