This is a new [**React Native**](https://reactnative.dev) project, bootstrapped
using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Flix Code Challenge task by Serhii Harbovskyi

# Getting Started

> **Note**: Make sure you have completed
> the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)
> instructions

```bash
yarn install
```

For iOS additionally run:

M1/M2 chip

```bash
cd ios/ && arch -x86_64 pod install && cd ../
```

Intell

```bash
cd ios/ && pod install && cd ../
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React
Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_
or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode
respectively.

To run Jest tests:

```bash
yarn test
```

Data Flow diagram:

![flix-code-challenge-data-flow-diagram.png](src%2Fassets%2Fflix-code-challenge-data-flow-diagram.png)
