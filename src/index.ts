import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN!;
const bot = new TelegramBot(token, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hey! I'm your bot.");
});

// Handle /fact command
bot.onText(/\/fact/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
    const data = await response.json();
    bot.sendMessage(chatId, data.text);
  } catch (error) {
    bot.sendMessage(chatId, "Sorry, I couldn't fetch a fact right now.");
  }
});

// Handle regular messages
bot.on("message", (msg) => {
  if (msg.text?.startsWith("/")) return; // Skip commands

  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Echo: ${msg.text}`);
});
