// import React, {useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAllProducts } from '../../redux/productSlice';
// import api from '../../api/api';
// import { useParams } from 'react-router-dom';
// import { Form, Modal, message, Input, Button, Upload } from 'antd';
// import Loader from '../../components/Loader';
// import '../../styles/Men.css';
// import { UploadOutlined } from '@ant-design/icons';

// const AdminProducts = () => {
//     const dispatch = useDispatch();
//     const [showAddEditModal, setShowAddEditModal] = React.useState(false);
//     const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
//     const [type, setType] = React.useState("add");
//     const navigate = useNavigate();
//     const { id: productId } = useParams();
//     const { products, status, error } = useSelector((state) => state.products);

//     useEffect(() => {
//         dispatch(fetchAllProducts());
//     }, [dispatch]);

//     const onFinish = async (values) => {
//         const formData = new FormData();
//         formData.append('title', values.title);
//         formData.append('description', values.description);
//         formData.append('price', values.price);
//         formData.append('gender', values.gender);
//         formData.append('categories', values.categories);
//         formData.append('sizes', values.sizes);
//         formData.append('colors', values.colors);
//         formData.append('inventory', values.inventory);
        
//         if (values.image) {
//             formData.append('image', values.image.file);
//         }

//         try {
//             let response;
//             if (selectedItemForEdit) {
//                 response = await api.put(`/products/${productId}`, formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//             } else {
//                 response = await api.post("/products", formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//             }

//             if (response.data) {
//                 message.success('Product saved successfully');
//                 setShowAddEditModal(false);
//                 setSelectedItemForEdit(null);
//             } else {
//                 message.error('Error saving product');
//             }
//         } catch (error) {
//             message.error('Error saving product');
//         }
//     };

//     const onDelete = async (item) => {
//         try {
//             const response = await api.delete(`/products/${item._id}`);
//             if (response.data) {
//                 message.success('Product deleted successfully');
//             } else {
//                 message.error('Error deleting product');
//             }
//         } catch (error) {
//             message.error('Error deleting product');
//         }
//     };

//     if (status === 'loading') {
//         return <p className="text-center text-xl"><Loader /></p>;
//     }

//     if (status === 'failed') {
//         return <p className='text-center text-xl'>{error}</p>;
//     }

