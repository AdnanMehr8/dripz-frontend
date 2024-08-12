// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAllProducts } from '../../redux/productSlice';
// import api from '../../api/api';
// import { useParams } from 'react-router-dom';
// import { Form, Modal, message, Input, Button } from 'antd';
// import Loader from '../../components/Loader';
// import '../../styles/Men.css';

// const AdminProducts = () => {
//     const dispatch = useDispatch();
//     const [showAddEditModal, setShowAddEditModal] = React.useState(false);
//     const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
//     const [type, setType] = React.useState("add");
//     const navigate = useNavigate();
//     const { id: productId } = useParams();
//     const { products, status, error } = useSelector((state) => state.products);

//     useEffect(() => {
//                 dispatch(fetchAllProducts());
//             }, [dispatch]);

//     const onFinish = async (values) => {
//         try {      
//             let response
//             if (selectedItemForEdit) {
//                 response = await api.post(`/products/${productId}`, {
//                     ...values,
//                     _id: selectedItemForEdit._id,
//                 });
//             } else {
//                 response = await api.post("/products",
//                     values
//                 );
//             }

//             if (response.data.success) {
//                 message.success(response.data.message)
//                 setShowAddEditModal(false);
//                 setSelectedItemForEdit(null);
        
    
//             } else {
//                 message.error(response.data.message)
//             }
//         } catch (error) {
     
//             message.error(error.message)
//         }
//     };

//     const onDelete = async (item) => {
//         try {
          
//             const response = await api.delete(`/products/${item._id}`);
     
//             if (response.data.success) {
//                 message.success(response.data.message);
              
          
//             } else {
//                 message.error(response.data.message)
//             }
//         } catch (error) {
          
//             message.error(error.message)
//         }
//     };

//     if (status === 'loading') {
//                 return <p className="text-center text-xl"><Loader /></p>;
//             }
        
//     if (status === 'failed') {
//                 return <p className='text-center text-xl'>{error}</p>;
//             }
//     return (
//         <div>
//             <div className='flex justify-end'>
//                 <button className='bg-primary px-5 py-2 text-white' onClick={() => {
//                     setSelectedItemForEdit(null);
//                     setShowAddEditModal(true);
//                 }}
//                 >
//                     Add Product</button>
//             </div>
//             <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
//                 {products.map((product) => (
//                     <div className='shadow border border-gray-400 flex flex-col gap-5 p-5 break-words'>
//                         <h1 className='text-primary'>{product.title}</h1>
//                         <hr />
//                         {product.image && (
//                                 <img src={product.image} alt={product.title} className="product-image object-cover" />
//                             )}                         
//                         <h1 className='text-xl'>{product.title}</h1>
//                         <h1 className='text-sm'>{product.description}</h1>
//                         <p className="text-blue-600 font-semibold">Price: ${product.price}</p>
//                         <div className='flex justify-end gap-5 mt-5'>
//                             <button className='bg-red-500 text-white px-5 py-2'
//                                 onClick={() => {
//                                     onDelete(product);
//                                 }}
//                             >
//                                 Delete</button>
//                             <button className='bg-primary text-white px-5 py-2' onClick={() => {
//                                 setSelectedItemForEdit(product);
//                                 setShowAddEditModal(true);
//                                 setType("edit");
//                             }}
//                             >
//                                 Edit
//                             </button>
//                         </div>
//                     </div>
//                 ))}

//             </div>

//             {
//                 (type === "add" || selectedItemForEdit) && <Modal visible={showAddEditModal}
//                     title={selectedItemForEdit ? "Edit Project" : "Add Project"} footer={null}
//                     onCancel={() => {
//                         setShowAddEditModal(false);
//                         setSelectedItemForEdit(null);
//                     }}
//                 >
//                     <Form layout='vertical' onFinish={onFinish}
//                         initialValues={{
//                             ...selectedItemForEdit,
//                         } || {}}
//                     >
//                         <Form.Item name='title' label='Title'>
//                             <input placeholder='Title' />
//                         </Form.Item>
//                         <Form.Item name='description' label='Description'>
//                             <textarea placeholder='Description' />
//                         </Form.Item>
//                         <Form.Item name='price' label='Price'>
//                             <input placeholder='Price' />
//                         </Form.Item>
//                         <Form.Item name='image' label='Image URL'>
//                             <input placeholder='Image URL' />
//                         </Form.Item>
//                         <Form.Item name='gender' label='Gender'>
//                             <input placeholder='Gender' />
//                         </Form.Item>
//                         <Form.Item name='categories' label='Categories'>
//                             <input placeholder='Categories' />
//                         </Form.Item>
//                         <Form.Item name='sizes' label='Sizes'>
//                             <input placeholder='Sizes' />
//                         </Form.Item>
//                         <Form.Item name='colors' label='Colors'>
//                             <input placeholder='Colors' />
//                         </Form.Item>
//                         <Form.Item name='inventory' label='Inventory'>
//                             <input placeholder='Inventory' />
//                         </Form.Item>
//                         <div className='flex justify-end'>
//                             <button className='border-primary text-primary px-5 py-2' onClick={() => {
//                                 setShowAddEditModal(false)
//                                 setSelectedItemForEdit(null);
//                             }}>Cancel</button>
//                             <button className='bg-primary text-white px-5 py-2'>
//                                 {selectedItemForEdit ? "Update" : "Add"}
//                             </button>
//                         </div>
//                     </Form>
//                 </Modal>
//             }
//         </div>
//     )
// }

