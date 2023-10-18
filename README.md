# EMPLOYEE MANAGEMENT

## Prerequisites

- [Node.js > 14](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode](https://developer.apple.com/xcode)
- [Cocoapods](https://cocoapods.org)
- [JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [RUBY](https://www.ruby-lang.org/en/documentation/installation/)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [fetch](https://reactnative.dev/docs/network) for networking.
- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.
- [npm](https://npm.com)

## Installation

- make sure you are using node 14
- run npm install
- cd ios
- run pod repo update
- run pod install

### Usage

Setup for android is the following

- Run a npm install in the root of your project
- Run npx react-native run-android to start your project

Setup for IOS is the following

- Run a npm install in the root of your project
- Run a pod install
- Run npx react-native run-ios

## Setup environments

- Environment can be changed by modifying the base url located in src/constant/ServicePath.ts

#### Android

Generating a unsigned apk consists of the following steps

- 1.  Create assets folder in android/app/src/main/assets
- 2.  npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
- 3.  cd android
- 4.  ./gradlew assembleDebug

## Styleguide

For coding styling, we decided to go with ESLint and [React Native community's styleguide](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community#readme).

## Components

Components are the basic blocks of a react native application, but since we​​ aim to minimize development complexity, all the components are at the same nesting level.

## Redux

Once the components are defined, they are tied to the management of information through the application. For this, Redux is implemented with the store-reducer-action structure as usual, however, not only the data is handled through the actions but the success and error responses are also defined by the same form.

## Screens

In this folder, you have the main objects to apply the composition architecture. Just create a file for each screen you have in your application, call all the components and static resources you need to render the scene and finally use the corresponding hooks to interact with redux and create behaviors depending on the store.
