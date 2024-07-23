import { useTranslation } from "react-i18next";


  const BlogPage = () => {
    const { t } = useTranslation();
  return (
    <div className="p-6 bg-gray-100 min-h-screen Rubik ">
      <header className="flex flex-col md:flex-row md:items-center mb-8">
        <div className="md:w-1/3">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-sm text-gray-700">
           {t("blogd")}
          </p>
        </div>
      </header>
      <main className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Blog Post Title</h2>
          <p className="text-gray-600">A brief excerpt from the blog post that gives an overview of the content...</p>
          <a href="/blog/post-id" className="text-blue-500 hover:underline mt-2 block">Read more</a>
        </article>
        <article className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Another Blog Post Title</h2>
          <p className="text-gray-600">Another brief excerpt from a different blog post...</p>
          <a href="/blog/another-post-id" className="text-blue-500 hover:underline mt-2 block">Read more</a>
        </article>
      </main>
    </div>
  );
};

export default BlogPage;
