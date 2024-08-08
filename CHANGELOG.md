# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0-alpha.1] - 2024-08-08

### 🚀 Features

- *(analysis)* Send message to user
- Add daily analysis cron job
- *(supabase)* Add test schema support
- Add supabase as storage for preferences
- *(analysis)* Respond with filtered story titles based on user preferences
- *(gemini-adapter)* Add responseSchema for storyIds
- *(gemini-adapter)* Replace with v1beta API and add responseMimeType on config
- *(gemini-adapter)* Implement generateContent call with response parsing
- Add changelog
- Deploy workflow
- Validate Item schema
- [**breaking**] Complete deno migration by fixing last tests
- Add list preferences cmd
- [**breaking**] Replace jest with vitest cause of esm troubles
- Reset preferences and fix convo loop
- Store preferences in session with conversations
- Ask for preference
- Determine session adapter in bot setup
- Get storage adapter for env
- Remove axios to use builtin fetch API
- Get 500 top stories

### 🐛 Bug Fixes

- Ignore any type lint error
- *(utils)* Type generic supabaseAdapter
- Correctly type users preferences group
- *(config)* Restore test task arg when setting env
- Add missing test variables for coverage
- Remove env leaking log
- Change root to cwd
- Import new types in bot.ts
- Adapt for deno deploy
- Use test flag on test task to retrieve right env file
- Remove overkilling functions and declare adapters inside always condition
- Disable noEmit during build
- Add ESM support for jest
- Remove ts-node and use tsx with watch mode

### 🚜 Refactor

- *(analysis)* Import bot dynamically
- *(gemini-adapter)* Simplify body object gen
- Improve env loading with zod
- [**breaking**] Move types in a single declaration file
- Add generic slashCommand generator

### 📚 Documentation

- Update changelog
- Update changelog
- Add instructions to run tests with test schema
- Force env variable setup
- Removed setMyCommands tip since an issue has been opened for it(#13)
- Fix typo on README
- Sort commits by newest for git-cliff
- Prioritize testing over styling in changelog
- Update changelog
- Add deployment section
- Move codefactor badge on top
- Add codefactor badge
- Add todo for clear preferences and update readme with BDD tips
- Update readme with right usage of jest object
- Add setMyCommands usage tip
- Add testing guideline
- Update README with test instructions
- Add usage instructions

### 🧪 Testing

- Disable any lint
- *(helpers)* Cleanup database sessions
- *(analysis)* Add promisify factory with item mocks
- Stub global fetch
- [**breaking**] Fix specs adapting to vitest
- It responds to setup command
- Add type checkers
- Add faker and mock array of top stories
- Should return null for not found item
- Mock getItem api
- Add watch flag

### 🎨 Styling

- Remove unused no-explicit-any in spec
- Set editor.tabSize on 2
- Underscore file names
- Fix fmt of api.ts
- Add develop codefactor
- Add newline on heading

### ⚙️ Miscellaneous Tasks

- Add closed pull request trigger to deploy workflow
- Remove dependabot 
- Add dependabot
- Skip dailyAnalysis  in test suite
- Update deno test command to remove watch flag
- Update deploy dev actions with supabase variables
- Update config.ts to load environment variables with export option
- *(analysis)* Parse user preferences and filter their stories
- Correctly type all parts using ramda
- Add deno check task to improve code quality
- *(types)* Type getUserPreferences
- *(ramda)* Add @types/ramda
- Remove any type from custom schemas in utils.ts
- Upgrade @std/testing to major 1
- Fix supabase deps
- Upgrade deno to 1.45.4 and include unstable cron
- *(analysis)* Get users preferences and seed db
- Add supabase secrets
- *(supabase)* Add db types and client connection
- Update changelog
- *(utils)* Add mapIndexed fn
- *(analysis)* Add error tests todo for __bulkRetrieveItems__
- *(analysis)* Bulk retrieve top stories as items with parallel requests
- *(gemini-adapter)* Add body builder function
- *(ai-adapter)* Add body call signature
- *(ai-adapter)* Add buildBody method
- *(gemini-adapter)* Init apiKey and baseUrl
- *(ai-adapter)* Rename text to input as generateContent param
- *(ai-adapter)* Init base adapter
- Upgrade deno to 1.45.1
- *(analysis)* Init folder structure
- *(gemini-response)* Add zod types for request and response schema of `generateContent` api
- Point ramda package to deno instead of nest
- AllowBreaking on updater
- Add format and lint job
- Ignore any lint in specs
- Cache dependencies during test
- Upgrade grammy to 1.27 with latest types
- Reignore .env.test
- Upgrade packages
- Manual update workflow
- Add update workflow
- Add codecov
- Add test job dependency
- Do not ignore .env test
- Add zod package
- Add coverage task
- Add recommended deno ext
- [**breaking**] Add grammy from deno
- [**breaking**] Add faker deno module
- [**breaking**] Add ramda external dep
- [**breaking**] Add deno and remove type definitions and tsconfig
- Add dependabot
- Upgrade dotenvx to major 1
- [**breaking**] Remove export of bot and use bot.ts as entrypoint
- Upgrade typescript npm
- Upgrade grammy
- Add todo on mocking api calls
- Upgrade grammy
- Init conversation plugin
- Remove some types and cleanup config
- Init setup composer
- [**breaking**] Use bot.ts as entrypoint
- Init grammy bot
- Replace telegraf with grammY
- Add tsconfig.build for excluding specs on compilation
- Remove error test
- Improve item typing for req
- Config jest to match only __tests__ folder
- Config jest for ts and move to src folder
- Move env declaration at root
- Add support of dotenvx
- Add build script for npm to run tsc
- Extend ProcessEnv of node with BOT_TOKEN
- Init project

### Deno

- Update imports
- Update imports

<!-- generated by git-cliff -->
