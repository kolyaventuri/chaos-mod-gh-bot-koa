# Chaos Mod Repo bot
_Issue bot for the [GTA V Chaos Mod](https://github.com/gta-chaos-mod/ChaosModV)_

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
---

# Overview
Handles posting issue comments to inform users of when their effect / feature / bug report might have an issue, or does not follow a template.
ex:
![image](https://user-images.githubusercontent.com/972446/132110453-fdc76886-927d-4709-9693-967d1b837511.png)


# Stack
- Framework
  - [Koa](https://koajs.com/)
- Testing
  - [AVA](https://github.com/avajs/ava) (test runner)
  - [XO](https://github.com/xojs/xo) (code linting) 

# How to use
1) `npm i` to get the dependencies installed
2) Run the local build with `npm run local`! 

# Deploying
1) Generate a personal access token for your GitHub bot user
2) Deploy, push, or otherwise upload the app to your platform / host of choice
3) Ensure your host has `GH_ACCESS_TOKEN` set to your bots personal access token. Either as an uploaded `.env` file, or setting the environment variable directly.
4) Configure `npm run build` as a pre-start / build stage before you start the app
5) Run with `npm start`, preferably with a process manager like [PM2](https://pm2.keymetrics.io/) or PaaS like [Dokku](https://dokku.com/)


*Note*: Alternatively, start the app with `npm run build-and-start` to achieve the same effect

# Q + A
### Why AVA? Why not Jest?
- Personal preference. I find Jest clunky in comparison, but it has its merits. Feel free to swap it out.
### Why use such a strict linter?
- I like clean code, and personally it forces me to write more readable code. The style is automagically enforced by Prettier anyways.
