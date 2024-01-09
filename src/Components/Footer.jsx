import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div style={{background:'blueviolet'}} className='text-white mt-5 '>
    <div className='d-flex justify-content-between container mt-4 ' style={{height:'250px'}}>
      <div style={{width:'350px'}}>
      <h4><i class="fa-solid fa-truck-fast"></i>&nbsp;E Cart</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt tempora ipsam molestiae odio corporis corrupti eius. Consequatur eligendi odit accusantium laborum debitis architecto. Repellat iusto porro obcaecati reiciendis quibusdam dicta!</p>
      </div>
      <div style={{width:'200px'}}>
        <h4>Links</h4>
          <p><Link to={'/'} style={{textDecoration:'none',color:'white'}}>Home</Link></p>
          <p><Link to={'/wishlist'} style={{textDecoration:'none',color:'white'}}>WishList</Link></p>
          <p><Link to={'/cart'} style={{textDecoration:'none',color:'white'}}>Cart</Link></p>
      </div>
      <div style={{width:'200px'}}>
        <h4>Guides</h4>
          <p><a href="" className='text-decoration-none text-white ' >React</a></p>
          <p><a href="" className='text-decoration-none text-white '>React Bootstrap</a></p>
          <p><a href="" className='text-decoration-none text-white '>React Routing</a></p>
      </div>
      <div style={{width:'350px'}}>
        <h4>Contact Us</h4>
        <div className='d-flex'>
        <input placeholder='Enter Your E-mail' type="text" className="form-control" />
        <button className='btn btn-info ms-3'><i class="fa-solid fa-arrow-right"></i></button>
        </div>
        <div className='fs-4 overflow-y-hidden  text-white d-flex justify-content-between mt-3'>
        <i class="fa-solid fa-envelope"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-github"></i>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-linkedin"></i>
        </div>
      </div>
    </div>
    <p className='text-center'>Copyright &copy; 2023 E-Cart. Built With React</p>
    </div>
  )
}

export default Footer