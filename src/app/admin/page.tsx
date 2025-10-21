"use client";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useState, useEffect, Suspense } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSearchParams } from "next/navigation";

function AdminDashboardContent() {
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
                            ? "You do not have any draft posts yet."
                            : statusFilter === "published"
                            ? "You have not published any posts yet."
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
        <div className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}
