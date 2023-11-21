import { useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
function Header(props){
    const navigate = useNavigate();
    // const tongQty = useContext(UserContext)
    // const wish = useContext(UserContext)
  let x = localStorage.getItem("data")
    if(x){
      x = JSON.parse(x)
    }
    let qty = localStorage.getItem("qty")
    if(qty){
      qty = JSON.parse(qty)
    }
    let wishlist = localStorage.getItem("wishlist")
    if(wishlist){
      wishlist = JSON.parse(wishlist)
    }
  function renderQty(){
      return(
      <li><span>{qty}</span><Link to="/cart"><i className="fa fa-shopping-cart" /> Cart</Link></li>
      )
    
  }
  function renderWish(){
  return(
  <li><span>{wishlist}</span><Link to="/wish-list"><i className="fa fa-star" /> Wishlist</Link></li>
  )
  }
  function renderButton(){
    
    if(x == true){
      return(
          <li><a onClick={logout} id="card"><i className="fa fa-fa-shopping-cart" /> Logout</a></li>
      )
    }else{
      return(
         <li><Link to="/login"><i className="fa fa-lock" /> Login</Link></li>
      )
    }
    function logout(){
      localStorage.clear();
      navigate("/login");
      
    }

  }
    return(
        <header id="header">{/*header*/}
        <div className="header_top">{/*header_top*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li><Link to><i className="fa fa-phone" /> +0348562990</Link></li>
                    <li><Link to><i className="fa fa-envelope" /> tuantalavua@gmail.com.com</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li><a href="https://www.facebook.com/anhtuanquen/"><i className="fa fa-facebook" /></a></li>
                    <li><Link to><i className="fa fa-twitter" /></Link></li>
                    <li><Link to><i className="fa fa-linkedin" /></Link></li>
                    <li><Link to><i className="fa fa-dribbble" /></Link></li>
                    <li><Link to><i className="fa fa-google-plus" /></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/header_top*/}
        <div className="header-middle">{/*header-middle*/}
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to="index.html"><img src="images/home/logo.png" alt="" /></Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link to>Canada</Link></li>
                      <li><Link to>UK</Link></li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link to>Canadian Dollar</Link></li>
                      <li><Link to>Pound</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li><Link to="/user/update/account/"><i className="fa fa-user" /> Account</Link></li>
                    {renderWish()}
                    <li><Link to="checkout.html"><i className="fa fa-crosshairs" /> Checkout</Link></li>
                    {renderQty()}
                    {/* <li><Link to="/login"><i className="fa fa-lock" /> Login</Link></li> */}
                    {renderButton()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/header-middle*/}
        <div className="header-bottom">{/*header-bottom*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li><Link  to="/" className="active">Home</Link></li>
                    <li className="dropdown"><a href="#">Shop<i className="fa fa-angle-down" /></a>
                      <ul role="menu" className="sub-menu">
                        <li><Link to="shop.html">Products</Link></li>
                        <li><Link to="product-details.html">Product Details</Link></li> 
                        <li><Link to="checkout.html">Checkout</Link></li> 
                        <li><Link to="cart.html">Cart</Link></li> 
                        <li><Link to="login.html">Login</Link></li> 
                      </ul>
                    </li> 
                    <li className="dropdown"><Link to="#" className="active">Blog<i className="fa fa-angle-down" /></Link>
                      <ul role="menu" className="sub-menu">
                        <li><Link to="/blog/list" >Blog List</Link></li>
                        <li><Link to="/blog/detail/">Blog Single</Link></li>
                      </ul>
                    </li> 
                    <li><Link to="404.html">404</Link></li>
                    <li><Link to="contact-us.html">Contact</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}
export default Header;