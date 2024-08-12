import React, { useEffect } from 'react'
import Header from '../../components/Header';
import { Tabs } from 'antd';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import AdminProducts from './AdminProducts';

const { TabPane } = Tabs;
const Admin = () => {
    const { products } = useSelector((state) => state.products);
    // useEffect(() => {
    //     if (!localStorage.getItem("token")) {
    //         window.location.href = "admin-login";
    //     }
    // }, []);

    return (
        <div>
            <Header />
            <Container>
            <div className='flex gap-10 items-center px-5 py-2 justify-between mt-4'>
                <div className='flex gap-10 items-center'>
                    <h1 className='text-3xl text-primary  '>Portfolio Admin</h1>
                    <div className='w-60 h-[1px] bg-gray-500'>

                    </div>
                </div>
                <h1 className='underline text-primary text-xl cursor-pointer'
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/admin-login";
                    }}
                >
                    Log Out</h1>
            </div>
            </Container>
            {products && <div className='px-5 pb-10'>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Intro" key="1">
                        <AdminProducts />
                    </TabPane>
                </Tabs>
            </div>}
        </div>
    )
}

export default Admin