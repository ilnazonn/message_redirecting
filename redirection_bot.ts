import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

// Определение интерфейса для конфигурационных параметров
interface Config {
  TOKEN: string;
  SOURCE_CHAT_ID: string;
  DEST_CHAT_ID: string;
}

// Убедитесь, что все необходимые переменные окружения определены
const config: Config = {
    TOKEN: process.env.TOKEN!,
    SOURCE_CHAT_ID: process.env.SOURCE_CHAT_ID!,
    DEST_CHAT_ID: process.env.DEST_CHAT_ID!,


};

// Создаём экземпляр бота
const bot = new TelegramBot(config.TOKEN, { polling: true });

// Множество для хранения уже пересланных ID сообщений
const forwardedMessages = new Set<number>();

// Обработчик входящих сообщений
bot.on('message', (msg) => {
  if (msg.chat.id.toString() === config.SOURCE_CHAT_ID && !forwardedMessages.has(msg.message_id)) {
    // Пересылаем сообщение в другую группу
    bot.forwardMessage(config.DEST_CHAT_ID, msg.chat.id, msg.message_id);
    
    // Добавляем ID сообщения в множество, чтобы не пересылать его повторно
    forwardedMessages.add(msg.message_id);
  }
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.error(error);
});
