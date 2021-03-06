# LassWho Mobile App

## Tech Stack

* React Native
* React Navigation 5
* Apollo Client 3 (for data fetching and client side state management)
* TypeScript
* AsyncStorage
* Flipper-ready

## Steps when joining the project

* install node.js, git, yarn, Android Studio, Xcode, Code editor
* clone project: `git clone <git repository url>`
* navigate to cloned project
* install dependencies: `yarn install`

## Environment explanation

At the moment the App only supports one default environment. (.env file) However it is multi-env ready, using [react-native-config](https://github.com/luggit/react-native-config). For more info on how to setup and use multiple environments please check the react-native-config documentation.

## How to run application

* start react native metro bundler (along with codegen watch): `yarn start`
* start iOS with default simulator: `yarn ios`
* start Android with default emulator: `yarn android`
* create Android bundle: `yarn android-bundle`

## Notes

The React Native version we use does not require manual linking of packages (that means manually changing native java, gradle, objective-c files inside /android and /ios folders). However there are packages that are not up-to-date with the current RN automatic linking and still do require running an `npx react-native link <package name>`. It is recommended to try and avoid using these packages but if there's no other alternative they can be safely used. More details about linking can be found [here](https://reactnative.dev/docs/linking-libraries-ios)

## Distributing builds to TestFlight and Google Play

In order to distribute the app to iOS and Android we need to have a Developer account (paid) for both platforms.
More details about what needs to be done can be found in the React Native official Docs:

* Android: [https://reactnative.dev/docs/signed-apk-android](https://reactnative.dev/docs/signed-apk-android)
* iOS: [https://reactnative.dev/docs/publishing-to-app-store](https://reactnative.dev/docs/publishing-to-app-store)
#   L a s s w h o  
 