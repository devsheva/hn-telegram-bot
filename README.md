# hn-telegram-bot

HackerNews Telegram Bot

## Usage

### Development

To develop in local just run `npm run dev` that will start esrun with watch mode, and also `dotenvx` under the hood.

### Build

```npm run build```

### Testing

Put all tests under this [folder](src/__tests__) and run `npm test`, which will run test environment with Vitest in watch mode

### Tips

Use `setMyCommands` on deployment, or configure it directly with @BotFather
This project is made by mainly following BDD principles, so you should stick to it, you won't regret.
