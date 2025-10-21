"use client";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { z } from "zod";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConfirmModal } from "@/components/ConfirmModal";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryFormPage() {
  const params = useParams();
  const router = useRouter();
  const isEdit = params.slug !== "new";
  const slug = params.slug as string;
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { data: category } = trpc.categories.bySlug.useQuery({ slug }, { enabled: isEdit });
  
  const createCategory = trpc.categories.create.useMutation({
    onSuccess: () => {
      toast.success("Category created successfully!");
      router.push("/admin?tab=categories");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create category");
      setErrors({ submit: error.message });
    },
  });
  
  const updateCategory = trpc.categories.update.useMutation({
    onSuccess: () => {
      toast.success("Category updated successfully!");
      router.push("/admin?tab=categories");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update category");
      setErrors({ submit: error.message });
    },
  });
  
  const deleteCategory = trpc.categories.delete.useMutation({
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      router.push("/admin?tab=categories");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete category");
      setErrors({ submit: error.message });
    },
  });

  useEffect(() => {
    if (isEdit && category) {
      setFormData({
        name: category.name,
        description: category.description || "",
      });
    }
  }, [isEdit, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = categorySchema.safeParse(formData);
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

    if (isEdit) {
      updateCategory.mutate({ slug, data: result.data });
    } else {
      createCategory.mutate(result.data);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    deleteCategory.mutate({ slug });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/admin" 
                className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
              >
                Admin Dashboard
              </Link>
              <span className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                {isEdit ? "Edit Category" : "New Category"}
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <ThemeToggle />
              <Link 
                href="/admin?tab=categories" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                aria-label="Go back to admin dashboard"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Categories
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-colors">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {isEdit ? `Edit Category: ${category?.name}` : "Create New Category"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm p-2"
                placeholder="A brief description of the category..."
              />
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                disabled={createCategory.isPending || updateCategory.isPending}
              >
                {createCategory.isPending || updateCategory.isPending ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
              </button>
              {isEdit && (
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                  disabled={deleteCategory.isPending}
                >
                  {deleteCategory.isPending ? "Deleting..." : "Delete Category"}
                </button>
              )}
            </div>
            {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
          </form>
        </div>
      </main>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
