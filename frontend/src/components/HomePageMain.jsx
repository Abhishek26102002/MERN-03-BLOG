import React, { useEffect, useState } from "react";
import Trending from "./TrendingBox";
import { userPostStore } from "/src/apiStore/UserPostStore.js";
import LatestFour from "./LatestFour";
import LatestSingle from "./LatestSingle";
import TopSixPost from "./TopSixPost";

export default function HomePageMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const [trending, setTrending] = useState([]);
  const [selectedUserPosts, setSelectedUserPosts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  const {
    fetchAllPosts,
    Allposts,
    getuserinfobypostid,
    getpostbycategoryname,
  } = userPostStore();

  useEffect(() => {
    const trendingapi = async () => {
      try {
        const t = await getpostbycategoryname(category[0].data[0]);
        setTrending(t.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    trendingapi();
    fetchAllPosts();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      const usersData = {};
      for (let post of Allposts) {
        if (!usersData[post.createdBy]) {
          try {
            const response = await getuserinfobypostid(post.createdBy);
            const userInfo = response.data[0];
            if (userInfo) {
              usersData[post.createdBy] = userInfo;
            } else {
              console.warn(`No user data found for ID: ${post.createdBy}`);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      }
      setSelectedUserPosts(usersData);
    };

    if (Allposts.length > 0) fetchAuthors();
  }, [Allposts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, Allposts]);

  const loadMorePosts = async () => {
    if (isLoading || isEndReached) return;
    setIsLoading(true);

    try {
      const nextPagePosts = Allposts.slice(
        currentPage * 10,
        (currentPage + 1) * 10
      );
      if (nextPagePosts.length === 0) {
        setIsEndReached(true);
      } else {
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderTopSixPost = (posts) => (
    <TopSixPost getAllPost={posts} selectedUserPosts={selectedUserPosts} />
  );

  const renderTrending = (posts) => (
    <Trending trendingData={posts} category={category} />
  );

  const renderLatest = (posts) => (
    <LatestSingle getAllPost={posts} selectedUserPosts={selectedUserPosts} />
  );

  const renderFour = (posts) => (
    <LatestFour getAllPost={posts} selectedUserPosts={selectedUserPosts} />
  );

  const TopSixPostPosts = Allposts.slice(0, 6);
  const latestPost = Allposts.slice(6, 9);
  const fourPosts = Allposts.slice(9, 13);
  const hasTrending = trending.slice(0, 6);
  const remainingPosts = Allposts.slice(13); // All posts after LatestFour

  const category = [
    {
      data: ["Tech"],
    },
  ];

  return (
    <div>
      <header className="mb-4">
        <h1 className="h1">Blog</h1>
        <p>Stay in the loop with the latest about our products</p>
      </header>

      {Allposts.length === 0 && <p>No blogs yet</p>}
      {TopSixPostPosts.length > 0 && renderTopSixPost(TopSixPostPosts)}

      <div className="container my-5">
        <div className="row">
          {latestPost.length > 0 && (
            <div className="my-4 col-md-8">
              <h2>Latest News</h2>
              {renderLatest(latestPost)}
            </div>
          )}

          {hasTrending && (
            <div className="col-md-4">
              <h2>Trending</h2>
              {renderTrending(hasTrending)}
            </div>
          )}
        </div>

        {fourPosts.length > 0 && (
          <div className="my-4">
            <h2>More Blogs</h2>
            {renderFour(fourPosts)}
          </div>
        )}
        {remainingPosts.length > 0 && (
          <div className="my-6">
            <h2>More Blogs</h2>
            {remainingPosts.map((post, index) => (
              <LatestSingle
                key={post.id || post._id || index} // Fallback to post._id or index
                getAllPost={[post]}
                selectedUserPosts={selectedUserPosts}
              />
            ))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="d-flex justify-content-center my-3">
          <p>Loading more posts...</p>
        </div>
      )}
      {isEndReached && (
        <div className="d-flex justify-content-center my-3">
          <p>You reached the end</p>
        </div>
      )}
    </div>
  );
}
