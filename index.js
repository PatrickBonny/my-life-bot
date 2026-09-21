import { Bot } from "grammy";

// ── Налаштування ──────────────────────────────────────────────────────────────
// Отримай токен у @BotFather: /newbot
// Постав WEBAPP_URL на свій GitHub Pages URL після деплою
const BOT_TOKEN = process.env.BOT_TOKEN || "ВСТАВ_ТОКЕН_ТУТ";
const WEBAPP_URL = process.env.WEBAPP_URL || "https://ТВІЙ_НІКНЕЙМ.github.io/my-life-bot";

const bot = new Bot(BOT_TOKEN);

// ── /start ────────────────────────────────────────────────────────────────────
bot.command("start", async (ctx) => {
  const name = ctx.from?.first_name ?? "";
  await ctx.reply(
    `Привіт${name ? ", " + name : ""}! 👋\n\nВідкрий свою систему управління нижче ↓`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "🗂 Відкрити Мою Систему", web_app: { url: WEBAPP_URL } }],
        ],
        resize_keyboard: true,
        is_persistent: true,
      },
    }
  );
});

// ── /help ─────────────────────────────────────────────────────────────────────
bot.command("help", async (ctx) => {
  await ctx.reply(
    "Натисни кнопку «🗂 Відкрити Мою Систему» внизу.\n\n" +
    "Твої дані зберігаються в хмарі Telegram і синхронізуються на всіх пристроях."
  );
});

// ── Отримання даних з міні-апп ────────────────────────────────────────────────
// Якщо webapp надсилає дані через sendData() — обробляємо тут
bot.on("message:web_app_data", async (ctx) => {
  const data = ctx.message.web_app_data?.data;
  if (data) {
    console.log("Отримано дані з webapp:", data);
    await ctx.reply("✅ Дані збережено!");
  }
});

// ── Запуск ────────────────────────────────────────────────────────────────────
console.log("🤖 Бот запущено...");
bot.start({
  onStart: () => console.log(`✅ Бот активний. Відкрий https://t.me/${(await bot.api.getMe()).username}`),
  drop_pending_updates: true,
}).catch((err) => {
  console.error("Помилка запуску:", err);
  process.exit(1);
});
