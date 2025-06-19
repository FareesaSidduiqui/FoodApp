import React from "react";

export default function Carousel({search, setSearch}) {
  return (
    <div>
      <div
        id="carouselExample"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="3000" // shows each image for 3 seconds
        style={{objectFit:'contain !important'}}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{zIndex:'3'}}>
          <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
  className="form-control me-2"
  type="search"
  placeholder="Search"
  aria-label="Search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

              <button className="btn btn-outline-success text-white bg-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1550321989-65d089904d5c?w=500&auto=format&fit=crop&q=60"
              className="d-block w-100"
              alt="..."
              style={{
                height: "600px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1600705216192-d4902774e3cb?w=500&auto=format&fit=crop&q=60"
              className="d-block w-100"
              alt="..."
              style={{
                height: "600px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1738409329865-9bc6ffa7c02f?w=500&auto=format&fit=crop&q=60"
              className="d-block w-100"
              alt="..."
              style={{
                height: "600px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
