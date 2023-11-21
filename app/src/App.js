
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import MenuLeft from './Components/Layout/MenuLeft'
import { useLocation } from 'react-router-dom';
import MenuAcc from './Components/Layout/MenuAcc';
import Cart from './Components/Product/Cart';
import { UserContext } from './UserContext';
import { useState } from 'react';

function App (props){
  let params1 = useLocation();
  const [tongQty, settongQty] = useState(0)
  const [wish, setWish] = useState(0)
  localStorage.setItem("qty", JSON.stringify(tongQty))
  localStorage.setItem("wishlist", JSON.stringify(wish))
  function handleMenuLeft(){
    if(params1['pathname'].includes("account")){
      return <MenuAcc/>;
    }else if(params1['pathname'].includes("cart")){
      return null;
    }else{
      return <MenuLeft/>;
    }
  }
  function getQty(data){
    settongQty(data)
  }
  function getWish(data){
    setWish(data)
  }
  return (
   <UserContext.Provider value={{
    tongQty:tongQty,
      getQty:getQty,
      wish:wish,
      getWish:getWish,
   }}>
   <>
   <Header tongQty={tongQty} wish={wish}/>
   <section>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-3'>
             {/* {params1['pathname'].includes("account") ? <MenuAcc/>  :   <MenuLeft/>} */}
             {handleMenuLeft()}
            </div>
           
             {props.children}
            
            
            
          </div>
        </div>
      </section>
   <Footer/>
   </>

   </UserContext.Provider>

      
  )
}
export default App