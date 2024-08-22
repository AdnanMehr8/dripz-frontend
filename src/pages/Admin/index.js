import React, { useEffect } from 'react'
import Header from '../../components/Header';
import { Tabs } from 'antd';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import AdminProducts from './AdminProducts';
import AdminProductProgress from './AdminProductProgress';
import '../../styles/adminIndex.css';

const { TabPane } = Tabs;
const Admin = () => {
    const { products } = useSelector((state) => state.products);


    return (
        <div>
            {/* <Header /> */}
            <Container>
            <div className='flex gap-10 items-center px-5 py-2 justify-between mt-4'>
                <div className='flex gap-10 items-center'>
                    <h1 className='text-3xl text-primary text-center '>Portfolio Admin</h1>
                    <div className='w-60 h-[1px] bg-gray-500'>

                    </div>
                </div>
                
            </div>
                    <div className='admin-btn-container'>
            <button className='underline bg-primary text-xl cursor-pointer admin-logout-button'
                    onClick={() => {
                        window.location.href = "/admin-login";
                    }}
                >
                    Log Out</button>
                    </div>
            </Container>
            {products && <div className='px-5 pb-10'>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Admin Products" key="1">
                        <AdminProducts />
                    </TabPane>
                    <TabPane tab="Orders Progress" key="2">
                        <AdminProductProgress />
                    </TabPane>
                </Tabs>
            </div>}
        </div>
    )
}

export default Admin