//     return (
//         <div>
//             <div className='flex justify-end'>
//                 <button className='bg-primary px-5 py-2 text-white' onClick={() => {
//                     setSelectedItemForEdit(null);
//                     setShowAddEditModal(true);
//                 }}>
//                     Add Product
//                 </button>
//             </div>
//             <div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
//                 {products.map((product) => (
//                     <div key={product._id} className='shadow border border-gray-400 flex flex-col gap-5 p-5 break-words'>
//                         <h1 className='text-primary'>{product.title}</h1>
//                         <hr />
//                         {product.image && (
//                             <img src={product.image} alt={product.title} className="product-image object-cover" />
//                         )}
//                         <h1 className='text-xl'>{product.title}</h1>
//                         <h1 className='text-sm'>{product.description}</h1>
//                         <p className="text-blue-600 font-semibold">Price: ${product.price}</p>
//                         <div className='flex justify-end gap-5 mt-5'>
//                             <button className='bg-red-500 text-white px-5 py-2' onClick={() => onDelete(product)}>
//                                 Delete
//                             </button>
//                             <button className='bg-primary text-white px-5 py-2' onClick={() => {
//                                 setSelectedItemForEdit(product);
//                                 setShowAddEditModal(true);
//                                 setType("edit");
//                             }}>
//                                 Edit
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {
//                 (type === "add" || selectedItemForEdit) && <Modal
//                     visible={showAddEditModal}
//                     title={selectedItemForEdit ? "Edit Product" : "Add Product"}
//                     footer={null}
//                     onCancel={() => {
//                         setShowAddEditModal(false);
//                         setSelectedItemForEdit(null);
//                     }}
//                 >
//                     <Form layout='vertical' onFinish={onFinish}
//                         initialValues={selectedItemForEdit || {}}
//                     >
//                         <Form.Item name='title' label='Title'>
//                             <Input placeholder='Title' />
//                         </Form.Item>
//                         <Form.Item name='description' label='Description'>
//                             <Input.TextArea placeholder='Description' />
//                         </Form.Item>
//                         <Form.Item name='price' label='Price'>
//                             <Input type='number' placeholder='Price' />
//                         </Form.Item>
//                         <Form.Item name='image' label='Image' valuePropName='file'>
//                             <Upload 
//                                 accept='image/*' 
//                                 beforeUpload={() => false} 
//                                 showUploadList={false}
//                             >
//                                 <Button icon={<UploadOutlined />}>Upload</Button>
//                             </Upload>
//                         </Form.Item>
//                         <Form.Item name='gender' label='Gender'>
//                             <Input placeholder='Gender' />
//                         </Form.Item>
//                         <Form.Item name='categories' label='Categories'>
//                             <Input placeholder='Categories' />
//                         </Form.Item>
//                         <Form.Item name='sizes' label='Sizes'>
//                             <Input placeholder='Sizes' />
//                         </Form.Item>
//                         <Form.Item name='colors' label='Colors'>
//                             <Input placeholder='Colors' />
//                         </Form.Item>
//                         <Form.Item name='inventory' label='Inventory'>
//                             <Input type='number' placeholder='Inventory' />
//                         </Form.Item>
//                         <div className='flex justify-end'>
//                             <Button onClick={() => {
//                                 setShowAddEditModal(false);
//                                 setSelectedItemForEdit(null);
//                             }}>Cancel</Button>
//                             <Button type='primary' htmlType='submit'>
//                                 {selectedItemForEdit ? "Update" : "Add"}
//                             </Button>
//                         </div>
//                     </Form>
//                 </Modal>
//             }
//         </div>
//     )
// }

// export default AdminProducts;

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../redux/productSlice';
import api from '../../api/api';
import { Form, Modal, message, Input, Button, Upload, Popconfirm } from 'antd';
import Loader from '../../components/Loader';
import '../../styles/AdminProducts.css';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const { products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const onFinish = useCallback(async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'image' && values[key]) {
                formData.append('image', values[key].file);
            } else {
                formData.append(key, values[key]);
            }
        });

        try {
            let response;
            if (selectedItemForEdit) {
                response = await api.put(`/products/${selectedItemForEdit._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                response = await api.post("/products", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            if (response.data) {
                message.success('Product saved successfully');
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                dispatch(fetchAllProducts());
            } else {
                message.error('Error saving product');
            }
        } catch (error) {
            message.error(`Error saving product: ${error.message}`);
        }
    }, [selectedItemForEdit, dispatch]);

    const onDelete = useCallback(async (item) => {
        try {
            const response = await api.delete(`/products/${item._id}`);
            if (response.data) {
                message.success('Product deleted successfully');
                dispatch(fetchAllProducts());
            } else {
                message.error('Error deleting product');
            }
        } catch (error) {
            message.error(`Error deleting product: ${error.message}`);
        }
    }, [dispatch]);

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            setImagePreview(URL.createObjectURL(info.file.originFileObj));
        }
    };

    if (status === 'loading') return <Loader />;
    if (status === 'failed') return <p className='error-message'>{error}</p>;

    return (
        <div className="admin-products">
            <div className='add-product-button'>
                <Button type="primary" onClick={() => setShowAddEditModal(true)}>
                    Add Product
                </Button>
            </div>
            <div className='admin-product-grid'>
                {products.map((product) => (
                    <div key={product._id} className='admin-product-card'>
                        <h1 className='admin-product-title'>{product.title}</h1>
                        <hr />
                        {product.image && (
                            <img src={product.image} alt={product.title} className="admin-product-image" />
                        )}
                        <p className='admin-product-description'>{product.description}</p>
                        <p className="admin-product-price">Price: ${product.price}</p>
                        <div className='admin-product-actions'>
                            <Popconfirm
                                title="Are you sure you want to delete this product?"
                                onConfirm={() => onDelete(product)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger icon={<DeleteOutlined />}>Delete</Button>
                            </Popconfirm>
                            <Button type="primary" icon={<EditOutlined />} onClick={() => {
                                setSelectedItemForEdit(product);
                                setShowAddEditModal(true);
                                setImagePreview(product.image);
                            }}>
                                Edit
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                visible={showAddEditModal}
                title={selectedItemForEdit ? "Edit Product" : "Add Product"}
                footer={null}
                onCancel={() => {
                    setShowAddEditModal(false);
                    setSelectedItemForEdit(null);
                    setImagePreview(null);
                }}
            >
                <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit || {}}>
                    <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input placeholder='Title' />
                    </Form.Item>
                    <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the description!' }]}>
                        <Input.TextArea placeholder='Description' />
                    </Form.Item>
                    <Form.Item name='price' label='Price' rules={[{ required: true, message: 'Please input the price!' }]}>
                        <Input type='number' placeholder='Price' />
                    </Form.Item>
                    <Form.Item name='image' label='Image' valuePropName='file'>
                        <Upload 
                            accept='image/*' 
                            beforeUpload={() => false} 
                            onChange={handleImageChange}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', marginBottom: '1rem' }} />}
                    <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Please input the gender!' }]}>
                        <Input placeholder='Gender' />
                    </Form.Item>
                    <Form.Item name='categories' label='Categories' rules={[{ required: true, message: 'Please input the categories!' }]}>
                        <Input placeholder='Categories' />
                    </Form.Item>
                    <Form.Item name='sizes' label='Sizes' rules={[{ required: true, message: 'Please input the sizes!' }]}>
                        <Input placeholder='Sizes' />
                    </Form.Item>
                    <Form.Item name='colors' label='Colors' rules={[{ required: true, message: 'Please input the colors!' }]}>
                        <Input placeholder='Colors' />
                    </Form.Item>
                    <Form.Item name='inventory' label='Inventory' rules={[{ required: true, message: 'Please input the inventory!' }]}>
                        <Input type='number' placeholder='Inventory' />
                    </Form.Item>
                    <div className='form-actions'>
                        <Button onClick={() => {
                            setShowAddEditModal(false);
                            setSelectedItemForEdit(null);
                            setImagePreview(null);
                        }}>Cancel</Button>
                        <Button type='primary' htmlType='submit'>
                            {selectedItemForEdit ? "Update" : "Add"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default AdminProducts;