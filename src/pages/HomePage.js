// import React, { Suspense, lazy } from 'react';
// import { Container } from 'react-bootstrap';
// import Slider from '../components/Slider';
// import '../styles/homepage.css';
// import Loader from '../components/Loader'

// // import ProductCard from '../components/ProductCard';
// const ProductCard = lazy(() => import('../components/ProductCard'));

// const HomePage = () => {
//   return (
//     // <Container fluid className="p-0 pt-2 mt-4">
//     <div className="">
//       <Suspense fallback= {<Loader />}>
//       <Slider />
//         <div className='mt-5'>
//         <ProductCard />
//         </div>
//         </Suspense>
//         </div>
        
   
//   );
// };

// export default HomePage;

import React, { Suspense, lazy } from 'react';
import Slider from '../components/Slider';
import Loader from '../components/Loader';
import '../styles/homepage.css';

const ProductCard = lazy(() => import('../components/ProductCard'));

const HomePage = () => {
  return (
    <div className="home-page">
      <Suspense fallback={<Loader />}>
        <Slider />
        <div className="product-card-container">
          <ProductCard />
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;