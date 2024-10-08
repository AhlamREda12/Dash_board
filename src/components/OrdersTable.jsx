import { useState } from 'react';
import { FaRegEye, FaCheckCircle } from 'react-icons/fa';

const OrdersTable = ({ initialOrders, onUpdateCompleted }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        order.status = order.status === 'Completed' ? 'Processing' : 'Completed';
      }
      return order;
    });

    setOrders(updatedOrders);
    const completedCount = updatedOrders.filter(order => order.status === 'Completed').length;
    onUpdateCompleted(completedCount);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter(order =>
    order.orderNumber.includes(searchTerm) || order.seller.includes(searchTerm)
  );

  return (
    <div className="overflow-x-auto">
      <h2 className='text-2xl font-bold mb-4'>All orders</h2>
      {/* <input
        type="text"
        placeholder="Search by order number or seller"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded p-2 mb-4"
      /> */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-4">
              <input
                className="h-5 w-5 border-2 border-gray-500 rounded"
                type="checkbox" />
            </th>
            <th className="px-6 py-6 text-sm md:text-base">Order number</th>
            <th className="px-6 py-6 text-sm md:text-base hidden sm:table-cell">Order date</th>
            <th className="px-6 py-6 text-sm md:text-base">Seller</th>
            <th className="px-6 py-6 text-sm md:text-base hidden lg:table-cell">Price</th>
            <th className="px-6 py-6 text-sm md:text-base">Order status</th>
            <th className="px-6 py-6 text-sm md:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id} className="border-b border-slate-100">
              <td className="px-4 py-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-2 border-gray-500 rounded"
                  checked={order.status === 'Completed'}
                  onChange={() => handleCheckboxChange(order.id)}
                />
              </td>
              <td className="px-6 py-6 text-sm md:text-base">{order.orderNumber}</td>
              <td className="px-6 py-6 text-sm md:text-base hidden sm:table-cell">{order.orderDate}</td>
              <td className="px-6 py-6 text-sm md:text-base">{order.seller}</td>
              <td className="px-6 py-6 text-sm md:text-base hidden lg:table-cell">{order.price}</td>
              <td className="px-6 py-6 text-sm md:text-base">
                {order.status === 'Completed' ?
                  <FaCheckCircle className="text-green-500" /> :
                  <span>{order.status}</span>
                }
              </td>
              <td className="px-10 py-6">
                <FaRegEye className='text-green-500 ' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
