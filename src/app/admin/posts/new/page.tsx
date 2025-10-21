"use client";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UploadButton } from "@/utils/uploadthing";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const { data: categories } = trpc.categories.list.useQuery();
  const createPost = trpc.posts.create.useMutation({
    onSuccess: (data) => {
      if (data.published) {
        toast.success("Post published successfully!");
      } else {
        toast.success("Draft saved successfully!");
      }
      router.push("/admin");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save post");
      setIsPublishing(false);
    },
  });

  const handleSave = (publish: boolean) => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    setIsPublishing(publish);
    createPost.mutate({
      title: title.trim(),
      content: content.trim(),
      featuredImage: featuredImage || undefined,
      categorySlugs: categorySlug ? [categorySlug] : [],
      published: publish,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Blog Platform
              </Link>
              <span className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                New Post
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/admin"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Editor
              </h2>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 rounded-md transition-colors"
              >
                {showPreview ? "← Edit" : "Preview →"}
              </button>
            </div>

            <div className={showPreview ? "hidden lg:block" : ""}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your post title..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  disabled={createPost.isPending}
                />
              </div>

              {/* Featured Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Featured Image
                </label>
                {featuredImage ? (
                  <div className="relative">
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFeaturedImage("");
                        toast.success("Image removed");
                      }}
                      disabled={createPost.isPending}
                      className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 shadow-lg transition-colors disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                          setFeaturedImage(res[0].url);
                          toast.success("Image uploaded successfully!");
                        }
                      }}
                      onUploadError={(error) => {
                        toast.error(`Upload failed: ${error.message}`);
                      }}
                      appearance={{
                        button: "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors ut-ready:bg-blue-600 ut-uploading:bg-blue-700 ut-uploading:cursor-not-allowed",
                        allowedContent: "text-gray-600 dark:text-gray-400 text-sm mt-2"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  disabled={createPost.isPending}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                >
                  <option value="">Select a category (optional)</option>
                  {categories?.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content (Markdown) *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={14}
                  placeholder="Write your post content in Markdown...

**Bold text**
*Italic text*
[Link](https://example.com)
![Image](url)

## Heading 2
### Heading 3

- List item 1
- List item 2"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50"
                  disabled={createPost.isPending}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={createPost.isPending}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {createPost.isPending && !isPublishing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving Draft...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Save as Draft
                    </span>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={createPost.isPending}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {createPost.isPending && isPublishing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Publish Post
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${!showPreview ? "hidden lg:block" : ""}`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Preview
            </h2>
            <article className="prose prose-lg dark:prose-invert max-w-none break-words overflow-hidden">
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={title || "Preview"}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 break-words">
                {title || "Your Post Title"}
              </h1>
              <div className="text-gray-600 dark:text-gray-300 break-words overflow-wrap-anywhere">
                {content ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="break-words overflow-wrap-anywhere">{children}</p>
                      ),
                      code: ({ children }) => (
                        <code className="break-all">{children}</code>
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500 italic">
                    Your markdown content will appear here...
                  </p>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
