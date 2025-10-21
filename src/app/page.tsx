// // "use client";
// // import Link from "next/link";
// // import { trpc } from "@/utils/trpc";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import { ThemeToggle } from "@/components/theme-toggle";
// // import { useState } from "react";

// // export default function Home() {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();
// //   const category = searchParams.get("category");
// //   const page = Number(searchParams.get("page")) || 1;
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
// //   const { data: postsData } = trpc.posts.list.useQuery({ 
// //     category: category || undefined,
// //     page,
// //     limit: 10
// //   });
// //   const { data: categories } = trpc.categories.list.useQuery();
  
// //   const categoryList = Array.isArray(categories) ? categories : [];
// //   const {
// //     posts: postList = [],
// //     totalPages = 1,
// //     currentPage = 1,
// //     totalPosts = 0
// //   } = postsData || {};

// //   const handleCategoryChange = (newCategory: string | null, newPage?: number) => {
// //     const currentPosition = window.scrollY;
    
// //     let url = "/";
// //     const params = new URLSearchParams();
    
// //     if (newCategory) {
// //       params.set("category", newCategory);
// //     }
// //     if (newPage) {
// //       params.set("page", newPage.toString());
// //     }
    
// //     const queryString = params.toString();
// //     if (queryString) {
// //       url += `?${queryString}`;
// //     }
    
// //     router.push(url, { scroll: false });
// //     window.scrollTo(0, currentPosition);
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
// //       {/* Header */}
// //       <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16">
// //             {/* Logo/Brand */}
// //             <div className="flex items-center">
// //               <Link href="/" className="flex items-center space-x-2 group">
// //                 <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
// //                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// //                   </svg>
// //                 </div>
// //                 <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
// //                   Blog Platform
// //                 </span>
// //               </Link>
// //             </div>

// //             {/* Desktop Navigation */}
// //             <nav className="hidden md:flex items-center space-x-4">
// //               <Link 
// //                 href="/admin" 
// //                 className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
// //               >
// //                 Dashboard
// //               </Link>
// //               <Link 
// //                 href="/admin/posts/new" 
// //                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
// //               >
// //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                 </svg>
// //                 New Post
// //               </Link>
// //               <ThemeToggle />
// //             </nav>

// //             {/* Mobile Menu Button */}
// //             <div className="flex md:hidden items-center space-x-2">
// //               <ThemeToggle />
// //               <button
// //                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// //               >
// //                 <span className="sr-only">Open menu</span>
// //                 {mobileMenuOpen ? (
// //                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                   </svg>
// //                 ) : (
// //                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                   </svg>
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Mobile Menu */}
// //           {mobileMenuOpen && (
// //             <div className="md:hidden pb-4 space-y-2">
// //               <Link 
// //                 href="/admin"
// //                 onClick={() => setMobileMenuOpen(false)}
// //                 className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
// //               >
// //                 Dashboard
// //               </Link>
// //               <Link 
// //                 href="/admin/posts/new"
// //                 onClick={() => setMobileMenuOpen(false)}
// //                 className="block px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
// //               >
// //                 <span className="flex items-center">
// //                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                   </svg>
// //                   New Post
// //                 </span>
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </header>

