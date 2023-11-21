import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router, Routes, Route 
}from "react-router-dom";

import App from './App'
import reportWebVitals from './reportWebVitals';
import Detail from './Components/Blog/Detail';
import Blog from './Components/Blog/Blog';
import Index from './Components/Member/Index'
import Home from './Components/Product/Home';
import UserUpdate from './Components/Member/UserUpdate';
import MyProduct from './Components/Product/MyProduct';
import AddProduct from './Components/Product/AddProduct';
import Edit from './Components/Product/Edit';
import ProductDetail from './Components/Product/ProductDetail';
import Cart from './Components/Product/Cart';
import Wishlist from './Components/Product/WishList';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home/>}/>
         <Route path='/blog/list' element={<Blog />} />   
         <Route path='/blog/detail/:id' element={< Detail/>} />  
         <Route path='/login' element={<Index/>}/> 
         <Route path='/user/update/account/' element ={<UserUpdate/>}/>
         <Route path='/user/update/account/my-product/' element={<MyProduct/>}/>
         <Route path='/user/update/account/add-product/' element={<AddProduct/>} />
         <Route path='/user/update/account/product/:id' element={<Edit/>}/>
         <Route path='/product-detail/:id' element={<ProductDetail/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/wish-list' element={<Wishlist/>}/>
        </Routes>
     </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
