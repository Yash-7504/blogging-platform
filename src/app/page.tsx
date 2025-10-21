// "use client";
// import Link from "next/link";
// import { trpc } from "@/utils/trpc";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ThemeToggle } from "@/components/theme-toggle";
// import { useState } from "react";

// export default function Home() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const category = searchParams.get("category");
//   const page = Number(searchParams.get("page")) || 1;
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
//   const { data: postsData } = trpc.posts.list.useQuery({ 
//     category: category || undefined,
//     page,
//     limit: 3  // Changed to 3 posts per page (pagination demonstration)
//   });
//   const { data: categories } = trpc.categories.list.useQuery();
  
//   const categoryList = Array.isArray(categories) ? categories : [];
//   const {
//     posts: postList = [],
//     totalPages = 1,
//     currentPage = 1,
//     totalPosts = 0
//   } = postsData || {};

//   const handleCategoryChange = (newCategory: string | null) => {
//     let url = "/";
//     const params = new URLSearchParams();
    
//     if (newCategory) {
//       params.set("category", newCategory);
//     }
//     // Reset to page 1 when changing category
//     params.set("page", "1");
    
//     const queryString = params.toString();
//     if (queryString) {
//       url += `?${queryString}`;
//     }
    
//     // Use scroll: false to keep current position
//     router.push(url, { scroll: false });
//   };

//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams();
    
//     if (category) {
//       params.set("category", category);
//     }
//     params.set("page", newPage.toString());
    
//     const queryString = params.toString();
//     const url = queryString ? `/?${queryString}` : "/";
    
//     // Use scroll: false to prevent jumping to top
//     router.push(url, { scroll: false });
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo/Brand */}
//             <div className="flex items-center">
//               <Link href="/" className="flex items-center space-x-2 group">
//                 <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                 </div>
//                 <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                   Blog Platform
//                 </span>
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-4">
//               <Link 
//                 href="/admin" 
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//               >
//                 Dashboard
//               </Link>
//               <Link 
//                 href="/admin/posts/new" 
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 New Post
//               </Link>
//               <ThemeToggle />
//             </nav>

