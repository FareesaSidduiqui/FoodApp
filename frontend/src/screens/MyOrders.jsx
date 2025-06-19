import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { fetchWithAuth } from '../utils/fetchWithAuth';  // Adjust the import path based on your file structure

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const response = await fetchWithAuth('https://foodapp-backend-65ev.onrender.com/api/myorderData', 'POST', {
        email: localStorage.getItem('UserEmail')  // Or use 'email' based on how you store it
      });

      setOrderData(response.data.myData);  // Assuming response.data contains 'myData'
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData && orderData.order_data.length > 0 ? (
            orderData.order_data.slice(0).reverse().map((orderBlock, index) => (
              <div key={index} className="w-100">
                <h5 className="mt-5 text-center">Order Date: {orderBlock.order_date}</h5>
                <hr />
                <div className="d-flex flex-wrap">
                  {orderBlock.items.map((item, idx) => (
                    <div key={idx} className='col-12 col-md-6 col-lg-3'>
                      <div className="card mt-3 mx-2" style={{ width: "16rem", maxHeight: "360px" }}>
                        <img src={item.img || "https://via.placeholder.com/150"} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "cover" }} />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className='container w-100 p-0'>
                            <span className='m-1'>Qty: {item.qty}</span>
                            <span className='m-1'>Size: {item.size}</span>
                            <div className='d-inline ms-2 fs-5'>
                              Rs.{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className='text-center mt-5'>
              <h4>No Orders Found</h4>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
