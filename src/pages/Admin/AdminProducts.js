// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAllProducts, incrementPage } from '../../redux/productSlice';
// import api from '../../api/api';
// import { Form, Modal, message, Input, Button, Upload, Popconfirm } from 'antd';
// import Loader from '../../components/Loader';
// import '../../styles/AdminProducts.css';
// import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

// const AdminProducts = () => {
//     const dispatch = useDispatch();
//     const [showAddEditModal, setShowAddEditModal] = useState(false);
//     const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const navigate = useNavigate();
//     const { products, status, error, page, hasMore } = useSelector((state) => state.products);
//     const observer = useRef();

//     useEffect(() => {
//         dispatch(fetchAllProducts({ page, limit: 9 }));
//     }, [dispatch, page]);

//     const lastProductElementRef = useCallback(node => {
//         if (status === 'loading') return;
//         if (observer.current) observer.current.disconnect();
//         observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting && hasMore) {
//                 dispatch(incrementPage());
//             }
//         });
//         if (node) observer.current.observe(node);
//     }, [status, hasMore, dispatch]);

//     const onFinish = useCallback(async (values) => {
//         const formData = new FormData();
//         Object.keys(values).forEach(key => {
//             if (key === 'image' && values[key]) {
//                 formData.append('image', values[key].file);
//             } else {
//                 formData.append(key, values[key]);
//             }
//         });

//         try {
//             let response;
//             if (selectedItemForEdit) {
//                 response = await api.put(`/products/${selectedItemForEdit._id}`, formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//             } else {
//                 response = await api.post("/products", formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//             }

//             if (response.data) {
//                 message.success('Product saved successfully');
//                 setShowAddEditModal(false);
//                 setSelectedItemForEdit(null);
//                 dispatch(fetchAllProducts({ page, limit: 9 }));
//             } else {
//                 message.error('Error saving product');
//             }
//         } catch (error) {
//             message.error(`Error saving product: ${error.message}`);
//         }
//     }, [selectedItemForEdit, dispatch, page]);

//     const onDelete = useCallback(async (item) => {
//         try {
//             const response = await api.delete(`/products/${item._id}`);
//             if (response.data) {
//                 message.success('Product deleted successfully');
//                 dispatch(fetchAllProducts({ page, limit: 9 }));
//             } else {
//                 message.error('Error deleting product');
//             }
//         } catch (error) {
//             message.error(`Error deleting product: ${error.message}`);
//         }
//     }, [dispatch, page]);

//     const handleImageChange = (info) => {
//         if (info.file.status === 'done') {
//             setImagePreview(URL.createObjectURL(info.file.originFileObj));
//         } else if (info.file.status === 'removed') {
//             setImagePreview(null);
//         }
//     };

//     if (status === 'loading') return <Loader />;
//     if (status === 'failed') return <p className='error-message'>{error}</p>;

//     return (
//         <div className="admin-products">
//             <div className='add-product-button'>
//                 <Button type="primary" onClick={() => setShowAddEditModal(true)}>
//                     Add Product
//                 </Button>
//             </div>
//             <div className='admin-product-grid'>
//                 {products.map((product, index) => (
//                     <div 
//                         key={product._id} 
//                         ref={products.length === index + 1 ? lastProductElementRef : null}
//                         className='admin-product-card'
//                     >
//                         <h1 className='admin-product-title'>{product.title}</h1>
//                         <hr />
//                         {product.image && (
//                             <img src={product.image} alt={product.title} className="admin-product-image" />
//                         )}
//                         <p className='admin-product-description'>{product.description}</p>
//                         <p className="admin-product-price">Price: ${product.price}</p>
//                         <div className='admin-product-actions'>
//                             <Popconfirm
//                                 title="Are you sure you want to delete this product?"
//                                 onConfirm={() => onDelete(product)}
//                                 okText="Yes"
//                                 cancelText="No"
//                             >
//                                 <Button danger icon={<DeleteOutlined />}>Delete</Button>
//                             </Popconfirm>
//                             <Button type="primary" icon={<EditOutlined />} onClick={() => {
//                                 setSelectedItemForEdit(product);
//                                 setShowAddEditModal(true);
//                                 setImagePreview(product.image);
//                             }}>
//                                 Edit
//                             </Button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <Modal
//                 visible={showAddEditModal}
//                 title={selectedItemForEdit ? "Edit Product" : "Add Product"}
//                 footer={null}
//                 onCancel={() => {
//                     setShowAddEditModal(false);
//                     setSelectedItemForEdit(null);
//                     setImagePreview(null);
//                 }}
//             >
//                 <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit || {}}>
//                     <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please input the title!' }]}>
//                         <Input placeholder='Title' />
//                     </Form.Item>
//                     <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please input the description!' }]}>
//                         <Input.TextArea placeholder='Description' />
//                     </Form.Item>
//                     <Form.Item name='price' label='Price' rules={[{ required: true, message: 'Please input the price!' }]}>
//                         <Input type='number' placeholder='Price' />
//                     </Form.Item>
//                     <Form.Item name='image' label='Image' valuePropName='file'>
//                         <Upload 
//                             accept='image/*' 
//                             beforeUpload={() => false} 
//                             onChange={handleImageChange}
//                             showUploadList={false}
//                         >
//                             <Button icon={<UploadOutlined />}>Upload</Button>
//                         </Upload>
//                     </Form.Item>
//                     {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', marginBottom: '1rem' }} />}
//                     <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Please input the gender!' }]}>
//                         <Input placeholder='Gender' />
//                     </Form.Item>
//                     <Form.Item name='categories' label='Categories' rules={[{ required: true, message: 'Please input the categories!' }]}>
//                         <Input placeholder='Categories' />
//                     </Form.Item>
//                     <Form.Item name='sizes' label='Sizes' rules={[{ required: true, message: 'Please input the sizes!' }]}>
//                         <Input placeholder='Sizes' />
//                     </Form.Item>
//                     <Form.Item name='colors' label='Colors' rules={[{ required: true, message: 'Please input the colors!' }]}>
//                         <Input placeholder='Colors' />
//                     </Form.Item>
//                     <Form.Item name='inventory' label='Inventory' rules={[{ required: true, message: 'Please input the inventory!' }]}>
//                         <Input type='number' placeholder='Inventory' />
//                     </Form.Item>
//                     <div className='form-actions'>
//                         <Button onClick={() => {
//                             setShowAddEditModal(false);
//                             setSelectedItemForEdit(null);
//                             setImagePreview(null);
//                         }}>Cancel</Button>
//                         <Button type='primary' htmlType='submit'>
//                             {selectedItemForEdit ? "Update" : "Add"}
//                         </Button>
//                     </div>
//                 </Form>
//             </Modal>
//         </div>
//     )
// }

