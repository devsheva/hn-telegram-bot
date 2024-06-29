# hn-telegram-bot

HackerNews Telegram Bot

## Usage

### Development

To develop in local just run `npm run dev` that will start esrun with watch mode, and also `dotenvx` under the hood.

### Build

```npm run build```

### Testing

Put all tests under this [folder](src/__tests__) and run `npm test`, which will run test environment with Jest in watch mode

**Important!**  

You should always import jest when you use the global object or it will raise `ReferenceError: jest is not defined.  

Example

```js
// src/__tests__/yourtest.spec.ts
import {jest} from '@jest/globals'
```

### Tips

Use `setMyCommands` on deployment, or configure it directly with @BotFather
