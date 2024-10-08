// import React from 'react';
// import { Carousel } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/slider.css';
// import slide1 from '../assets/images/slide 1.jpg';
// import slide2 from '../assets/images/slide 2.jpg';
// import slide3 from '../assets/images/slide 3.jpg';


// const Slider = () => {
//   return (
//     <div className='carousel-container '>
//       <Carousel fade controls={false} indicators={true}>
//         <Carousel.Item>
//           <img
//             className="d-block w-100 slider-image"
//             src={slide1}
//             alt="First slide"
//           />
//           <Carousel.Caption>
//             <h3>The Winters 2024 drop</h3>
//             <p>New Arrival</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item>
//           <img
//             className="d-block w-100 slider-image"
//             src={slide2}
//             alt="Second slide"
//           />
//           <Carousel.Caption>
//             <h3>Men's Winter 2024 drop</h3>
//             <p>New Arrival</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//         <Carousel.Item>
//           <img
//             className="d-block w-100 slider-image"
//             src={slide3}
//             alt="Third slide"
//           />
//           <Carousel.Caption>
//             <h3>Exclusive Collections</h3>
//             <p>New Arrival</p>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </Carousel>
//     </div>
//   );
// };

// export default Slider;

import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/slider.css';
import slide1 from '../assets/images/slide 1.jpg';
import slide2 from '../assets/images/slide 2.jpg';
import slide3 from '../assets/images/slide 3.jpg';
import slide4 from '../assets/images/slide 4.jpg';
import slide5 from '../assets/images/slide 5.jpg';
import slide6 from '../assets/images/slide 6.jpg';



const Slider = () => {
  const slides = [
    { image: slide6, title: "The Winters 2024 drop", subtitle: "New Arrival" },
    { image: slide2, title: "Men's Winter 2024 drop", subtitle: "New Arrival" },
    { image: slide5, title: "Exclusive Collections", subtitle: "New Arrival" }
  ];

  return (
    <div className='carousel-container'>
      <Carousel fade controls={false} indicators={true}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div className='slider-image-container'>
            <img
              className=" slider-image"
              src={slide.image}
              alt={`Slide ${index + 1}`}
              onError={(e) => {e.target.onerror = null; e.target.src = 'fallback-image.jpg'}}
            />
            </div>
            <Carousel.Caption>
              <h3>{slide.title}</h3>
              <p>{slide.subtitle}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;