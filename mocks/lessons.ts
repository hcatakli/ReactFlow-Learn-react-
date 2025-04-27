import { Lesson } from '@/types';

export const lessons: Lesson[] = [
  {
    id: 'intro-to-rn',
    title: 'Introduction to React Native',
    description: "Learn what React Native is and why it is popular for mobile development",
    content: `# Introduction to React Native

React Native is a popular JavaScript framework for building native mobile applications. Created by Facebook (now Meta), it allows developers to use React along with native platform capabilities to build mobile apps.

## Why React Native?

- **Learn once, write anywhere**: Use the same codebase for iOS and Android
- **JavaScript & React**: Leverage your existing web development skills
- **Native Performance**: Direct access to native platform APIs
- **Hot Reloading**: See changes instantly during development
- **Large Community**: Extensive libraries and support

React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.

## How React Native Works

Unlike other cross-platform frameworks that render using WebViews, React Native renders using real native UI components. This means your app will have the look, feel and performance of a native application.

When you write React Native code, the JavaScript runs in a separate thread and communicates with native modules via a "bridge". This architecture allows React Native to be fast while maintaining access to native functionality.`,
    codeExample: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HelloWorld() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});`,
    difficulty: 'beginner',
    duration: 10,
    tags: ['fundamentals', 'introduction'],
    moduleId: 'getting-started'
  },
  {
    id: 'setting-up-environment',
    title: 'Setting Up Your Environment',
    description: 'Configure your development environment for React Native',
    content: `# Setting Up Your Development Environment

Before you can start building React Native apps, you need to set up your development environment. There are two main approaches:

## Using Expo (Recommended for beginners)

Expo is a set of tools built around React Native that helps you develop, build, and deploy React Native apps quickly.

### Steps to set up Expo:

1. Install Node.js (12 or newer)
2. Install Expo CLI:
   \`\`\`
   npm install -g expo-cli
   \`\`\`
3. Create a new project:
   \`\`\`
   expo init MyNewProject
   \`\`\`
4. Start the development server:
   \`\`\`
   cd MyNewProject
   expo start
   \`\`\`
5. Install the Expo Go app on your physical device or set up a simulator/emulator

## Using React Native CLI (For more control)

If you need more control or want to include custom native modules from the start:

1. Install Node.js (12 or newer)
2. Install JDK (for Android)
3. Install Android Studio (for Android) or Xcode (for iOS)
4. Configure environment variables
5. Install React Native CLI:
   \`\`\`
   npm install -g react-native-cli
   \`\`\`
6. Create a new project:
   \`\`\`
   npx react-native init MyNewProject
   \`\`\`
7. Start the development server:
   \`\`\`
   cd MyNewProject
   npx react-native run-android
   # or
   npx react-native run-ios
   \`\`\`

## Choosing an Editor

Visual Studio Code is highly recommended for React Native development. Install these extensions for a better experience:
- React Native Tools
- ESLint
- Prettier
- Color Highlight`,
    difficulty: 'beginner',
    duration: 15,
    tags: ['setup', 'tools'],
    moduleId: 'getting-started'
  },
  {
    id: 'hello-world',
    title: 'Your First React Native App',
    description: 'Create and run a simple Hello World application',
    content: `# Your First React Native App

Let's create a simple "Hello World" app to get familiar with React Native components and structure.

## Project Structure

When you create a new React Native project, you'll see several files and folders:

- **App.js/App.tsx**: The main component of your app
- **package.json**: Lists dependencies and scripts
- **node_modules/**: Contains all installed packages
- **ios/** and **android/**: Native code for each platform
- **index.js**: Entry point for the app

## Creating a Hello World App

Let's look at a simple Hello World component:

\`\`\`jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
\`\`\`

## Running Your App

To run your app:

1. Start the development server:
   \`\`\`
   npm start
   # or
   expo start (if using Expo)
   \`\`\`

2. Run on a device or simulator:
   - Scan the QR code with Expo Go (if using Expo)
   - Press 'a' for Android or 'i' for iOS in the terminal
   - Use \`npx react-native run-android\` or \`npx react-native run-ios\` (if using React Native CLI)

## Making Changes

Try changing the text or styles in your app. With hot reloading, you should see the changes immediately without having to restart the app.`,
    codeExample: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});`,
    difficulty: 'beginner',
    duration: 12,
    tags: ['fundamentals', 'setup'],
    moduleId: 'getting-started'
  },
  {
    id: 'understanding-jsx',
    title: 'Understanding JSX',
    description: 'Learn the JSX syntax used in React Native',
    content: `# Understanding JSX

JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It's used with React and React Native to describe what the UI should look like.

## JSX Basics

JSX allows you to write HTML-like code in your JavaScript:

