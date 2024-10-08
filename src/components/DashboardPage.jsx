import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCaretRight } from "react-icons/ai";
import DashboardSidebar from '../components/DashboardSidebar';
import OrderStatusSummary from '../components/OrderStatusSummary';
import OrdersTable from '../components/OrdersTable';

const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [canceledOrders, setCanceledOrders] = useState(0);
    const [processingOrders, setProcessingOrders] = useState(0);
    const [searchTerm, setSearchTerm] = useState(""); 
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: "66ef3105c0bc3df34401f3b2", price: 70 })
                });
                if (!response.ok) { 
                    const errorData = await response.json(); 
                    console.error('Error from API:', errorData); 
                    return; 
                }

                const data = await response.json();
                console.log('Fetched orders:', data);
                setOrders(data.orders);
                updateOrderCounts(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderCounts = (orders) => {
        const completedCount = orders.filter(order => order.status === 'Completed').length;
        const canceledCount = orders.filter(order => order.status === 'Canceled').length;
        const processingCount = orders.filter(order => order.status === 'Processing').length;

        setCompletedOrders(completedCount);
        setCanceledOrders(canceledCount);
        setProcessingOrders(processingCount);
    };

    const handleUpdateCompletedOrders = (count) => {
        setCompletedOrders(count);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
      <div className="container mx-auto mt-10">
        <nav className="mb-5 flex mt-4 space-x-4 items-center">
          <Link to="/" className="text-gray-500">Dashboard</Link>
          <AiFillCaretRight className='flex' />
          <span className='text-black'>Orders</span>
        </nav>
        <div className='flex flex-col md:flex-row'> 
          <DashboardSidebar />
          <div className="flex-1 p-4">
            <OrderStatusSummary 
              completed={completedOrders} 
              canceled={canceledOrders} 
              processing={processingOrders} 
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-2 mb-4 w-full"
            />
            <OrdersTable 
              initialOrders={orders} 
              searchTerm={searchTerm}
              onUpdateCompleted={handleUpdateCompletedOrders} 
            />
          </div>
        </div>
      </div>
    );
};

export default DashboardPage;
