import React from "react";
import Layout from "../../components/Layout";
import VideoPlayer from "../../components/Videoplayer";
// import PortfolioGallery from './PortfolioGallery'
import { Link } from "react-router-dom";
import Gallery from "../../components/Gallery";
// import FilterableGallery from './Lightboxgallery'
// import MyComponent from './Mycomponent'
import "../../style/user.css";

const Service = () => {
  return (
    <Layout>
      {/* Embark on Epic Adventures section start */}
      <div className="service_section position-relative">
        <div className="app">
          <div className="video-list">
            {/* <VideoPlayer src="images/video2.mp4" /> */}
            <img src="images/service-detail.jpg" />
          </div>
        </div>
        <div className="service_title">
          <h1>Games</h1>
        </div>
        <div className="arrow_down">
          <a href="#gaming">
            <div class="sr-arrow sr-bounce"></div>
          </a>
        </div>
      </div>

      {/* Embark on Epic Adventures section start */}
      <div className="epic_adventures_section pt-5 mt-5" id="gaming">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h2 className="pb-5">
                <strong>Embark on Epic Adventures,</strong>
                <br />
                Dive into Captivating World of Gaming
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque convallis eu nibh ut hendrerit. Mauris quis ex ut
                metus scelerisque efficitur gravida ac metus. Donec fringilla
                nibh et suscipit pellentesque. Curabitur laoreet semper neque
                commodo fringilla. Etiam maximus sem sit amet velit consequat,
                et pulvinar metus egestas. Nam dignissim in lacus ut facilisis.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Fusce mollis ac odio vitae euismod. Maecenas id vehicula turpis.
                Etiam consequat vehicula enim in aliquam.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Embark on Epic Adventures section close */}

      {/* gallery section section start */}
      <section>
        {/* <PortfolioGallery />   */}
        {/* <FilterableGallery /> */}
        {/* <MyLightboxComponent /> */}
        <div className="service">
          <Gallery />
        </div>
      </section>
      {/* gallery section section close */}
    </Layout>
  );
};

export default Service;