// export default AdminProducts;
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../redux/productSlice';
import api from '../../api/api';
import { useParams } from 'react-router-dom';
import { Form, Modal, message, Input, Button, Upload } from 'antd';
import Loader from '../../components/Loader';
import '../../styles/Men.css';
import { UploadOutlined } from '@ant-design/icons';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");
    const navigate = useNavigate();
    const { id: productId } = useParams();
    const { products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('gender', values.gender);
        formData.append('categories', values.categories);
        formData.append('sizes', values.sizes);
        formData.append('colors', values.colors);
        formData.append('inventory', values.inventory);
        
        if (values.image) {
            formData.append('image', values.image.file);
        }

        try {
            let response;
            if (selectedItemForEdit) {
                response = await api.put(`/products/${productId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                response = await api.post("/products", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            if (response.data) {
                message.success('Product saved successfully');
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
            } else {
                message.error('Error saving product');
            }
        } catch (error) {
            message.error('Error saving product');
        }
    };

    const onDelete = async (item) => {
        try {
            const response = await api.delete(`/products/${item._id}`);
            if (response.data) {
                message.success('Product deleted successfully');
            } else {
                message.error('Error deleting product');
            }
        } catch (error) {
            message.error('Error deleting product');
        }
    };

    if (status === 'loading') {
        return <p className="text-center text-xl"><Loader /></p>;
    }

    if (status === 'failed') {
        return <p className='text-center text-xl'>{error}</p>;
    }

    return (
        <div>
            <div className='flex justify-end'>
                <button className='bg-primary px-5 py-2 text-white' onClick={() => {
                    setSelectedItemForEdit(null);
                    setShowAddEditModal(true);
                }}>
                    Add Product
                </button>
            </div>
            <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
                {products.map((product) => (
                    <div key={product._id} className='shadow border border-gray-400 flex flex-col gap-5 p-5 break-words'>
                        <h1 className='text-primary'>{product.title}</h1>
                        <hr />
                        {product.image && (
                            <img src={product.image} alt={product.title} className="product-image object-cover" />
                        )}
                        <h1 className='text-xl'>{product.title}</h1>
                        <h1 className='text-sm'>{product.description}</h1>
                        <p className="text-blue-600 font-semibold">Price: ${product.price}</p>
                        <div className='flex justify-end gap-5 mt-5'>
                            <button className='bg-red-500 text-white px-5 py-2' onClick={() => onDelete(product)}>
                                Delete
                            </button>
                            <button className='bg-primary text-white px-5 py-2' onClick={() => {
                                setSelectedItemForEdit(product);
                                setShowAddEditModal(true);
                                setType("edit");
                            }}>
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {
                (type === "add" || selectedItemForEdit) && <Modal
                    visible={showAddEditModal}
                    title={selectedItemForEdit ? "Edit Product" : "Add Product"}
                    footer={null}
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemForEdit(null);
                    }}
                >
                    <Form layout='vertical' onFinish={onFinish}
                        initialValues={selectedItemForEdit || {}}
                    >
                        <Form.Item name='title' label='Title'>
                            <Input placeholder='Title' />
                        </Form.Item>
                        <Form.Item name='description' label='Description'>
                            <Input.TextArea placeholder='Description' />
                        </Form.Item>
                        <Form.Item name='price' label='Price'>
                            <Input type='number' placeholder='Price' />
                        </Form.Item>
                        <Form.Item name='image' label='Image' valuePropName='file'>
                            <Upload 
                                accept='image/*' 
                                beforeUpload={() => false} 
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item name='gender' label='Gender'>
                            <Input placeholder='Gender' />
                        </Form.Item>
                        <Form.Item name='categories' label='Categories'>
                            <Input placeholder='Categories' />
                        </Form.Item>
                        <Form.Item name='sizes' label='Sizes'>
                            <Input placeholder='Sizes' />
                        </Form.Item>
                        <Form.Item name='colors' label='Colors'>
                            <Input placeholder='Colors' />
                        </Form.Item>
                        <Form.Item name='inventory' label='Inventory'>
                            <Input type='number' placeholder='Inventory' />
                        </Form.Item>
                        <div className='flex justify-end'>
                            <Button onClick={() => {
                                setShowAddEditModal(false);
                                setSelectedItemForEdit(null);
                            }}>Cancel</Button>
                            <Button type='primary' htmlType='submit'>
                                {selectedItemForEdit ? "Update" : "Add"}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            }
        </div>
    )
}

export default AdminProducts;
