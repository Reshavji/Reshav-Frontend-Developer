import React, { useRef, useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './Slider.css';

function Slider() {
  const elementRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [scrolling, setScrolling] = useState(true);

  const imageUrls = [
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star_5_12_DSC_6998_desktop_563b34ba45.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Mission_launches_47d27b48e1.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/PSN_Satria_curbh_DSC_2969_desktop_b183afee3c.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/Star5_11_Star5_11_DSC_6815_desktop_3ed52beef0.jpg',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/LAUNCH_CRS_27_Desktop_6d7404f50b.png',
    'https://sxcontent9668.azureedge.us/cms-assets/assets/MISSION_LAUNCH_desktop_46ec0834ce.jpg',
    'https://www.spacex.com/static/images/backgrounds-2021/sl4-3/post-launch/Starlink4-3_desktop_launches.jpg',
  ];

  const slideRight = () => {
    setScrolling(false);
    elementRef.current.scrollLeft += 500;
  };

  const slideLeft = () => {
    setScrolling(false);
    elementRef.current.scrollLeft -= 500;
  };

  useEffect(() => {
    if (scrolling) {
      const interval = setInterval(() => {
        if (imageContainerRef.current) {
          imageContainerRef.current.scrollLeft += 1; // Adjust the scrolling speed if needed
        }
      }, 50); // Adjust the interval if needed

      return () => {
        clearInterval(interval);
      };
    }
  }, [scrolling]);

  return (
    <div className="slider-container">
      <ArrowBackIosIcon fontSize="large"
        onClick={slideLeft}
        className="slider-icon left"
      />

      <div
        className="image-container"
        ref={(el) => {
          elementRef.current = el;
          imageContainerRef.current = el;
        }}
        onMouseEnter={() => setScrolling(false)}
        onMouseLeave={() => setScrolling(true)}
      >
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`${index}`}
            className='w-[110px] md:w-[200px] rounded-lg
            hover:border-[3px] border-gray-400 cursor-pointer
            hover:scale-110 transition-all duration-150 ease-in'
          />
        ))}
      </div>

      <ArrowForwardIosIcon fontSize="large"
        onClick={slideRight}
        className="slider-icon right"
      />
    </div>
  );
}

export default Slider;
