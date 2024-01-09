import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deQuantity, emptyCart, inQuantity, removeCart } from '../Redux/Slices/cartSlice'
import Header from '../components/Header'

function Cart() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const cart=useSelector(state=>state.cartReducer)
    const [cartTotalAmount,setCartTotalAmount]=useState()
    useEffect(()=>{
        if(cart?.length>0){
            setCartTotalAmount(cart.map(product=>product.totalPrice).reduce((p1,p2)=>p1+p2))
        }
        else{
            setCartTotalAmount(0)
        }
    },[cart])

    const handleCheckout=()=>{
        alert("Your order has successfully placed....Thank you for purchasing with us!")
        dispatch(emptyCart())
        navigate('/')
    }
    const handleDecrementCart=(product)=>{
        if(product.quantity==1){
            dispatch(removeCart(product.id))
        }
        else{
            dispatch(deQuantity(product))
        }
    }
  return (
    <div >
        <Header/>
        {cart?.length>0?<div className="row m-5">
            <div className="col-lg-8">
                <h3 className='mt-5'>Cart Summery</h3>
                <Table variant="light" className='text-white shadow mt-3 '>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product,index)=>(
                            <tr>
                            <th>{index+1}</th>
                            <th>{product.title}</th>
                            <th><img style={{height:'100px',width:'100px'}} src={product.thumbnail} alt="" /></th>
                            <th>
                               <div className='d-flex'>
                                <button onClick={()=>handleDecrementCart(product)} className='btn fw-bold'>-</button>
                               <input style={{width:'40px'}} type="text" className='form-control bg-white' value={product.quantity} readOnly />
                               <button onClick={()=>dispatch(inQuantity(product))} className='btn fw-bold '>+</button>
                               </div>
                            </th>
                            <th>$ {product.totalPrice}</th>
                            <th><button onClick={()=>dispatch(removeCart(product.id))} className='btn'><i className='fa-solid fa-trash text-danger'></i></button></th>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                <div className='float-end'>
                    <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger me-3'>Empty Cart</button>
                    <Link to={'/'} className='btn btn-primary '>Shop More</Link>
                </div>
            </div>
            <div className="col-lg-4  mt-5">
                <div className='d-flex bg-black flex-column border rounded p-4'>
                <h5>Total Product: <span className='fw-bolder'>{cart?.length}</span></h5>
                <h3>Total Amount: <span className='fw-bolder'>$ {cartTotalAmount}</span></h3>
                <hr />
                <div className='d-grid'>
                    <button onClick={handleCheckout} className='btn btn-success'>CHECKOUT</button>
                </div>
                </div>
            </div>
        </div>:
        <div className='text-center bg-white'>
        <img style={{width:'50%',height:'500px'}} src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif" alt="" />
        <h1 className='mt-3 text-black '>Your Cart is Empty</h1>
        <Link className='btn btn-success mb-3' to={'/'}>Go to home and Purchase</Link>
      </div>
       }
    </div>
  )
}

export default Cart