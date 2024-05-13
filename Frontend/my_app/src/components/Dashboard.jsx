 
import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
 import CrudComponent from './Crud';
 import "./Dashboard.css"
 
 
function Dashboard() {
    const data = [
        {
          name: 'Page A',
          2022: 4000,
          2023: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          2022: 3000,
          2023: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          2022: 2000,
          2023: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          2022: 2780,
          2023: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          2022: 1890,
          2023: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          2022: 2390,
          2023: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          2022: 3490,
          2023: 4300,
          amt: 2100,
        },
      ];
    const [dummydata, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [sellProducts, setSellProducts] = useState(253);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsResponse, usersResponse] = await Promise.all([
                fetch('https://behance-z9se.onrender.com/data'),
                fetch('https://behance-z9se.onrender.com/users')
            ]);
            
            const [productsData, usersData] = await Promise.all([
                productsResponse.json(),
                usersResponse.json()
            ]);
            
            setData(productsData);

            // Calculate total items, sell products, and total users
            let totalItemsCount = productsData.length;
            let totalSellProductsCount = productsData.filter(product => product.sold).length;
            let totalUsersCount = usersData.length;
           
            setTotalItems(totalItemsCount);
            setSellProducts(99);
            setTotalUsers(totalUsersCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
  
    return (
        <main className='main-container'>
            <div className='main-title'>
                <h1 style={{color:'lightblue'}}>Admin Panel</h1>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>TOTAL ITEMS</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{totalItems}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>SELL PRODUCTS</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>{sellProducts}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>TOTAL USERS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{totalUsers}</h1>
                </div>
            </div>
             
            
            <div className='charts'>
               
           
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="2023" fill="#8884d8" />
                <Bar dataKey="2022" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="2023" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="2022" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
            </div> 
            <div>
             <CrudComponent/>
             
             </div>          
        </main>
    );
}

export default Dashboard;

