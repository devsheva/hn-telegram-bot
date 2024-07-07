# hn-telegram-bot

HackerNews Telegram Bot

[![CodeFactor](https://www.codefactor.io/repository/github/devsheva/hn-telegram-bot/badge)](https://www.codefactor.io/repository/github/devsheva/hn-telegram-bot)

## Usage

### Development

To develop in local just run `deno task dev` that will start in watch mode.

### Build

```deno task build```

### Testing

Put all tests under this [folder](src/__tests__) and run `deno task test`, which will run test environment with Deno in watch mode

> Note: this is a temporary workaround until conversations plugin is fixed

When running tests on a composer that involves conversation, always add `await new Promise(r => setTimeout(r, 0))`, so it doesn't lead to deno leaks due to sanitizers.

### Tips

Use `setMyCommands` on deployment, or configure it directly with **@BotFather**
This project is made by mainly following BDD principles, so you should stick to it, you won't regret.
