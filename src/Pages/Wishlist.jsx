import React from 'react'
import { Card, Col, Row,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'
import Header from '../components/Header'
function Wishlist() {
  const dispatch=useDispatch()
  const wishlist=useSelector(state=>state.wishlistSlice.wishlist)

  const handleCart=(product)=>{
    dispatch(removeFromWishlist(product.id))
    dispatch(addtoCart(product))
  }

  return (
    <div>
      <Header/>
        <Row>
        {wishlist?.length>0?wishlist.map((product)=>(
         <Col  className='m-3' sm={12} md={6} lg={4} xl={3}>
          <Card className='shadow rounded bg-white' style={{ width: '18rem' }}>
        <Link to={`/view/${product.id}`}><Card.Img style={{height:'180px'}} variant="top" src={product.thumbnail} />
        </Link>
        <Card.Body>
          <Card.Title className='text-black'>{product.title.slice(0,20)}...</Card.Title>
          <div className="d-flex justify-content-between">
            <Button onClick={()=>dispatch(removeFromWishlist(product.id))} className='btn bg-white border-0   fs-5'><i class="fa-solid fa-heart-circle-xmark text-danger "></i></Button>
            <Button onClick={()=>handleCart(product)} className='btn bg-white border-0   fs-5'><i class="fa-solid fa-cart-plus text-success "></i></Button>
          </div>
        </Card.Body>
      </Card>
          </Col>
        )):
        <div className='text-center bg-white'>
          <img style={{width:'50%',height:'500px'}} src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif" alt="" />
          <h1 className='mt-3 text-black '>Your Wishlist is Empty</h1>
          <Link className='btn btn-success mb-3' to={'/'}>Go to home and Purchase</Link>
        </div>
        }
      </Row>
    </div>
  )
}

export default Wishlist