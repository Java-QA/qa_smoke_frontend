# WishList Frontend Application

This is a React-based frontend application for managing wishlists and gifts. The application allows users to create wishlists, add gifts to them, and manage gift reservations.

## Features

- User authentication (login/register)
- Create and manage wishlists
- Add, edit, and delete gifts
- Reserve gifts
- Responsive design using Bootstrap
- Docker support

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (optional)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your backend API URL:
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Development

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Building for Production

To build the application:

```bash
npm run build
```

## Docker

To build and run the application using Docker:

1. Build the image:
```bash
docker build -t wishlist-frontend .
```

2. Run the container:
```bash
docker run -p 80:80 -e REACT_APP_API_URL=http://your-backend-url/api wishlist-frontend
```

The application will be available at `http://localhost`.

## Project Structure

- `/src/components` - Reusable React components
- `/src/pages` - Page components
- `/src/services` - API services
- `/src/types` - TypeScript interfaces and types
- `/src/utils` - Utility functions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
