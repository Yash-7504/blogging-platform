import { db, posts, categories, postsToCategories } from "../src/server/db";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data (ignore errors if tables don't exist)
  try {
    await db.delete(postsToCategories);
    await db.delete(posts);
    await db.delete(categories);
  } catch (error) {
    console.log("Tables don't exist yet, will create them...");
  }

  // Insert categories
  const [designCategory, techCategory, businessCategory] = await db
    .insert(categories)
    .values([
      {
        name: "Design",
        slug: "design",
        description: "UI/UX design and visual design topics",
      },
      {
        name: "Technology",
        slug: "technology", 
        description: "Programming, software development, and tech trends",
      },
      {
        name: "Business",
        slug: "business",
        description: "Business strategy, entrepreneurship, and management",
      },
    ])
    .returning();

  // Insert posts
  const [post1, post2, post3] = await db
    .insert(posts)
    .values([
      {
        title: "Getting Started with Next.js 15",
        slug: "getting-started-with-nextjs-15",
        content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements to the React framework. In this post, we'll explore the key changes and how to get started.

## What's New in Next.js 15

- **App Router**: The new App Router provides a more intuitive way to structure your applications
- **Server Components**: Better performance with server-side rendering
- **Turbopack**: Faster builds and development experience

## Getting Started

To create a new Next.js 15 project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will start your development server on http://localhost:3000.

## Conclusion

Next.js 15 continues to push the boundaries of what's possible with React applications. The new features make it easier than ever to build fast, scalable web applications.`,
        published: true,
      },
      {
        title: "Design Systems: Building Consistent UIs",
        slug: "design-systems-building-consistent-uis",
        content: `# Design Systems: Building Consistent UIs

A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.

## Why Design Systems Matter

Design systems help teams:
- **Consistency**: Ensure visual and functional consistency across products
- **Efficiency**: Reduce design and development time
- **Scalability**: Make it easier to scale design across teams
- **Quality**: Improve overall product quality

## Key Components

A typical design system includes:

1. **Design Tokens**: Colors, typography, spacing values
2. **Components**: Reusable UI elements
3. **Patterns**: Common interaction patterns
4. **Guidelines**: Usage instructions and best practices

## Getting Started

Start small with your most commonly used components and gradually expand your system. Focus on consistency and clear documentation.`,
        published: true,
      },
      {
        title: "The Future of Remote Work",
        slug: "future-of-remote-work",
        content: `# The Future of Remote Work

Remote work has transformed from a temporary solution to a permanent fixture in the modern workplace. Let's explore what the future holds.

## Current Trends

- **Hybrid Models**: Many companies are adopting flexible hybrid arrangements
- **Digital Tools**: Advanced collaboration tools are becoming essential
- **Work-Life Balance**: Employees are prioritizing flexibility and work-life balance

## Challenges and Solutions

### Communication
- Use async communication tools effectively
- Establish clear communication protocols
- Regular check-ins and team meetings

### Productivity
- Create dedicated workspaces
- Use time management techniques
- Leverage productivity tools

## Looking Ahead

The future of remote work will likely involve:
- More sophisticated virtual collaboration tools
- Better work-life integration
- Continued focus on employee well-being

Remote work isn't just a trend—it's a fundamental shift in how we think about work and productivity.`,
        published: false,
      },
    ])
    .returning();

  // Link posts to categories
  await db.insert(postsToCategories).values([
    { postId: post1.id, categoryId: techCategory.id },
    { postId: post2.id, categoryId: designCategory.id },
    { postId: post3.id, categoryId: businessCategory.id },
    { postId: post1.id, categoryId: techCategory.id }, // Tech post also in tech category
  ]);

  console.log("Database seeded successfully!");
  console.log(`Created ${[designCategory, techCategory, businessCategory].length} categories and ${[post1, post2, post3].length} posts`);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
