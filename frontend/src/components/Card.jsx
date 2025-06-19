import React, { useState, useRef , useEffect } from "react";
import { UseCart, DispatchCart } from "./ContextReducer";

export default function Card({ foodItems, options }) {

  let dispatch = DispatchCart()
  let cartState = UseCart()
  const priceRef = useRef()

  // let priceOption = Object.keys(options)
  const [size ,setSize] = useState("")
  const [qty , setQty] = useState(1)
  async function handleAddtoCart() {
    // Handle adding to cart here
    await dispatch({type:'ADD',id:foodItems._id,name:foodItems.name,img:foodItems.img,price : finalPrice,qty:parseInt(qty),size:size})
    // console.log(cartState);  
  }
  
   let finalPrice = qty * parseInt(size)
   useEffect(()=>{
     setSize(priceRef.current.value)
    //  console.log(priceRef.current);
     
   },[])
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", height: "380px" }}>
        <img
          src={foodItems.img}
          className="card-img-top"
          alt="food image"
          style={{
            height: '180px',
            width: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: '0.375rem',
            borderTopRightRadius: '0.375rem'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1730929851365-015a0b62ae5b?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{foodItems.name}</h5>
          <p className="card-text">This is some important text.</p>

          {/* Spacer div to push content */}
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <select className="form-select w-50 me-2" onChange={(e)=>setQty(parseInt(e.target.value))}>
                {Array.from(Array(6), (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select className="form-select w-50" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {options.map((data) =>
                  Object.keys(data).map((key) => (
                    <option key={key} value={data[key]}>
                      {key} 
                    </option>
                  ))
                )}
                {/* { priceOption.map((data)=>{
                  return <option value={data} key={data}>{data}</option>
                })

                } */}
              </select>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="fs-5">PKR{finalPrice}</span>
              <button
                onClick={handleAddtoCart}
                className="btn btn-success ms-2"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