\`\`\`jsx
const element = <Text>Hello, world!</Text>;
\`\`\`

This is neither a string nor HTML - it's JSX, which gets transformed into JavaScript function calls.

## JSX Rules

1. **All tags must be closed**
   Either with a closing tag (\`<View></View>\`) or self-closing (\`<Image />\`)

2. **Components must return a single root element**
   Everything must be wrapped in a single parent element, usually a \`<View>\`

3. **JavaScript expressions in JSX**
   Use curly braces to embed JavaScript expressions:
   \`\`\`jsx
   <Text>Hello, {user.name}!</Text>
   \`\`\`

4. **Attributes become props**
   HTML attributes are written in camelCase:
   \`\`\`jsx
   <View style={styles.container}>
   \`\`\`

5. **Comments**
   JSX comments are written inside curly braces:
   \`\`\`jsx
   {/* This is a comment */}
   \`\`\`

## Conditional Rendering

You can use JavaScript operators to conditionally render elements:

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  return (
    <View>
      {isLoggedIn 
        ? <Text>Welcome back!</Text>
        : <Text>Please sign in</Text>
      }
    </View>
  );
}
\`\`\`

## Lists in JSX

When rendering lists, each item needs a unique "key" prop:

\`\`\`jsx
const items = ['Apple', 'Banana', 'Orange'];

return (
  <View>
    {items.map((item, index) => (
      <Text key={index}>{item}</Text>
    ))}
  </View>
);
\`\`\`

## JSX vs HTML Differences

- \`class\` becomes \`className\` (though in React Native, you use \`style\` instead)
- \`for\` becomes \`htmlFor\` (rarely used in React Native)
- All attributes are camelCase: \`onclick\` becomes \`onClick\`, \`tabindex\` becomes \`tabIndex\`
- Style is passed as an object, not a string`,
    codeExample: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JSXExample() {
  const name = 'React Native';
  const isNewUser = true;
  const items = ['Components', 'Props', 'State'];

  return (
    <View style={styles.container}>
      {/* Using JavaScript expressions */}
      <Text style={styles.title}>Hello, {name}!</Text>
      
      {/* Conditional rendering */}
      {isNewUser ? (
        <Text style={styles.message}>Welcome to the app!</Text>
      ) : (
        <Text style={styles.message}>Welcome back!</Text>
      )}
      
      {/* Rendering lists */}
      <Text style={styles.subtitle}>Things to learn:</Text>
      <View style={styles.list}>
        {items.map((item, index) => (
          <Text key={index} style={styles.item}>
            • {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    marginBottom: 24,
    color: 'green',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  list: {
    alignSelf: 'stretch',
    paddingLeft: 20,
  },
  item: {
    fontSize: 16,
    marginBottom: 4,
  },
});`,
    difficulty: 'beginner',
    duration: 15,
    tags: ['jsx', 'fundamentals'],
    moduleId: 'getting-started'
  },
  {
    id: 'expo-vs-cli',
    title: 'Expo vs React Native CLI',
    description: 'Understand the differences between Expo and React Native CLI',
    content: `# Expo vs React Native CLI

When starting a new React Native project, you have two main options: Expo or React Native CLI. Each has its advantages and limitations.

## Expo

Expo is a set of tools and services built around React Native that simplifies development.

### Advantages of Expo

1. **Easy Setup**: Get started with minimal configuration
2. **Expo Go App**: Test on physical devices without building native code
3. **Over-the-Air Updates**: Push updates without app store approval
4. **Managed Workflow**: Abstracts away native code complexity
5. **Pre-built Features**: Camera, maps, notifications, etc.
6. **Expo SDK**: Consistent API for accessing device features
7. **Expo Snack**: Online playground for quick prototyping

### Limitations of Expo

1. **Limited Native Module Support**: Can't add custom native modules in managed workflow
2. **Larger App Size**: Includes all Expo libraries
3. **Limited Background Execution**: Some background tasks are restricted
4. **Limited Deep Integration**: Some device features may not be fully accessible

## React Native CLI

The React Native CLI is the official tool for creating and managing React Native projects.

### Advantages of React Native CLI

1. **Full Control**: Direct access to native code
2. **Custom Native Modules**: Add any native module or SDK
3. **Smaller App Size**: Include only what you need
4. **Full Device Integration**: Access all device features
5. **Custom Configurations**: Customize build settings

### Limitations of React Native CLI

1. **Complex Setup**: More configuration required
2. **Platform-Specific Knowledge**: May need iOS/Android expertise
3. **Manual Updates**: No built-in OTA updates
4. **More Maintenance**: Need to manage native dependencies

## When to Choose Each

Choose **Expo** when:
- You're new to React Native
- You want to get started quickly
- Your app doesn't need custom native modules
- You want to iterate rapidly

Choose **React Native CLI** when:
- You need custom native modules
- You need full control over the native code
- You have experience with iOS/Android development
- Your app has specific performance requirements

## Ejecting from Expo

If you start with Expo and later need features only available with React Native CLI, you can "eject" from the managed workflow. This gives you the native code while keeping your JavaScript code intact.`,
    difficulty: 'beginner',
    duration: 15,
    tags: ['tools', 'setup'],
    moduleId: 'getting-started'
  }
];