import React, { useState } from 'react';
import "./index.scss";
import useWindowDimensions from '../../utils/useWindowDimensions';
import Slider from "react-slick";
import Prev from '../../static/icon/prev_black.png';
import Next from '../../static/icon/next.png';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    >
      <img src={Next} alt="Next Button" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    >
      <img src={Prev} alt="Previous Button"/>
    </div>
  );
}

export const VideoSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const settings = {
    arrows: width === 'lg' ? true : false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    infinite: true,
    dots: true,
    // centerMode: true,
    dotsClass: "slick-dots",
    speed: 1500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => setActiveIndex(next)
  };

  const videos = [
    {
      id: 4,
      title: "Louis Armstrong",
      image: null,
      video: 'https://www.youtube.com/embed/VqhCQZaH4Vs',
      caption: "Louis Armstrong - What A Wonderful World",
      category: "video"
    },
    {
      id: 1,
      title: "Penyergapan teroris oleh paskhas",
      image: null,
      video: 'https://www.youtube.com/embed/iIbTeur7tcY',
      caption: "Penyergapan teroris oleh paskhas",
      category: "video"
    },
    {
      id: 2,
      title: "The Chantels",
      image: null,
      video: 'https://www.youtube.com/embed/ZZylQj5zwTw',
      caption: "The Chantels - Maybe",
      category: "video"
    },
  ];

  return (
    <div className='video-section'>
      <p className="gallery-category">Videografi</p>
      <div className="gallery-video-wrapper">
        <Slider className="slider" {...settings}>
          {videos.map((item, idx) => {
            return (
              <div className={`offerItemWrapper ${idx === activeIndex ? 'active-video' : 'video'}`}>
                <iframe
                  src={item.video}
                  referrerpolicy="no-referrer-when-downgrade"
                  className="youtube"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen="allowfullscreen"
                ></iframe>
                <div>
                  <p className="gallery-caption">{item.caption}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};
