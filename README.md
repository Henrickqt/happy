# Proffy

Project for government purposes, serving as a platform that connects childcare institutions with people interested in visiting them.

This project uses [Node.js](https://nodejs.org/en/), [ReactJS](https://reactjs.org/), [ReactNative](https://reactnative.dev/) and [TypeScript](https://www.typescriptlang.org/), and it was developed during the NLW#3 of the [RocketSeat](https://rocketseat.com.br/) team.

![](https://github.com/Henrickqt/happy/blob/master/assets/happy.jpg)

## Server

This API RESTful was created using the following technologies/libraries:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.npmjs.com/package/sqlite3)
- [Multer](https://www.npmjs.com/package/multer)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Yup](https://www.npmjs.com/package/yup)
- [Cors](https://www.npmjs.com/package/cors)

### Run
Run `yarn start` to start the server.

### Run Migrations
Run `yarn typeorm migration:run` to run the migrations.

## Web

This Web App was created using the following technologies/libraries:
- [ReactJS](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start)
- [Leaflet](https://leafletjs.com/)
- [Axios](https://www.npmjs.com/package/axios)

### Run
Run `yarn start` to start the Web App, then navigate to `http://localhost:3000`.

## Mobile

This Mobile App was created using the following technologies/libraries:
- [ReactNative](https://reactnative.dev/)
- [Expo-CLI](https://docs.expo.io/workflow/expo-cli/)
- [Axios](https://github.com/axios/axios)
- [React Navigation](https://reactnavigation.org/)
- [React Native Maps](https://www.npmjs.com/package/react-native-maps)
- [Expo Image Picker](https://docs.expo.io/versions/latest/sdk/imagepicker/)

### Run
To run the App, you need to:
1. Run `yarn global add expo-cli` to install Expo globally.
2. Download the Expo App from PlayStore/AppStore in your smartphone (recommended) **OR** use some emulator.

Run `yarn start` to start the Metro Bundler, then scan the QR-Code in your smartphone.

*Remembering that your smartphone needs to be in the same network as your computer that is running the Metro Bundler.*
