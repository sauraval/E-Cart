import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'


function View() {
  const {id} = useParams()
console.log(id);
  const {loading} = useSelector((state)=>state.productSlice)
  const {wishlist} = useSelector(state=>state.wishlistSlice)
  const [product,setProduct] = useState({})
  const dispatch = useDispatch()
  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products.find(product=>product.id==id))
  },[])
  const handleWishlist = (product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product already exist!!!")
    }else{
      dispatch(addToWishlist(product))
    }
  }
  console.log(product);
  return (
    <div className='mt-5 container'>
     {
     loading?<div className='d-flex justify-content-center mt-5'><Spinner className='me-3' animation='border' variant='danger'/>Loading...</div>:
     <div className='row mt-3 align-items-center '>
        <div className='col-md-4 '>
          <img style={{height:'400px', width:'100%'}} src={product?.thumbnail} alt="" />
        </div>
        <div className='col-md-2'></div>
        <div className='col-md-6 text-dark'>
          <p>PID:{product?.id}</p>
          <h1>{product?.title}</h1>
          <h5 className='fw-bolder'>{product?.price}</h5>
          <p className='text-dark' style={{textAlign:'justify'}}><span className='fw-bold text-dark'>Description: </span> 
          {product?.description}
          </p>
          <div className='d-flex justify-content-between mt-4'>
              <button onClick={()=>handleWishlist(product)} className='btn btn-outline-dark fs-5'>
              <i class="fa-solid fa-heart text-danger "></i>Wishlist
              </button>
              <button onClick={()=>dispatch(addtoCart(product))} className='btn btn-outline-dark fs-5'>
              <i class="fa-solid fa-cart-plus text-success "></i>Cart
              </button>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default View