# User Auth App

A React Native mobile application for user authentication with user info storage, persistent login, and a modern UI.

**React Native Version:** 0.82.1

## 🏗️ Project Structure

```
UserAuthApp/
├── src/
│   ├── assets/              # SVG icons and assets
│   ├── colorStore/          # Color theme configuration
│   ├── components/          # Reusable UI components
│   │   ├── InfoContainer.js
│   │   ├── InputContainer.js
│   │   ├── Loading.js
│   │   ├── NavigationHandler.js
│   │   ├── PageContainer.js
│   │   └── SubmitButton.js
│   ├── context/             # React Context for state management
│   │   └── AuthContext.js
│   ├── helper/              # Utility functions
│   │   ├── Toast.js
│   │   └── UserHelper.js
│   ├── screens/             # App screens
│   │   ├── LoginScreen.js
│   │   ├── SignUpScreen.js
│   │   └── MainScreen.js
│   └── storage/             # AsyncStorage utilities
│       └── InfoStore.js
├── android/                 # Android native code
├── ios/                     # iOS native code
└── App.js                   # Root component
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20
- **Java Development Kit (JDK) 17** or later (required for Android builds)
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **CocoaPods** (for iOS dependencies)

### Installing Java 17 (Required for Android)

If you don't have Java 17 installed:

**macOS:**
```bash
brew install openjdk@17
```

Then add to your `~/.zshrc` or `~/.bashrc`:
```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="$JAVA_HOME/bin:$PATH"
```

Reload your shell:
```bash
source ~/.zshrc  # or source ~/.bashrc
```

Verify installation:
```bash
java -version  # Should show version 17 or later
```

## 🚀 Setup Instructions

### Step 1: Install Dependencies

Install all npm packages and iOS CocoaPods:

```bash
./AppInit
```

> **Note**: If you get a permission error, run:
> ```bash
> chmod +x AppInit
> ```

This script will:
- Install all npm dependencies
- Install iOS CocoaPods dependencies

### Step 2: Start Metro Bundler

Start the Metro bundler in one terminal:

```bash
npm start
# or
yarn start
```

### Step 3: Run the App

#### For Android

**Important**: Make sure you have Java 17 configured (see Prerequisites above).

```bash
npm run android
# or
yarn android
```

#### For iOS

If you need to manually install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

Then run:

```bash
npm run ios
# or
yarn ios
```

## 🎨 App Flow

1. **App Launch**: 
   - Shows loading screen while checking AsyncStorage
   - If user exists → Navigate to Main screen
   - If no user → Navigate to Login screen

2. **Registration Flow**:
   - User enters name, email, password, and confirm password
   - Real-time validation with inline error messages
   - Checks for duplicate emails
   - Passwords must match
   - On success → Navigate to Login screen

3. **Login Flow**:
   - User enters email and password
   - Validates credentials against stored users
   - On success → Save session and navigate to Main screen

4. **Main Screen**:
   - Displays user information (name, email, login time, sign up time)
   - Logout button with confirmation dialog


## 📱 Screens

### Login Screen
- Email input
- Password input with visibility toggle
- Login button (disabled when fields are empty)
- Link to Sign Up screen

### Sign Up Screen
- Name input
- Email input
- Password input with visibility toggle
- Confirm password input
- Sign Up button (disabled when any field is empty)
- Link to Login screen

### Main Screen
- Welcome message with user's name
- User information display:
  - Name
  - Email
  - Login Time (formatted)
  - Sign Up Time (formatted)
- Logout button with confirmation

## 🛠️ Troubleshooting

### Gradle JVM Error

If you see "Gradle requires JVM 17 or later":
1. Install Java 17 (see Prerequisites)
2. Set JAVA_HOME environment variable
3. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

### Metro Bundler Issues

If Metro bundler has issues:
```bash
npm start -- --reset-cache
```

### iOS Build Issues

If you encounter CocoaPods issues:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Build Issues

If Android build fails:
```bash
cd android
./gradlew clean
cd ..
npm run android
```
