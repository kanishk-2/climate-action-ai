# Overview

This is a Climate Action AI application - a comprehensive climate dashboard that combines real-time climate metrics monitoring with AI-powered insights for carbon footprint management and policy recommendations. The application provides tools for carbon footprint calculation, carbon credit optimization, and an AI assistant for climate-related queries. It's built as a full-stack web application with a React frontend and Express backend, designed to help organizations and individuals make data-driven climate action decisions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Chart.js for data visualization and climate metrics display
- **Styling**: Tailwind CSS with custom CSS variables for theming, including climate-specific color palette

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Data Storage**: Currently using in-memory storage (MemStorage) with interface for future database integration
- **API Design**: RESTful API endpoints for climate metrics, carbon calculations, credits, and chat functionality
- **Development**: Hot reload with Vite middleware integration for seamless development experience

## Database Schema
- **Climate Metrics**: Real-time environmental data (CO2 levels, temperature, policy scores)
- **Carbon Calculations**: User-submitted carbon footprint calculations with organization types
- **Carbon Credits**: Credit projects with pricing, impact levels, and descriptions
- **Policy Recommendations**: AI-generated policy suggestions with priority levels and implementation details
- **Chat Messages**: Conversational AI interaction history

## Core Features
- **Climate Dashboard**: Real-time metrics display with interactive charts
- **Carbon Calculator**: Multi-factor carbon footprint calculation tool
- **Credit Optimization**: AI-powered carbon credit allocation recommendations
- **Policy Assistant**: Evidence-based policy recommendation engine
- **AI Chat**: Climate expertise assistant powered by conversational AI

# External Dependencies

## Database & Storage
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect support

## AI Services
- **OpenAI API**: GPT-4o model integration for climate expertise and carbon credit recommendations
- **AI Features**: Climate question answering, carbon credit optimization, policy analysis

## UI & Visualization
- **Radix UI**: Comprehensive component primitives for accessible UI elements
- **Chart.js**: Data visualization library for climate trends and metrics
- **Tailwind CSS**: Utility-first CSS framework with custom climate theme variables

## Development Tools
- **Vite**: Modern build tool with React plugin and development server
- **TypeScript**: Full type safety across client, server, and shared code
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment with runtime error overlay and cartographer plugins

## Session & Forms
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for API requests and responses
- **Date-fns**: Date manipulation utilities for time-series data

## Production Considerations
- The application uses environment variables for database connections and API keys
- Build process generates optimized bundles for both client and server
- Database migrations are managed through Drizzle Kit
- Session management is configured for PostgreSQL storage