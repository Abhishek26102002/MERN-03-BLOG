import React from "react";

const TrendingBox = ({ trendingData, category }) => {
  return (
    <div
      className="p-3"
      style={{ background: "#F8D06A", borderRadius: "10px" }}
    >
      <h2 className="text-dark ms-1">Trending in {category[0].data}</h2>
      <ul className="list-unstyled mt-3">
        {trendingData.map((post, index) => (
          <li key={post._id} className="mb-3 pb-2">
            <div className="d-flex align-items-start">
              <div
                className="bg-warning text-dark  d-flex justify-content-center align-items-center me-3"
                style={{ width: "40px", height: "40px", borderRadius: "9px" }}
              >
                {index + 1}
              </div>
              <div>
                <h5 className="mb-1">{post.title}</h5>
                <p className="mb-0 text-secondary">{post.author}</p>
              </div>
            </div>
            <hr className="mb-0 pb-0" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingBox;
