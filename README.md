# Aplicativo


Clone o projeto em uma pasta local dentro do C: (não no OneDrive nem no wsl)
```sh
git clone https://github.com/Asdfghc/Aplicativo
```
```sh
cd Aplicativo
```

Instale as dependencias (precisa do npm)
```sh
npm install
```

Inicie o container no docker (precisa do docker)
```sh
docker-compose up -d --build
```

Para rodar o tailwind, abra um novo terminal no vscode e digite 
```sh
 npx @tailwindcss/cli -i ./public/css/style.css -o ./public/css/output.css --watch
```
# 

- Fazer migrations
```docker compose exec express-app npm run migrate```

- Deletar migrations
```docker compose exec express-app npm run drop```
### * Migrations são feitas automaticamente!