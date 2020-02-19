# AudioVerse Mobile
This is the repository for the next-generation iOS and Android apps for AudioVerse in React Native

AudioVerse is a website dedicated to spreading God's word through free sermon audio and much more. If you would like to learn more about AudioVerse please visit https://audioverse.org

You can download our apps from the [App Store](https://itunes.apple.com/us/app/audioverse/id726998810?mt=8) or [Google Play Store](https://play.google.com/store/apps/details?id=org.audioverse.exodus) or build them yourself using this repository. For Android you can also get the latest version [here](https://github.com/AVORG/audioverse-mobile/releases).

<img src="https://github.com/AVORG/audioverse-mobile/blob/master/screenshots/AudioVerse%20App.gif?raw=true">

# How to contribute

### Testing
1. Test the app and report any bugs you find by filing a [GitHub issue](https://github.com/avorg/audioverse-mobile/issues)
2. Request new features that you'd like to see by filing a [GitHub issue](https://github.com/avorg/audioverse-mobile/issues)

### Code
> Note: This guide assumes you have npm and react-native installed locally
1. `git clone` this repo
1. Install dependencies `yarn install` or `npm install`
1. Setup your [firebase project](https://console.firebase.google.com/) and download the google-services.json and GoogleService-Info.plist to their corresponding folders (android/app for google-services.json and Downloads for GoogleService-Info.plist) [ref](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup)
1. Send an email to technical@audioverse.org to get access to the AudioVerse API
1. Create an .env file with the following variables with the values you received in your email `BASE_URL, BASIC_TOKEN, API_URL, BEARER_TOKEN`
1. For deployment (internal team only) copy the av-upload-key.keystore to android/app
1. `react-native run-ios` or `react-native run-android`
1. Look in our [GitHub repository](https://github.com/avorg/audioverse-mobile/issues) for issues marked as [Help Wanted]
1. Comment to let people know you're working on it
