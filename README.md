# hn-telegram-bot

![develop](https://github.com/devsheva/hn-telegram-bot/actions/workflows/deploy.yml/badge.svg?branch=develop)
[![codecov](https://codecov.io/gh/devsheva/hn-telegram-bot/branch/develop/graph/badge.svg?token=KTAGSPACY1)](https://codecov.io/gh/devsheva/hn-telegram-bot)

HackerNews Telegram Bot

## Usage

### Development

To develop in local just run `deno task dev` that will start in watch mode.
To update the changelog just run `git-cliff -o CHANGELOG.md`.

### Testing

**Pass the necessary environment variables to run against test mode!**

- APP_ENV=test
- SUPABASE_KEY=your_key
- SUPABASE_SCHEMA=test
- SUPABASE_URL=your_url

Put all tests under this [folder](src/__tests__) and run `deno task test`, which will run test environment with Deno in watch mode

> Note: this is a temporary workaround until conversations plugin is fixed

When running tests on a composer that involves conversation, always add `await new Promise(r => setTimeout(r, 0))`, so it doesn't lead to
deno leaks due to sanitizers.

### Tips

Use `setMyCommands` on deployment, or configure it directly with **@BotFather**
This project is made by mainly following BDD principles, so you should stick to it, you won't regret.

## Deployment

It's handled with GitHub Actions, with two [workflows](.github/workflows/):

- **deploy.yml**
  - 3 jobs: test, coverage, deploy
- **update.yml**: external GH Action that acts like dependabot but for deno
