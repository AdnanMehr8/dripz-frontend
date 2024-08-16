
// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles/ProductCard.css';
// import Loader from './Loader';
// import { Suspense } from 'react';
// export default function ProductCard() {
//   return (
//     <div className="category-card-container">
//       <div className = 'category-card-contain'>
//         <h2 className="text-2xl font-bold mb-4 text-center mt-4">Men's Products <span><div className='category-card-seperator'></div></span></h2>
//         <Container fluid className=''>
//           <Row className="category-card-row ">
//             <Col className="category-card-col ">
//               <a href="/men">

//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://plus.unsplash.com/premium_photo-1688497831535-120bd47d9f9c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Men's Product 1" />
//                 <div className="category-image-card-text ">Men</div>
//                 </div>
             
//               </a>
//             </Col>
//             <Col className="category-card-col">
//               <a href="/men-eastern">
//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://images.unsplash.com/photo-1711044871601-301f9b0ecf91?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Men's Product 2" />
//                 <div className="category-image-card-text">Eastern</div>
//                 </div>
//               </a>
//             </Col>
//             <Col className="category-card-col">
//               <a href="/men-casual">
//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://images.unsplash.com/photo-1602670935908-094f41dcb67c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Men's Product 3" />
//                 <div className="category-image-card-text">Casual</div>
//                 </div>
//               </a>
//             </Col>
//             <Col className="category-card-col">
//               <a href="/men-accessories">
//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://images.unsplash.com/photo-1660245409239-23b212a77793?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Men's Product 4" />
//                 <div className="category-image-card-text">Accessories</div>
//                 </div>
//               </a>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       <div>
//         <h2 className="text-2xl font-bold mb-4 text-center mt-4">Women's Products <span><div className='seperator'></div></span></h2>
//         <Container fluid>
//           <Row className="category-card-row">
//             <Col className="category-card-col">
//               <a href="/women">
//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://plus.unsplash.com/premium_photo-1673758890702-bface9ee9e90?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Women's Product 1" />
//                 <div className="category-image-card-text">Women</div>
//                 </div>
//               </a>
//             </Col>
//             <Col className="category-card-col">
//               <a href="/women-eastern">
//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://images.unsplash.com/photo-1594709286237-aa8e7362e2a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Women's Product 2" />
//                 <div className="category-image-card-text">Eastern</div>
//                 </div>
//               </a>
//             </Col>
//             <Col className="category-card-col">
//               <a href="/women-casual">
//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Women's Product 3" />
//                 <div className="category-image-card-text">Casual</div>
//                 </div>
//               </a>
//             </Col>
//             <Col className="category-card-col">
//               <a href="/women-accessories">
//               <div className="category-image-card-container">
//                 <img className="category-card-image" src="https://plus.unsplash.com/premium_photo-1661767490622-7d751502ac88?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Women's Product 4" />
//                 <div className="category-image-card-text">Accessories</div>
//                 </div>
//               </a>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ProductCard.css';

const CategoryCard = ({ href, imageSrc, altText, text }) => (
  <Col className="category-card-col">
    <a href={href} className="category-card-link">
      <div className="category-image-card-container">
        <img 
          className="category-card-image" 
          src={imageSrc} 
          alt={altText}
          onError={(e) => {e.target.onerror = null; e.target.src = 'fallback-image.jpg'}}
        />
        <div className="category-image-card-text">{text}</div>
      </div>
    </a>
  </Col>
);

const ProductSection = ({ title, categories }) => (
  <div className="category-card-contain">
    <h2 className="section-title">{title} <span><div className='category-card-separator'></div></span></h2>
    <Container fluid>
      <Row className="category-card-row">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </Row>
    </Container>
  </div>
);

export default function ProductCard() {
  const menCategories = [
    { href: "/men", imageSrc: "https://plus.unsplash.com/premium_photo-1688497831535-120bd47d9f9c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Men's Product", text: "Men" },
    { href: "/men-eastern", imageSrc: "https://images.unsplash.com/photo-1711044871601-301f9b0ecf91?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Men's Eastern Product", text: "Eastern" },
    { href: "/men-casual", imageSrc: "https://images.unsplash.com/photo-1602670935908-094f41dcb67c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Men's Casual Product", text: "Casual" },
    { href: "/men-accessories", imageSrc: "https://images.unsplash.com/photo-1660245409239-23b212a77793?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Men's Accessories", text: "Accessories" }
  ];

  const womenCategories = [
    { href: "/women", imageSrc: "https://plus.unsplash.com/premium_photo-1673758890702-bface9ee9e90?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Women's Product", text: "Women" },
    { href: "/women-eastern", imageSrc: "https://images.unsplash.com/photo-1594709286237-aa8e7362e2a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Women's Eastern Product", text: "Eastern" },
    { href: "/women-casual", imageSrc: "https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Women's Casual Product", text: "Casual" },
    { href: "/women-accessories", imageSrc: "https://plus.unsplash.com/premium_photo-1661767490622-7d751502ac88?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", altText: "Women's Accessories", text: "Accessories" }
  ];

  return (
    <div className="category-card-container">
      <ProductSection title="Men's Products" categories={menCategories} />
      <ProductSection title="Women's Products" categories={womenCategories} />
    </div>
  );
}
