import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productSearch } from '../Redux/Slices/productSlice';

function Header({insideHome}) {
  const dispatch=useDispatch()
  const [wishlistCount,setWishlistCount]=useState(0)
  const [cartCount,setCartCount]=useState(0)
  const wishlist=useSelector(state=>state.wishlistSlice.wishlist)
  const cart=useSelector(state=>state.cartReducer)
  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  },[wishlist,cart])
  return (
    <div style={{background:'blueviolet'}}>
    <div style={{height:'70px'}} className='w-100 text-white  d-flex  justify-content-between px-5 py-3'>
       <div className='d-flex ms-1 '>
        <Link style={{textDecoration:'none',color:'white'}} to={'/'}><h4><i class="fa-solid fa-truck-fast"></i>&nbsp;E Cart</h4>
        </Link>
        </div>
        {insideHome&&<div>
          <input onChange={e=>dispatch(productSearch(e.target.value.toLowerCase()))} style={{width:'400px'}} type="text" className='form-control bg-white fw-bold' placeholder='search products!' />
        </div>}
        <div className='d-flex me-5 text-white'>
        <Link to={'/wishlist'}>
        <Button className='me-4 fw-bold ' variant="outline-light"><i class="fa-solid fa-heart text-danger "></i>&nbsp;WishList
        &nbsp;<Badge bg="white" className='text-black'>{wishlistCount}</Badge>
        </Button>
        </Link>

        <Link to={'/cart'}>
        <Button className='fw-bold ' variant="outline-light"><i class="fa-solid fa-cart-shopping text-success"></i>
        &nbsp;Cart
        &nbsp;<Badge bg="white" className='text-black'>{cartCount}</Badge>
        </Button>
        </Link>
        </div>
    </div>
    </div>
    
  )
}

export default Header