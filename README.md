# ProdDash - AI-Powered Productivity Dashboard

ProdDash is a modern, AI-enhanced productivity dashboard that helps teams and individuals manage tasks, track analytics, and streamline workflows. Built with React and powered by cutting-edge AI capabilities, it offers seamless integration with payment systems and comprehensive task management features.

## Features

- **Task Management**: Create, update, and track tasks with AI-powered insights
- **Analytics Dashboard**: Real-time productivity metrics and performance analytics
- **User Authentication**: Secure JWT-based authentication system
- **Billing Integration**: Stripe-powered subscription management
- **Responsive Design**: Modern UI built with Tailwind CSS and custom animations
- **API Integration**: Robust API client with rate limiting and error handling
- **Dark Mode Support**: Full dark/light theme switching

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd showcase-nexus-ai-pay-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Start the development server
```bash
npm run dev
```

### Environment Variables

```env
# Backend Configuration
VITE_API_BASE_URL=http://localhost:8000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Database Configuration
DATABASE_URL=sqlite:./data/app.db

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Theme)
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── utils/             # Utility functions and API client
└── assets/            # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Changelog

### [Unreleased] - 2025-10-07

#### Added
- Initial project setup with React + Vite
- User authentication system with login/register pages
- Landing page with pricing tiers and feature showcase
- Comprehensive API client with JWT authentication, rate limiting, and retry logic
- Task management system with full CRUD operations
- Billing integration with Stripe checkout and customer portal
- Analytics dashboard for productivity metrics
- User profile management
- Dark mode support with theme switching
- Responsive design with custom Tailwind CSS configuration
- Task management integration guide documentation
- Environment configuration for development and production

#### Dependencies
- React 18 with Vite for fast development
- Tailwind CSS for styling
- Axios for HTTP requests
- React Hook Form with Zod for form validation
- React Router for navigation
- React Hot Toast for notifications
- Heroicons for UI icons

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@proddash.com or join our Discord community.
