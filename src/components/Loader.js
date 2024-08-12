import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='d-flex'>
        <div className='spinner-grow text-black m-1' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-black m-1' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-black m-1' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-black m-1' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <div className='spinner-grow text-black m-1' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Loader = () => {
//   return (
//     <div className='d-flex justify-content-center align-items-center vh-100'>
//       <div className='d-flex'>
//         <h1 className='m-2 text-primary'>D</h1>
//         <h1 className='m-2 text-secondary'>I</h1>
//         <h1 className='m-2 text-success'>R</h1>
//         <h1 className='m-2 text-danger'>P</h1>
//         <h1 className='m-2 text-warning'>Z</h1>
//       </div>
//     </div>
//   );
// }

// export default Loader;
