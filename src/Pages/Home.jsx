import React, { useEffect } from 'react'
import { Card, Col, Row,Button,Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, onNavigateNext, onNavigatePrev } from '../Redux/Slices/productSlice'
import { addToWishlist } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'
import Header from '../components/Header'
function Home() {
  const dispatch=useDispatch()
  const {loading,products,error,productsPerPage,currentPage}=useSelector((state)=>state.productSlice)
  const {wishlist}=useSelector(state=>state.wishlistSlice)
  const totalPage=Math.ceil(products?.length/productsPerPage)
  const indexOfLastItem=currentPage * productsPerPage
  const indexOfFirstItem=indexOfLastItem-productsPerPage
  const visibleCards=products?.slice(indexOfFirstItem,indexOfLastItem)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  const handleWishlist=(product)=>{
    const existingProduct=wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product already exist!!!")
    }
    else{
      dispatch(addToWishlist(product))
    }
  }

  const navigatePrev=()=>{
    if(currentPage!=1){
      dispatch(onNavigatePrev())
    }
  }
  const navigateNext=()=>{
    if(currentPage!=totalPage){
      dispatch(onNavigateNext())
    }
  }

  return (
    <>
    <Header insideHome/>
    <div style={{marginTop:'60px'}}>
      {
        !loading&&error ?<div className='mt-5 text-center text-danger fw-bold fs-2'>
        Api call failed!!!
        </div>:null
      }
      {
        loading?<div className='text-center mt-5 '><Spinner animation="border" variant="warning" />
        </div>:
        <Row className='m-5 container '>
        {products?.length>0?visibleCards.map((product,index)=>(
          <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
          <Card className='shadow rounded bg-white' style={{ width: '18rem' }}>
        <Link to={`/view/${product.id}`}><Card.Img style={{height:'180px'}} variant="top" src={product.thumbnail} />
        </Link>
        <Card.Body>
          <Card.Title className='text-black'>{product.title.slice(0,20)}...</Card.Title>
          <div className="d-flex justify-content-between">
            <Button onClick={()=>handleWishlist(product)} className='btn bg-white border-0   fs-5'><i class="fa-solid fa-heart text-danger "></i></Button>
            <Button onClick={()=>dispatch(addtoCart(product))} className='btn bg-white border-0   fs-5'><i class="fa-solid fa-cart-plus text-success "></i></Button>
          </div>
        </Card.Body>
      </Card>
          </Col>
        )):
        !error&&<div className='mt-5 text-center text-danger fw-bold fs-2'>Products Not Found!!!</div>
        }
        <div className="d-flex  justify-content-center align-items-center">
          <div style={{width:'150px'}} className='text-dark  d-flex justify-content-between '>
          <h5 onClick={navigatePrev} style={{cursor:'pointer'}} ><i class="fa-solid fa-backward text-dark "></i></h5>
          <h5>{currentPage} of {totalPage}</h5>
          <h5 onClick={navigateNext} style={{cursor:'pointer'}}><i class="fa-solid fa-forward text-dark"></i></h5>
          </div>
        </div>
      </Row>
      }

    </div>
    </>
  )
}

export default Home