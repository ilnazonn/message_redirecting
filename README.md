1. Установить Node
2. Установить node-telegram-bot-api, dotenv
npm install dotenv
npm install node-telegram-bot-api
3. Тестировался запуск в Pm2, если не установлен, то установить pm2
npm install pm2@latest -g
4. Собрать проект: tsc -b
5. Создать в папке файл .env с содержимым:
TOKEN=Токен_Вашего_Бота
SOURCE_CHAT_ID=Откуда переотправляем себе
DEST_CHAT_ID=Куда переотправляем себе.
6. Запустить: pm2 start redirection_bot.js --name "redirection_bot" --env .env    
