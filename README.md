# SEMTEST2
# ShopEZ - Mobile Shopping App

A React Native shopping app built with Expo, Firebase, and Fake Store API. ShopEZ allows users to browse products, add items to cart, and manage their shopping experience with real-time synchronization.

##  Features

- **User Authentication** - Register and login with email/password
- **Product Browsing** - Browse products from Fake Store API with categories
- **Search & Filter** - Search products and filter by categories
- **Shopping Cart** - Add/remove items, manage quantities with real-time sync
- **Offline Persistence** - Cart data persists locally and syncs when online
- **Real-time Updates** - Instant cart updates across devices using Firebase
- **Responsive UI** - Clean, mobile-friendly interface

##  Screens

- **Login Screen** - User authentication
- **Register Screen** - Create new account
- **Product List** - Browse products with search and categories
- **Product Detail** - View product details and add to cart
- **Cart Screen** - Manage cart items and checkout

## Tech Stack

- **Frontend**: React Native, Expo
- **Navigation**: React Navigation Stack
- **Backend**: Firebase (Authentication, Realtime Database)
- **API**: Fake Store API
- **Storage**: AsyncStorage for offline persistence
- **State Management**: React Hooks (useState, useEffect)

## 

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android)
- Firebase account

##  Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd ShopEZ

# Install dependencies
npm install

# Install Expo dependencies
npx expo install @react-navigation/native react-native-screens react-native-safe-area-context react-native-gesture-handler @react-native-async-storage/async-storage

# Install additional packages
npm install @react-navigation/stack firebase