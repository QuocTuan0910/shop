import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail(props) {
    const [data, setData] = useState("")
    let x = localStorage.getItem("data1")
if (x) {
  x = JSON.parse(x)
}
    let params = useParams("")
    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/product/detail/" + params.id)
            .then(res => {
                setData(res.data.data)
                // console.log(res.data.data)
            })
            .catch(erros => console.log(erros))
    }, [])
    function renderItem(){
        if(Object.keys(data).length > 0){
            let ab = data["image"]
            if(ab){
                ab = JSON.parse(ab)
            }
            return Object.keys(ab).map((key, index)=>{
                return(
                <a href><img src={"http://localhost/laravel8/laravel8//public/upload/product/" + x["id"] + "/" + ab[key]  } alt="" /></a>
                )
            })
        }
    }
    function handleShow(){

    }
    function renderProduct() {
        if (Object.keys(data).length > 0) {
                let abc = [data["image"]]
        if (abc) {
          abc = JSON.parse(abc)
        }
                return (
                    <div className="product-details">{/*product-details*/}
                        <div className="col-sm-5">
                            <div className="view-product">
                                <img src={"http://localhost/laravel8/laravel8//public/upload/product/" + x["id"] + "/" + abc["0"]  } alt="" />
                                <a href={"http://localhost/laravel8/laravel8//public/upload/product/"  + x["id"] + "/" + abc["0"] } rel="prettyPhoto"><h3 onClick={handleShow}>ZOOM</h3></a>
                            </div>
                            <div id="similar-product" className="carousel slide" data-ride="carousel">
                                {/* Wrapper for slides */}
                                <div className="carousel-inner">
                                    <div className="item active">
                                        {/* <a href><img src="images/product-details/similar1.jpg" alt="" /></a>
                                        <a href><img src="images/product-details/similar2.jpg" alt="" /></a>
                                        <a href><img src="images/product-details/similar3.jpg" alt="" /></a> */}
                                        {renderItem()}
                                    </div>
                                    <div className="item">
                                        {/* <a href><img src="images/product-details/similar1.jpg" alt="" /></a>
                                        <a href><img src="images/product-details/similar2.jpg" alt="" /></a>
                                        <a href><img src="images/product-details/similar3.jpg" alt="" /></a> */}
                                        {renderItem()}
                                    </div>
                                    <div className="item">
                                        {/* <a href><img src="images/product-details/similar1.jpg" alt="" /></a>
                                        <a href><img src="images/product-details/similar2.jpg" alt="" /></a>
                                        <a href><img src="images/product-details/similar3.jpg" alt="" /></a> */}
                                        {renderItem()}
                                    </div>
                                </div>
                                {/* Controls */}
                                <a className="left item-control" href="#similar-product" data-slide="prev">
                                    <i className="fa fa-angle-left" />
                                </a>
                                <a className="right item-control" href="#similar-product" data-slide="next">
                                    <i className="fa fa-angle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="product-information">{/*/product-information*/}
                                <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                <h2>{data["name"]}</h2>
                                <p>Web ID: 1089772</p>
                                <img src="images/product-details/rating.png" alt="" />
                                <span>
                                    <span>US ${data["price"]}</span>
                                    <label>Quantity:</label>
                                    <input type="text"  />
                                    <button type="button" className="btn btn-fefault cart">
                                        <i className="fa fa-shopping-cart" />
                                        Add to cart
                                    </button>
                                </span>
                                <p><b>Availability:</b> In Stock</p>
                                <p><b>Condition:</b> New</p>
                                <p><b>Brand:</b></p>
                                <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                            </div>{/*/product-information*/}
                        </div>
                    </div>
                )
          
        }
    }

    return (

        <>
        <div className='col-sm-9'>
        {renderProduct()}
        <div className="category-tab shop-details-tab">{/*category-tab*/}
        <div className="col-sm-12">
          <ul className="nav nav-tabs">
            <li><a href="#details" data-toggle="tab">Details</a></li>
            <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
            <li><a href="#tag" data-toggle="tab">Tag</a></li>
            <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade" id="details">
            <div className="col-sm-3">
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img src="images/home/gallery1.jpg" alt="" />
                    <h2>$56</h2>
                    <p>Easy Polo Black Edition</p>
                    <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane fade active in" id="reviews">
            <div className="col-sm-12">
              <ul>
                <li><a href><i className="fa fa-user" />EUGEN</a></li>
                <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li>
                <li><a href><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p><b>Write Your Review</b></p>
              <form action="#">
                <span>
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Email Address" />
                </span>
                <textarea name defaultValue={""} />
                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                <button type="button" className="btn btn-default pull-right">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
        
        </>

    )
}
export default ProductDetail;