//             {/* Mobile Menu Button */}
//             <div className="flex md:hidden items-center space-x-2">
//               <ThemeToggle />
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <span className="sr-only">Open menu</span>
//                 {mobileMenuOpen ? (
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 ) : (
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="md:hidden pb-4 space-y-2">
//               <Link 
//                 href="/admin"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
//               >
//                 Dashboard
//               </Link>
//               <Link 
//                 href="/admin/posts/new"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
//               >
//                 <span className="flex items-center">
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                   New Post
//                 </span>
//               </Link>
//             </div>
//           )}
//         </div>
//       </header>

//       <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         {/* Hero Section */}
//         <section className="py-12 sm:py-16 lg:py-24 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
//               Share Your Ideas with the World
//             </h1>
//             <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
//               Discover insights, tutorials, and stories from our community of writers and developers. Join us in creating meaningful content.
//             </p>
//             <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4">
//               <Link
//                 href="/admin/posts/new"
//                 className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
//               >
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//                 Start Writing
//               </Link>
//               <Link
//                 href="/#posts"
//                 className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
//               >
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 Browse Posts
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700">
//           <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             <div className="text-center px-4">
//               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//               </div>
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Writing</h3>
//               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Write and format your posts with Markdown support for a clean, distraction-free experience.</p>
//             </div>
//             <div className="text-center px-4">
//               <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                 </svg>
//               </div>
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Categories</h3>
//               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Organize your content with categories to help readers find related posts easily.</p>
//             </div>
//             <div className="text-center px-4 sm:col-span-2 lg:col-span-1">
//               <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//                 </svg>
//               </div>
//               <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Full Control</h3>
//               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Manage your posts with draft and published states using the admin dashboard.</p>
//             </div>
//           </div>
//         </section>

//         {/* Posts Section */}
//         <section id="posts" className="py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700">
//           {/* Categories Filter */}
//           <div className="mb-6 sm:mb-8">
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
//               <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Browse by Category</h2>
//               <div className="flex flex-wrap gap-2">
//                 <button 
//                   onClick={() => handleCategoryChange(null)}
//                   className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
//                     !category 
//                       ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" 
//                       : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
//                   }`}
//                 >
//                   <span className="mr-1.5">All Posts</span>
//                   <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-md bg-blue-700/20 text-blue-100">
//                     {totalPosts}
//                   </span>
//                 </button>
//                 {categoryList.map((c) => (
//                   <button 
//                     key={c.slug} 
//                     onClick={() => handleCategoryChange(c.slug)}
//                     className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
//                       category === c.slug 
//                         ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" 
//                         : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
//                     }`}
//                   >
//                     {c.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Posts List */}
//           <div className="w-full">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//                 {category ? `${categoryList.find(c => c.slug === category)?.name || category} Posts` : 'All Posts'}
//               </h2>
//               <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
//                 {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
//               </span>
//             </div>
            
//             <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//               {postList.length > 0 ? (
//                 <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                   {postList.map((p) => (
//                     <article key={p.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                       <Link 
//                         href={`/post/${p.slug}`} 
//                         className="block p-4 sm:p-6"
//                       >
//                         <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
//                           <div className="space-y-1.5 sm:space-y-2 flex-1 w-full">
//                             <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">
//                               {p.title}
//                             </h3>
//                             <time 
//                               className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block"
//                               dateTime={new Date(p.createdAt as unknown as string).toISOString()}
//                             >
//                               {new Date(p.createdAt as unknown as string).toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric'
//                               })}
//                             </time>
//                           </div>
//                           <span 
//                             className={`shrink-0 self-start inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                               p.published 
//                                 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
//                                 : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
//                             }`}
//                           >
//                             {p.published ? 'Published' : 'Draft'}
//                           </span>
//                         </div>
//                       </Link>
//                     </article>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center p-8 sm:p-12">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
//                     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
//                   <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md px-4">
//                     {category 
//                       ? `No posts found in the ${categoryList.find(c => c.slug === category)?.name || category} category.` 
//                       : 'No posts have been published yet.'}
//                   </p>
//                 </div>
//               )}

//               {/* Pagination */}
//               {postList.length > 0 && totalPages > 1 && (
//                 <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
//                   <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
//                     <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
//                       Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
//                     </p>
//                     <nav className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handlePageChange(page - 1)}
//                         disabled={page <= 1}
//                         className="relative inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         <svg className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                         <span className="hidden sm:inline">Previous</span>
//                         <span className="sm:hidden">Prev</span>
//                       </button>
//                       <button
//                         onClick={() => handlePageChange(page + 1)}
//                         disabled={page >= totalPages}
//                         className="relative inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                       >
//                         Next
//                         <svg className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                         </svg>
//                       </button>
//                     </nav>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 sm:mt-16 transition-colors">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 sm:gap-8">
//             <div className="max-w-md">
//               <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
//                 Blog Platform
//               </h3>
//               <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
//                 A modern blogging platform built with Next.js, tRPC, and Drizzle. Share your thoughts with the world.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
//                 Quick Links
//               </h3>
//               <ul className="space-y-2 sm:space-y-3">
//                 <li>
//                   <Link href="/admin" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/admin/posts/new" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
//                     Create Post
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/admin/categories/new" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
//                     Add Category
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
//             <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
//               © {new Date().getFullYear()} Blog Platform. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useRouter, useSearchParams } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page")) || 1;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { data: postsData } = trpc.posts.list.useQuery({ 
    category: category || undefined,
    page,
    limit: 3
  });
  const { data: categories } = trpc.categories.list.useQuery();
  
  const categoryList = Array.isArray(categories) ? categories : [];
  const {
    posts: postList = [],
    totalPages = 1,
    currentPage = 1,
    totalPosts = 0
  } = postsData || {};

  const handleCategoryChange = (newCategory: string | null) => {
    let url = "/";
    const params = new URLSearchParams();
    
    if (newCategory) {
      params.set("category", newCategory);
    }
    params.set("page", "1");
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    router.push(url, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    
    if (category) {
      params.set("category", category);
    }
    params.set("page", newPage.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/?${queryString}` : "/";
    
    router.push(url, { scroll: false });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Blog Platform
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/posts/new" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </Link>
              <ThemeToggle />
            </nav>

            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link 
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/posts/new"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Post
                </span>
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <section className="py-12 sm:py-16 lg:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
              Share Your Ideas with the World
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
              Discover insights, tutorials, and stories from our community of writers and developers. Join us in creating meaningful content.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Start Writing
              </Link>
              <Link
                href="/#posts"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Browse Posts
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Writing</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Write and format your posts with Markdown support for a clean, distraction-free experience.</p>
            </div>
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Categories</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Organize your content with categories to help readers find related posts easily.</p>
            </div>
            <div className="text-center px-4 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Full Control</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Manage your posts with draft and published states using the admin dashboard.</p>
            </div>
          </div>
        </section>

        <section id="posts" className="py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-6 sm:mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Browse by Category</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleCategoryChange(null)}
                  className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    !category 
                      ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" 
                      : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <span className="mr-1.5">All Posts</span>
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-md bg-blue-700/20 text-blue-100">
                    {totalPosts}
                  </span>
                </button>
                {categoryList.map((c) => (
                  <button 
                    key={c.slug} 
                    onClick={() => handleCategoryChange(c.slug)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                      category === c.slug 
                        ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" 
                        : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {category ? `${categoryList.find(c => c.slug === category)?.name || category} Posts` : 'All Posts'}
              </h2>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
              </span>
            </div>
            
            <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {postList.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {postList.map((p) => (
                    <article key={p.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <Link 
                        href={`/post/${p.slug}`} 
                        className="block p-4 sm:p-6"
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                          <div className="space-y-1.5 sm:space-y-2 flex-1 w-full">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">
                              {p.title}
                            </h3>
                            <time 
                              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block"
                              dateTime={new Date(p.createdAt as unknown as string).toISOString()}
                            >
                              {new Date(p.createdAt as unknown as string).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                          <span 
                            className={`shrink-0 self-start inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              p.published 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            }`}
                          >
                            {p.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 sm:p-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
                  <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md px-4">
                    {category 
                      ? `No posts found in the ${categoryList.find(c => c.slug === category)?.name || category} category.` 
                      : 'No posts have been published yet.'}
                  </p>
                </div>
              )}

              {postList.length > 0 && totalPages > 1 && (
                <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
                      Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                    </p>
                    <nav className="flex justify-center gap-2">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1}
                        className="relative inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">Prev</span>
                      </button>
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="relative inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                        <svg className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 sm:mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 sm:gap-8">
            <div className="max-w-md">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                Blog Platform
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                A modern blogging platform built with Next.js, tRPC, and Drizzle. Share your thoughts with the world.
              </p>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link href="/admin" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/posts/new" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link href="/admin/categories/new" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Add Category
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Blog Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
