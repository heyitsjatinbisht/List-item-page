import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from JSONPlaceholder
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl font-bold p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center text-white mb-16 drop-shadow-lg">
          Latest Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-800 hover:text-purple-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {post.body.length > 100
                  ? post.body.slice(0, 100) + "..."
                  : post.body}
              </p>
              <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition-colors">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
