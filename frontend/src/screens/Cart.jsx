import React from 'react'
import Delete from "@mui/icons-material/Delete";
import { UseCart, DispatchCart } from '../components/ContextReducer';
import { fetchWithAuth } from '../utils/fetchWithAuth'; // Make sure path is correct!

export default function Cart() {
  let data = UseCart();
  let dispatch = DispatchCart();

  if (!data || data.length === 0) {
    return (
      <div>
        <div className='m-5 p-5 w-100 fs-3 text-white' style={{ position:'relative',left:'20%'}}>The Cart is Empty!</div>
      </div>
    );
  }
  

  const handleCheckOut = async () => {
    try {
      let userEmail = localStorage.getItem("UserEmail");

      const bodyData = {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      };

      const response = await fetchWithAuth('https://foodapp-backend-65ev.onrender.com/api/orderData', 'POST', bodyData);

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      // Optionally show user an error toast here
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => dispatch({ type: "REMOVE", id:food.id })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
        </div>

        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  )
}
