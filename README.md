# Shop App

## Project Description

**Shop App** is the frontend for an online store where users can browse products, add them to their cart, and place orders. Administrators can log in to a dedicated panel to manage product listings. This app seamlessly integrates with the **Shop API** backend.

## Key Features

- **User Features**:
  - Browse products with categories and filters
  - Add items to the cart
  - Place orders
  - User authentication and profile management
- **Admin Features**:
  - Product management: create, edit, or delete items
  - Access to dashboard analytics (planned)

## Technologies

This project uses:

- **React**: version 18.3.1
- **Material-UI (MUI)**: for a responsive and modern UI
- **React Spring**: for animations
- **React Router**: for navigation
- **React JWT**: for token-based authentication
- **React Slick**: for carousels
- **Slick Carousel**: as a supporting library
- **dotenv**: for environment variable management

## System Requirements

- Node.js >= 16.0
- NPM or Yarn package manager

## Setup

1. Clone the repository:
   ```bash
   git clone <repository_URL>
   cd shop-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables: Create a .env file in the project root:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Scripts

- `npm start`: Start the development server
- `npm run build`: Build the app for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## Future Plans

- Implement dashboard analytics for administrators
- Add product reviews and ratings
- Enable payment integration
- Improve accessibility and responsive design
