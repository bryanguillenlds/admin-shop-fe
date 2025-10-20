## Steps for Dev:

1. Clone Repo
2. Install dependencies
3. Create a .env file based on .env.template
4. Run project with `npm run dev`

### Prerequisites

- Node.js version `^20.19.0 || >=22.12.0`

---

# Admin Shop

Built with modern Vue 3 architecture, demonstrating enterprise-level frontend development practices and patterns.

## 🎯 Project Purpose

This project serves as a comprehensive demonstration of modern Vue.js development, showcasing the implementation of a complete admin panel for an e-commerce platform. The application handles user authentication, role-based access control, and full CRUD operations for product management, providing a real-world example of scalable frontend architecture.

## 🚀 Technology Stack

### Core Technologies

- **Vue 3** - Leveraging the Composition API for better code organization and reusability
- **TypeScript** - Full type safety across the entire application
- **Vite** - Next-generation frontend tooling for blazing-fast development
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### State Management & Data Fetching

- **Pinia** - Modern Vue state management with intuitive Composition API syntax
- **TanStack Query (Vue Query)** - Powerful server state management with built-in caching, refetching, and optimistic updates
- **VueUse** - Collection of essential Vue Composition Utilities (used for localStorage management)

### Form Handling & Validation

- **Vee-Validate** - Declarative form validation framework
- **Yup** - Schema-based validation for complex form structures

### Additional Tools

- **Vue Router** - Official routing solution with navigation guards
- **Axios** - HTTP client with interceptor support
- **Vue Toastification** - User-friendly notification system
- **Vitest** - Fast unit testing framework

## ✨ Key Features Implemented

### Authentication & Authorization

- Complete authentication flow (login, register, logout)
- JWT token management with automatic refresh
- Role-based access control (RBAC) for admin users
- Protected routes with navigation guards
- Persistent authentication state using localStorage

### Product Management

- Full CRUD operations for products
- Image upload and preview functionality
- Advanced form handling with dynamic field arrays
- Pagination for product lists
- Real-time form validation with user feedback

### User Interface

- Responsive design optimized for all devices
- Loading states and error handling
- Toast notifications for user actions
- Smooth page transitions and animations

## 🏗️ Architecture & Design Patterns

### Modular Feature-Based Architecture

The project follows a **feature-based folder structure** where each module (auth, admin, products, shop) contains its own:

- Components
- Views
- Routes
- Actions (API calls)
- Guards
- Stores
- Interfaces

This architecture promotes:

- **High cohesion** within modules
- **Low coupling** between modules
- **Easy scalability** for future features
- **Better code organization** and maintainability

### Actions Pattern

All API interactions are abstracted into **action functions** that:

- Encapsulate business logic
- Provide a single source of truth for API calls
- Enable easy testing and mocking
- Maintain clean separation of concerns

```typescript
// Example: src/modules/products/actions/get-products.action.ts
export const getProductsAction = async (page: number, limit: number) => {
  // Clean, reusable API logic
};
```

### Route Guards for Security

Implemented **navigation guards** to protect routes:

- `isAuthenticatedGuard` - Ensures user is logged in
- `isAdminGuard` - Verifies admin role access
- `isNotAuthGuard` - Redirects authenticated users from auth pages

### Composition API & Composables

Heavy use of Vue 3's Composition API with custom composables:

- `usePagination` - Reusable pagination logic
- Custom form management with Vee-Validate
- Reactive state management with computed properties

### Type Safety

**Comprehensive TypeScript interfaces** for:

- API responses
- User objects
- Product models
- Authentication states
- Route parameters

### State Management Best Practices

- **Pinia stores** using Composition API syntax
- Computed getters for derived state
- Centralized authentication state
- Reactive form state with VueForm

### Server State Management

Utilization of **TanStack Query** for:

- Automatic background refetching
- Cache management
- Optimistic UI updates
- Loading and error states
- Query invalidation and refetching strategies

### Form Validation

Robust form handling with:

- Schema-based validation using Yup
- Field-level and form-level validation
- Custom reusable input components
- Dynamic field arrays for complex forms
- Error message display

### Component Design

- **Presentational vs Container components** separation
- **Reusable component library** (CustomInput, CustomTextArea, ButtonPagination)
- Props validation with TypeScript
- Event emission with proper typing

## 🎓 Frontend Best Practices Demonstrated

1. **Code Organization**: Feature-based modular architecture for scalability
2. **Type Safety**: Full TypeScript implementation with strict type checking
3. **Separation of Concerns**: Clear separation between UI, business logic, and data fetching
4. **Reusability**: Composables and custom hooks for shared logic
5. **Performance**: Lazy-loaded routes and components
6. **Security**: Route guards, token management, and role-based access
7. **User Experience**: Loading states, error handling, and user feedback
8. **Testing Ready**: Vitest configuration for unit and integration tests
9. **Code Quality**: ESLint and Prettier configuration for consistent code style
10. **Modern Tooling**: Vite for fast development and optimized production builds

## 🎯 Learning Outcomes

This project demonstrates proficiency in:

- Modern Vue 3 ecosystem and best practices
- TypeScript for large-scale applications
- State management patterns (both client and server state)
- Advanced form handling and validation
- Authentication and authorization flows
- RESTful API integration
- Responsive UI development
- Code architecture and design patterns
- Frontend security considerations

---

**Note**: This is a portfolio project showcasing modern frontend development practices. It connects to a separate backend API for full functionality.
