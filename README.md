# AquaLeanyer Frontend 👋

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=CodeUP-NT-GAMA_aqua-leanyar-frontend&token=3061d11b99f6e74856d72658a8830a9c6db15a90)](https://sonarcloud.io/summary/new_code?id=CodeUP-NT-GAMA_aqua-leanyar-frontend)

# Waterpark React Native App (Expo)

This is a React Native mobile application for a waterpark, built using the [Expo](https://expo.dev/) framework.

## Prerequisites

- Node.js and npm installed ([Download Node.js](https://nodejs.org/))
- Expo CLI installed globally:
  ```bash
  npm install -g expo-cli
  ```
- Expo Go mobile application installed on your smartphone:
   - [Download for Android (Google Play Store)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Download for iOS (Apple App Store)](https://apps.apple.com/app/expo-go/id982107779)

## Environment Configuration

Create a `.env` file in the root directory of the project with the following content:

```env
STRIPE_SECRET_KEY=must be obtained from stripe
```

## Backend Configuration

In the file `src/utils/backend.tsx`, update the `baseURL` to point to your local or remote backend server. For example:

```ts
export const axiosInstance = axios.create({
   baseURL: 'http://localhost:3000/', // Change this to your backend URL
   timeout: 999999,
   headers: {'X-Custom-Header': 'App Calling'}
});
```

## Installation & Execution

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Expo development server:
   ```bash
   npm expo start
   ```

3. Use the Expo Go app on your smartphone to scan the QR code and launch the application.

## Notes

- Make sure your development machine and smartphone are on the same Wi-Fi network for Expo Go to connect properly.

[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=CodeUP-NT-GAMA_aqua-leanyar-frontend)
