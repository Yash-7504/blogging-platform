"use client";

import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { z } from "zod";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";
import { ConfirmModal } from "@/components/ConfirmModal";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean(),
  categorySlugs: z.array(z.string()),
  featuredImage: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostFormPage() {
  const params = useParams();
  const router = useRouter();
  const isEdit = params.slug !== "new";
  const slug = params.slug as string;
  
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    content: "",
    published: false,
    categorySlugs: [],
    featuredImage: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { data: post, isLoading: postLoading } = trpc.posts.bySlug.useQuery(
    { slug },
    { enabled: isEdit, retry: 1, retryDelay: 1000 }
  );
  
  const { data: categories } = trpc.categories.list.useQuery();
  
  const createPost = trpc.posts.create.useMutation({
    onSuccess: () => {
      toast.success("Post created successfully!");
      router.push("/admin");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });
  
  const updatePost = trpc.posts.update.useMutation({
    onSuccess: () => {
      toast.success("Post updated successfully!");
      router.push("/admin");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
  });
  
  const deletePost = trpc.posts.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      router.push("/admin");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  const categoryList = categories || [];

  useEffect(() => {
    if (isEdit && post) {
      setFormData({
        title: post.title,
        content: post.content,
        published: post.published,
        categorySlugs: post.categories?.map(c => c.slug).filter(Boolean) as string[] || [],
        featuredImage: post.featuredImage || "",
      });
    }
  }, [isEdit, post]);

  if (isEdit && postLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEdit && !postLoading && !post) {
    toast.error("Post not found");
    router.push('/admin');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = postSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      toast.error("Please fix the form errors");
      return;
    }

    if (isEdit && post) {
      updatePost.mutate({ id: post.id, data: result.data });
    } else {
      createPost.mutate(result.data);
    }
  };

  const handleDelete = () => {
    if (!post) return;
    deletePost.mutate({ id: post.id });
  };

  const handleCategoryToggle = (categorySlug: string) => {
    setFormData(prev => {
      const currentCategories = prev.categorySlugs;
      if (currentCategories.includes(categorySlug)) {
        return { ...prev, categorySlugs: currentCategories.filter(s => s !== categorySlug) };
      } else {
        return { ...prev, categorySlugs: [...currentCategories, categorySlug] };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/admin" 
                className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Admin Dashboard
              </Link>
              <span className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                {isEdit ? "Edit Post" : "New Post"}
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                href="/admin" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {isEdit ? `Edit Post: ${post?.title}` : "Create New Post"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Image
              </label>
              {formData.featuredImage ? (
                <div className="relative">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, featuredImage: "" }));
                      toast.success("Image removed");
                    }}
                    className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 shadow-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.url) {
                        setFormData(prev => ({ ...prev, featuredImage: res[0].url }));
                        toast.success("Image uploaded successfully!");
                      }
                    }}
                    onUploadError={(error) => {
                      toast.error(`Upload failed: ${error.message}`);
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content (Markdown)
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2 font-mono"
                placeholder="Write your post content in Markdown..."
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Published Status
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
                <span className="ml-2 text-sm text-gray-900 dark:text-white">Publish this post</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </label>
              <div className="space-y-2">
                {categoryList.map((category) => (
                  <label key={category.slug} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.categorySlugs.includes(category.slug)}
                      onChange={() => handleCategoryToggle(category.slug)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900 dark:text-white">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                disabled={createPost.isPending || updatePost.isPending}
              >
                {createPost.isPending || updatePost.isPending ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
              </button>
              {isEdit && (
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                  disabled={deletePost.isPending}
                >
                  {deletePost.isPending ? "Deleting..." : "Delete Post"}
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
