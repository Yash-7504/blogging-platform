# Multi-User Blogging Platform

A full-stack blogging platform built with Next.js 15, tRPC, Drizzle ORM, and PostgreSQL. This application demonstrates modern web development practices with type-safe APIs and a clean, responsive UI.


## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: tRPC for type-safe APIs
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas
- **State Management**: TanStack Query (via tRPC)
- **Content**: Markdown support with react-markdown

## Getting Started

### Prerequisites

- Node.js 20+ (use `nvm use 20` if you have nvm)
- PostgreSQL database (I used neon db)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgres://username:password@localhost:5432/blog_platform"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_KEY="your-uploadthing-app-key"
   UPLOADTHING_TOKEN="your-uploadthing-token"
   ```

4. **Set up the database**
   ```bash
   # Create a PostgreSQL database
   createdb blog_platform
   
   # Push the schema to the database
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed #this step is optional, the seed.db has sample data for posts and categories
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed database with sample data


## API Structure

The application uses tRPC for type-safe APIs with the following routers:

### Posts Router (`/api/trpc/posts`)
- `list({ category? })` - Get all posts, optionally filtered by category
- `bySlug({ slug })` - Get a single post by slug
- `create(data)` - Create a new post
- `update({ slug, data })` - Update an existing post
- `delete({ slug })` - Delete a post

### Categories Router (`/api/trpc/categories`)
- `list()` - Get all categories
- `bySlug({ slug })` - Get a single category by slug
- `create(data)` - Create a new category
- `update({ slug, data })` - Update an existing category
- `delete({ slug })` - Delete a category

## Database Schema

### Posts Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR, Required)
- `slug` (VARCHAR, Unique, Required)
- `content` (TEXT, Required)
- `status` (ENUM: 'draft' | 'published')
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Categories Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Required)
- `slug` (VARCHAR, Unique, Required)
- `description` (TEXT, Optional)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Posts to Categories (Many-to-Many)
- `postId` (UUID, Foreign Key)
- `categoryId` (UUID, Foreign Key)
- Composite Primary Key

## Usage

### Creating Posts
1. Navigate to `/admin`
2. Click "New Post"
3. Fill in the title, content (Markdown), status, and categories
4. Save the post

### Managing Categories
1. Navigate to `/admin`
2. Switch to the "Categories" tab
3. Click "New Category" to create categories
4. Edit existing categories as needed

### Viewing Posts
- Home page (`/`) shows all published posts
- Filter by category using the category buttons
- Click on any post to view the full content
- Posts support Markdown formatting

