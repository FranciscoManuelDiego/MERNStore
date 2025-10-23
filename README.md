# 🛒 MERN Store - Next.js E-commerce Application

A full-stack e-commerce application built with Next.js 15, React 19, TypeScript, MongoDB, and Tailwind CSS. This modern web application provides a complete shopping experience with user authentication, product management, and cart functionality.

## 🌟 Features

### 🔐 Authentication System
- **User Registration & Login**: Secure JWT-based authentication
- **Protected Routes**: Middleware protection for sensitive pages
- **Profile Management**: Update user information, email, password, phone, and address
- **Session Management**: Persistent login with HTTP-only cookies

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse products by categories
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add, remove, and manage cart items
- **Order Processing**: Complete checkout flow with order creation
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🎨 User Interface
- **Modern Design**: Clean and intuitive user interface
- **Image Carousel**: Product showcase with react-responsive-carousel
- **Interactive Components**: Dynamic cart widget and navigation
- **Loading States**: Smooth loading experiences

## 🚀 Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features and hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Beautiful icon library
- **React Responsive Carousel**: Image carousel component

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing and validation

### Development Tools
- **ESLint**: Code linting and formatting
- **Turbopack**: Fast bundler for development
- **TypeScript**: Static type checking

## 📁 Project Structure

```
nextjs-app/
├── public/                     # Static assets
│   ├── carousel/              # Carousel images
│   └── *.svg                  # Icon files
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── products/     # Product management
│   │   │   ├── health/       # Informatio about deployment status.
│   │   │   └── orders/       # Order processing
│   │   ├── Cart/             # Cart page
│   │   ├── categories/       # Category pages
│   │   ├── Item/             # Product detail pages
│   │   ├── lib/              # Utility libraries
│   │   ├── login/            # Login page
│   │   ├── profile/          # User profile page
│   │   └── register/         # Registration page
│   ├── components/           # Reusable React components
│   │   ├── Auth/             # Authentication components
│   │   ├── Cart/             # Cart-related components
│   │   ├── Item/             # Product components
│   │   ├── Navbar/           # Navigation components
│   │   └── User/             # User-related components
│   ├── context/              # React Context providers
│   │   ├── AuthContext.jsx   # Authentication state
│   │   └── CartContext.jsx   # Shopping cart state
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Authentication hook
│   │   ├── useCart.ts        # Cart management hook
│   │   └── useProducts.ts    # Product fetching hook
│   ├── models/               # MongoDB schemas
│   │   ├── Product.ts        # Product model
│   │   ├── User.ts           # User model
│   │   └── Cart.ts           # Cart model
│   ├── styles/               # Styling files
│   │   ├── components.css    # Component styles
│   │   └── styleClasses.js   # Reusable style classes
│   └── utils/                # Utility functions
│       └── localStorage.js   # Safe localStorage wrapper
├── middleware.ts             # Route protection middleware
└── Configuration files...
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account or local MongoDB installation
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd nextjs-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name

# JWT Secret (Use a strong, unique secret in production)
JWT_SECRET=your-super-secret-jwt-key

# Environment
NODE_ENV=development

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Database Setup
Ensure your MongoDB database is running and accessible. The application will automatically create the necessary collections.

### 5. Run the Application
```bash
# Development mode with Turbopack
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

The application will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/profile/email` - Update email
- `PUT /api/auth/profile/password` - Update password
- `PUT /api/auth/profile/phone` - Update phone
- `PUT /api/auth/profile/address` - Update address
- `POST /api/auth/validate` - Validate JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID

### Orders
- `POST /api/orders` - Create new order

## 🎯 Key Features Explained

### Authentication Flow
1. **Registration**: Users create accounts with email/password
2. **Login**: JWT token stored in HTTP-only cookie
3. **Protection**: Middleware validates tokens for protected routes
4. **Profile**: Users can update their information

### Shopping Cart
- **Local Storage**: Cart persists across browser sessions
- **Context API**: Global cart state management
- **Real-time Updates**: Immediate UI updates for cart changes
- **Checkout**: Order creation with user authentication

### Product Management
- **Dynamic Routing**: Category and product detail pages
- **Image Display**: Optimized image loading
- **Responsive Design**: Mobile-friendly product layouts

## 🔧 Configuration

### Middleware Protection
Protected routes require authentication:
- `/Cart/*` - Shopping cart pages
- `/profile/*` - User profile pages

### Custom Styles
The application uses a combination of:
- **Tailwind CSS**: Utility classes for rapid development
- **Custom CSS**: Component-specific styles in `styles/components.css`
- **Style Classes**: Reusable style objects in `styles/styleClasses.js`

##  Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Ensure all environment variables are properly set:
- Use a strong `JWT_SECRET`
- Update `MONGODB_URI` to production database
- Set `NODE_ENV=production`

### Deployment Platforms
This application can be deployed on:
- **Vercel** (Recommended for Next.js)


### Development Tips
- Use `npm run dev` for development with hot reload
- Check browser console for client-side errors
- Monitor server console for API errors
- Use MongoDB Compass for database debugging

## 👨‍💻 Author

**FranDiego**
- GitHub: https://github.com/FranciscoManuelDiego
- Email: franddiego@gmail.com


Built with ❤️ using Next.js and modern web technologies.
