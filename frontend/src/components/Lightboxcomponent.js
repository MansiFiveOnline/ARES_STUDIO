import React from "react";
import { Link } from "react-router-dom";
import "../style/user.css";

const Lightboxcomponent = () => {
  return (
    <div className="lightbox_gallery">
      <div class="container text-center py-5">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row justify-content-center">
              <Link
                href="#"
                class="col-sm-4 "
                data-bs-toggle="modal"
                data-bs-target="#exampleLightbox"
              >
                <div className="gal-box">
                  <img
                    data-bs-target="#lightboxExampleCarousel"
                    data-bs-slide-to="0"
                    src="https://unsplash.it/200.jpg?image=250"
                    class="img-fluid"
                  />
                </div>
              </Link>
              <Link
                href="#"
                class="col-sm-4"
                data-bs-toggle="modal"
                data-bs-target="#exampleLightbox"
              >
                <div className="gal-box">
                  <img
                    data-bs-target="#lightboxExampleCarousel"
                    data-bs-slide-to="1"
                    src="https://unsplash.it/200.jpg?image=251"
                    class="img-fluid"
                  />
                </div>
              </Link>
              <Link
                href="#"
                class="col-sm-4"
                data-bs-toggle="modal"
                data-bs-target="#exampleLightbox"
              >
                <div className="gal-box">
                  <img
                    data-bs-target="#lightboxExampleCarousel"
                    data-bs-slide-to="2"
                    src="https://unsplash.it/200.jpg?image=252"
                    class="img-fluid"
                  />
                </div>
              </Link>
              <Link
                href="#"
                class="col-sm-4"
                data-bs-toggle="modal"
                data-bs-target="#exampleLightbox"
              >
                <div className="gal-box">
                  <img
                    data-bs-target="#lightboxExampleCarousel"
                    data-bs-slide-to="3"
                    src="https://unsplash.it/1200"
                    class="img-fluid"
                  />
                </div>
              </Link>
              <Link
                href="#"
                class="col-sm-4"
                data-bs-toggle="modal"
                data-bs-target="#exampleLightbox"
              >
                <div className="gal-box">
                  <img
                    data-bs-target="#lightboxExampleCarousel"
                    data-bs-slide-to="4"
                    src="https://unsplash.it/1100"
                    class="img-fluid"
                  />
                </div>
              </Link>
              <Link
                href="#"
                class="col-sm-4"
                data-bs-toggle="modal"
                data-bs-target="#exampleLightbox"
              >
                <div className="gal-box">
                  <img
                    data-bs-target="#lightboxExampleCarousel"
                    data-bs-slide-to="5"
                    src="https://unsplash.it/1000"
                    class="img-fluid"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleLightbox"
        tabindex="-1"
        aria-labelledby="exampleLightboxLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div id="lightboxExampleCarousel" class="carousel slide">
                <div class="carousel-inner ratio ratio-16x9 bg-dark">
                  <div class="carousel-item text-center active">
                    <img
                      src="https://unsplash.it/1600/900.jpg?image=250"
                      class="img-fluid mh-100"
                    />
                  </div>
                  <div class="carousel-item text-center">
                    <img
                      src="https://unsplash.it/1600/1200.jpg?image=251"
                      class="img-fluid mh-100"
                    />
                  </div>
                  <div class="carousel-item text-center">
                    <img
                      src="https://unsplash.it/1200/1000.jpg?image=252"
                      class="img-fluid mh-100"
                    />
                  </div>
                  <div class="carousel-item text-center">
                    <img
                      src="https://unsplash.it/1200"
                      class="img-fluid mh-100"
                    />
                  </div>
                  <div class="carousel-item text-center">
                    <img
                      src="https://unsplash.it/1100"
                      class="img-fluid mh-100"
                    />
                  </div>
                  <div class="carousel-item text-center">
                    <img
                      src="https://unsplash.it/1000"
                      class="img-fluid mh-100"
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#lightboxExampleCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#lightboxExampleCarousel"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightboxcomponent;