// export default AdminProducts;

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts, incrementPage } from '../../redux/productSlice';
import api from '../../api/api';
import { Form, Modal, message, Input, Button, Upload, Popconfirm } from 'antd';
import Loader from '../../components/Loader';
import '../../styles/AdminProducts.css';
import { UploadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AdminProducts = () => {
    const dispatch = useDispatch();
    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();
    const { products, status, error, page, hasMore } = useSelector((state) => state.products);
    const observer = useRef();

    useEffect(() => {
        dispatch(fetchAllProducts({ page, limit: 9 }));
    }, [dispatch, page]);

    const lastProductElementRef = useCallback(node => {
        if (status === 'loading') return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                dispatch(incrementPage());
            }
        });
        if (node) observer.current.observe(node);
    }, [status, hasMore, dispatch]);

    const onFinish = useCallback(async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'imageAngles') {
                fileList.forEach(file => {
                    formData.append('imageAngles', file.originFileObj);
                });
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
                setFileList([]);
                dispatch(fetchAllProducts({ page, limit: 9 }));
            } else {
                message.error('Error saving product');
            }
        } catch (error) {
            message.error(`Error saving product: ${error.message}`);
        }
    }, [selectedItemForEdit, dispatch, page, fileList]);

    const onDelete = useCallback(async (item) => {
        try {
            const response = await api.delete(`/products/${item._id}`);
            if (response.data) {
                message.success('Product deleted successfully');
                dispatch(fetchAllProducts({ page, limit: 9 }));
            } else {
                message.error('Error deleting product');
            }
        } catch (error) {
            message.error(`Error deleting product: ${error.message}`);
        }
    }, [dispatch, page]);

    const handleImageChange = ({ fileList: newFileList }) => {
        // Ensure fileList is always an array
        setFileList(newFileList.map(file => ({
            ...file,
            url: file.url || URL.createObjectURL(file.originFileObj),
        })));
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
                {products.map((product, index) => (
                    <div 
                        key={product._id} 
                        ref={products.length === index + 1 ? lastProductElementRef : null}
                        className='admin-product-card'
                    >
                        <h1 className='admin-product-title'>{product.title}</h1>
                        <hr />
                        {product.image && (
                            <img src={product.image} alt={product.title} className="admin-product-image" />
                        )}
                        <div className='admin-product-angles'>
                            {product.imageAngles && product.imageAngles.map((angleImage, i) => (
                                <img key={i} src={angleImage} alt={`Angle ${i + 1}`} className="admin-product-angle-image" />
                            ))}
                        </div>
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
                                setFileList(
                                    (product.imageAngles || []).map(url => ({
                                        url,
                                        status: 'done'
                                    }))
                                );
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
                    setFileList([]);
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
                    <Form.Item name='imageAngles' label='Product Images'>
                        <Upload
                            listType='picture-card'
                            accept='image/*'
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                            fileList={fileList}
                            multiple
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                    <div className='image-preview-container'>
                        {fileList.map((file, index) => (
                            <img key={index} src={file.url} alt={`Preview ${index + 1}`} style={{ width: '100px', margin: '0 5px' }} />
                        ))}
                    </div>
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
                            setFileList([]);
                        }}>Cancel</Button>
                        <Button type='primary' htmlType='submit'>
                            {selectedItemForEdit ? "Update" : "Add"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminProducts;
