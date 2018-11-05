# AudioVerse Mobile
This is the repository for the next-generation iOS and Android apps for AudioVerse in React Native

AudioVerse is a website dedicated to spreading God's word through free sermon audio and much more. If you would like to learn more about AudioVerse please visit https://audioverse.org

You can download our apps from the [App Store](https://itunes.apple.com/us/app/audioverse/id726998810?mt=8) or [Google Play Store](https://play.google.com/store/apps/details?id=org.audioverse.exodus) or build them yourself using this repository.
We'll be updating the App Stores with this new version as soon as we reach version 1.0. Stay tuned!

<img src="https://github.com/AVORG/audioverse-mobile/blob/master/screenshots/AudioVerse%20App.gif?raw=true">

# How to contribute

### Testing
1. Test the app and report any bugs you find by filing a [GitHub issue](https://github.com/avorg/audioverse-mobile/issues)
2. Request new features that you'd like to see by filing a [GitHub issue](https://github.com/avorg/audioverse-mobile/issues)

### Code
> Note: This guide assumes you have npm and react-native installed locally
1. `git clone` this repo
1. Install dependencies `yarn install` or `npm install`
1. Send an email to technical@audioverse.org to get access to the AudioVerse API
1. Export the following environment variables in your terminal with the values you received in your email `export BASE_URL='VALUE'` and `export BASIC_TOKEN='VALUE'`
1. Link the native dependencies `react-native link`
1. `react-native run-ios` or `react-native run-android`
1. Look in our [GitHub repository](https://github.com/avorg/audioverse-mobile/issues) for issues marked as [Help Wanted]
1. Comment to let people know you're working on it


## TODOs
- [x] Bible
- [x] Download Queue
- [x] Offline support
- [x] My Lists
  - [x] Favorites,
  - [x] History,
  - [x] Downloads,
  - [x] Playlists
- [ ] Login and Signup
- [ ] Video support
- [x] Share