// //       <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
// //         {/* Hero Section */}
// //         <section className="py-12 sm:py-16 lg:py-24 text-center">
// //           <div className="max-w-3xl mx-auto">
// //             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
// //               Share Your Ideas with the World
// //             </h1>
// //             <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed px-4">
// //               Discover insights, tutorials, and stories from our community of writers and developers. Join us in creating meaningful content.
// //             </p>
// //             <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-4">
// //               <Link
// //                 href="/admin/posts/new"
// //                 className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
// //               >
// //                 <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// //                 </svg>
// //                 Start Writing
// //               </Link>
// //               <Link
// //                 href="/#posts"
// //                 className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
// //               >
// //                 <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                 </svg>
// //                 Browse Posts
// //               </Link>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Features Section */}
// //         <section className="py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700">
// //           <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
// //             <div className="text-center px-4">
// //               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
// //                 <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Writing</h3>
// //               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Write and format your posts with Markdown support for a clean, distraction-free experience.</p>
// //             </div>
// //             <div className="text-center px-4">
// //               <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
// //                 <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Categories</h3>
// //               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Organize your content with categories to help readers find related posts easily.</p>
// //             </div>
// //             <div className="text-center px-4 sm:col-span-2 lg:col-span-1">
// //               <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
// //                 <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Full Control</h3>
// //               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Manage your posts with draft and published states using the admin dashboard.</p>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Posts Section */}
// //         <section id="posts" className="py-12 sm:py-16 border-t border-gray-200 dark:border-gray-700">
// //           {/* Categories Filter */}
// //           <div className="mb-6 sm:mb-8">
// //             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
// //               <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Browse by Category</h2>
// //               <div className="flex flex-wrap gap-2">
// //                 <button 
// //                   onClick={() => handleCategoryChange(null)}
// //                   className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
// //                     !category 
// //                       ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" 
// //                       : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
// //                   }`}
// //                 >
// //                   <span className="mr-1.5">All Posts</span>
// //                   <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-medium rounded-md bg-blue-700/20 text-blue-100">
// //                     {totalPosts}
// //                   </span>
// //                 </button>
// //                 {categoryList.map((c) => (
// //                   <button 
// //                     key={c.slug} 
// //                     onClick={() => handleCategoryChange(c.slug)}
// //                     className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
// //                       category === c.slug 
// //                         ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700" 
// //                         : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
// //                     }`}
// //                   >
// //                     {c.name}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Posts List */}
// //           <div className="w-full">
// //             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2">
// //               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
// //                 {category ? `${categoryList.find(c => c.slug === category)?.name || category} Posts` : 'All Posts'}
// //               </h2>
// //               <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
// //                 {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
// //               </span>
// //             </div>
            
// //             <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
// //               {postList.length > 0 ? (
// //                 <div className="divide-y divide-gray-200 dark:divide-gray-700">
// //                   {postList.map((p) => (
// //                     <article key={p.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
// //                       <Link 
// //                         href={`/post/${p.slug}`} 
// //                         className="block p-4 sm:p-6"
// //                       >
// //                         <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
// //                           <div className="space-y-1.5 sm:space-y-2 flex-1 w-full">
// //                             <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">
// //                               {p.title}
// //                             </h3>
// //                             <time 
// //                               className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 block"
// //                               dateTime={new Date(p.createdAt as unknown as string).toISOString()}
// //                             >
// //                               {new Date(p.createdAt as unknown as string).toLocaleDateString('en-US', {
// //                                 year: 'numeric',
// //                                 month: 'long',
// //                                 day: 'numeric'
// //                               })}
// //                             </time>
// //                           </div>
// //                           <span 
// //                             className={`shrink-0 self-start inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //                               p.published 
// //                                 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
// //                                 : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
// //                             }`}
// //                           >
// //                             {p.published ? 'Published' : 'Draft'}
// //                           </span>
// //                         </div>
// //                       </Link>
// //                     </article>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center justify-center p-8 sm:p-12">
// //                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
// //                     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
// //                     </svg>
// //                   </div>
// //                   <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
// //                   <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md px-4">
// //                     {category 
// //                       ? `No posts found in the ${categoryList.find(c => c.slug === category)?.name || category} category.` 
// //                       : 'No posts have been published yet.'}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Pagination */}
// //               {postList.length > 0 && (
// //                 <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
// //                   <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
// //                     <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
// //                       Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
// //                     </p>
// //                     <nav className="flex justify-center gap-2">
// //                       <button
// //                         onClick={() => {
// //                           const newPage = Math.max(1, page - 1);
// //                           const url = new URL(window.location.href);
// //                           url.searchParams.set("page", newPage.toString());
// //                           router.push(url.pathname + url.search, { scroll: false });
// //                         }}
// //                         disabled={page <= 1}
// //                         className="relative inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         <svg className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
// //                           <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
// //                         </svg>
// //                         <span className="hidden sm:inline">Previous</span>
// //                         <span className="sm:hidden">Prev</span>
// //                       </button>
// //                       <button
// //                         onClick={() => {
// //                           const newPage = page + 1;
// //                           const url = new URL(window.location.href);
// //                           url.searchParams.set("page", newPage.toString());
// //                           router.push(url.pathname + url.search, { scroll: false });
// //                         }}
// //                         disabled={page >= totalPages}
// //                         className="relative inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                       >
// //                         Next
// //                         <svg className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
// //                           <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
// //                         </svg>
// //                       </button>
// //                     </nav>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </section>
// //       </main>

