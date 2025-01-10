# Monetized Server Demo

This project demonstrates the monetization of a Node.js server using a simple React front-end with a make-shift wallet baked in so we can focus on back end functionality.

## Installation

Server is in backend/ directory. App is in frontend/ directory. `npm i` in each.


## Usage

In each backend/ and frontend/ with separate terminals:
```sh
npm run dev
```

Server listens on port 3000, app is at 8090.

## Environment Variables

You need an .env file in the backend directory which looks like this:

```# ./backend/.env
WEATHER_KEY='12341234123412341234423141232431'
PRIVATE_KEY='L1xw4koJ4eThCRPBwbj7p7ZsQYkk8jjP2KWvr3YwPm4hTYJfopZF'
```