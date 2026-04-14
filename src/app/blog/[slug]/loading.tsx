export default function BlogSlugLoading() {
  return (
    <div>
      {/* Header Skeleton */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="h-8 w-32 bg-blue-400 rounded mb-4 animate-pulse"></div>
            <div className="h-12 w-full bg-blue-400 rounded animate-pulse"></div>
            <div className="h-6 w-2/3 bg-blue-400 rounded mt-4 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>

              <div className="h-32 bg-gray-200 rounded animate-pulse my-6"></div>

              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>

              <div className="h-40 bg-gray-200 rounded animate-pulse my-6"></div>

              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card">
                <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="card">
                <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse mb-4"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