// //       {/* Footer */}
// //       <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 sm:mt-16 transition-colors">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
// //           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 sm:gap-8">
// //             <div className="max-w-md">
// //               <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
// //                 Blog Platform
// //               </h3>
// //               <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
// //                 A modern blogging platform built with Next.js, tRPC, and Drizzle. Share your thoughts with the world.
// //               </p>
// //             </div>

// //             <div>
// //               <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
// //                 Quick Links
// //               </h3>
// //               <ul className="space-y-2 sm:space-y-3">
// //                 <li>
// //                   <Link href="/admin" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
// //                     Dashboard
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="/admin/posts/new" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
// //                     Create Post
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="/admin/categories/new" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
// //                     Add Category
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
// //             <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
// //               © {new Date().getFullYear()} Blog Platform. Yash
// //             </p>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

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
//     limit: 3  // Changed to 3 posts per page
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
import { useState, useEffect, Suspense } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSearchParams } from "next/navigation";

function AdminDashboard() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") as "posts" | "categories" | null;
  
  const [activeTab, setActiveTab] = useState<"posts" | "categories">(tabFromUrl || "posts");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPostsPage, setCurrentPostsPage] = useState(1);
  const [currentCategoriesPage, setCurrentCategoriesPage] = useState(1);
  const postsPerPage = 3;
  const categoriesPerPage = 4;
  
  const { data: posts, isLoading: postsLoading } = trpc.posts.listAll.useQuery();
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();
  
  const postList = posts || [];
  const categoryList = categories || [];

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const filteredPosts = postList.filter((post) => {
    if (statusFilter === "published") return post.published;
    if (statusFilter === "draft") return !post.published;
    return true;
  });

  const totalPostsPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPostsPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalCategoriesPages = Math.ceil(categoryList.length / categoriesPerPage);
  const indexOfLastCategory = currentCategoriesPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categoryList.slice(indexOfFirstCategory, indexOfLastCategory);

  const publishedCount = postList.filter(p => p.published).length;
  const draftCount = postList.filter(p => !p.published).length;

  const handleFilterChange = (filter: "all" | "published" | "draft") => {
    setStatusFilter(filter);
    setCurrentPostsPage(1);
  };

  if (postsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center">
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
              >
                Blog Platform
              </Link>
              <span className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                Admin
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                href="/" 
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                aria-label="Go back to blog"
              >
                ← Back to blog
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your blog posts and categories</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <nav className="space-y-2" role="tablist" aria-label="Admin navigation">
              <button
                onClick={() => setActiveTab("posts")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  activeTab === "posts" 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                role="tab"
                aria-selected={activeTab === "posts"}
                aria-controls="posts-panel"
                id="posts-tab"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Posts
                  <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                    activeTab === "posts"
                      ? "bg-blue-700 text-blue-100"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}>
                    {postList.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  activeTab === "categories" 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                role="tab"
                aria-selected={activeTab === "categories"}
                aria-controls="categories-panel"
                id="categories-tab"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Categories
                  <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
                    activeTab === "categories"
                      ? "bg-blue-700 text-blue-100"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}>
                    {categoryList.length}
                  </span>
                </div>
              </button>
            </nav>
          </aside>
          
          <div className="flex-1">
            {activeTab === "posts" && (
              <div role="tabpanel" id="posts-panel" aria-labelledby="posts-tab">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Posts</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Manage your blog posts</p>
                      </div>
                      <Link 
                        href="/admin/posts/new" 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Post
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => handleFilterChange("all")}
                        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          statusFilter === "all"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        All Posts
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          statusFilter === "all" 
                            ? "bg-blue-700 text-blue-100" 
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        }`}>
                          {postList.length}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => handleFilterChange("published")}
                        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          statusFilter === "published"
                            ? "bg-green-600 text-white shadow-sm"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        Published
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          statusFilter === "published" 
                            ? "bg-green-700 text-green-100" 
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        }`}>
                          {publishedCount}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => handleFilterChange("draft")}
                        className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                          statusFilter === "draft"
                            ? "bg-yellow-600 text-white shadow-sm"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        Drafts
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          statusFilter === "draft" 
                            ? "bg-yellow-700 text-yellow-100" 
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        }`}>
                          {draftCount}
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {currentPosts.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {currentPosts.map((post) => (
                            <div key={post.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm dark:hover:shadow-lg transition-all">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">{post.title}</h3>
                                  <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                    <time dateTime={new Date(post.createdAt as unknown as string).toISOString()}>
                                      {new Date(post.createdAt as unknown as string).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </time>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span>Slug: {post.slug}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <span 
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      post.published 
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                    }`}
                                    aria-label={`Post status: ${post.published ? 'published' : 'draft'}`}
                                  >
                                    {post.published ? 'Published' : 'Draft'}
                                  </span>
                                  <Link 
                                    href={`/admin/posts/${post.slug}`}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                  >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {totalPostsPages > 1 && (
                          <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Showing page <span className="font-medium">{currentPostsPage}</span> of <span className="font-medium">{totalPostsPages}</span>
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setCurrentPostsPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPostsPage === 1}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <svg className="mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Previous
                              </button>
                              <button
                                onClick={() => setCurrentPostsPage(prev => Math.min(totalPostsPages, prev + 1))}
                                disabled={currentPostsPage === totalPostsPages}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Next
                                <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No {statusFilter === "all" ? "" : statusFilter} posts found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                          {statusFilter === "draft" 
                            ? "You don't have any draft posts yet."
                            : statusFilter === "published"
                            ? "You haven't published any posts yet."
                            : "Get started by creating your first blog post."}
                        </p>
                        <Link 
                          href="/admin/posts/new" 
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Create your first post
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "categories" && (
              <div role="tabpanel" id="categories-panel" aria-labelledby="categories-tab">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Categories</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Organize your posts with categories</p>
                      </div>
                      <Link 
                        href="/admin/categories/new" 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Category
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {currentCategories.length > 0 ? (
                      <>
                        <div className="space-y-4">
                          {currentCategories.map((category) => (
                            <div key={category.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm dark:hover:shadow-lg transition-all">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{category.name}</h3>
                                  {category.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{category.description}</p>
                                  )}
                                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span>Slug: {category.slug}</span>
                                  </div>
                                </div>
                                <Link 
                                  href={`/admin/categories/${category.slug}`}
                                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>

                        {totalCategoriesPages > 1 && (
                          <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Showing page <span className="font-medium">{currentCategoriesPage}</span> of <span className="font-medium">{totalCategoriesPages}</span>
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setCurrentCategoriesPage(prev => Math.max(1, prev - 1))}
                                disabled={currentCategoriesPage === 1}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <svg className="mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Previous
                              </button>
                              <button
                                onClick={() => setCurrentCategoriesPage(prev => Math.min(totalCategoriesPages, prev + 1))}
                                disabled={currentCategoriesPage === totalCategoriesPages}
                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Next
                                <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No categories yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Create categories to organize your posts.</p>
                        <Link 
                          href="/admin/categories/new" 
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Create your first category
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <AdminDashboard />
    </Suspense>
  );
}
