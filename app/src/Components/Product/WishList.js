import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../UserContext"

function Wishlist(props){
    let xx = localStorage.getItem("wish")
    if (xx) {
        xx = JSON.parse(xx)
    }
    let x = localStorage.getItem("data1")
    if (x) {
        x = JSON.parse(x)
    } 

    const [getData, setData] = useState({})

    useEffect(() => {
        axios.post("http://localhost/laravel8/laravel8/public/api/product/cart", xx)
            .then(res => {
               setData(res.data.data)
              
            })
            .catch(erros => console.log(erros))
    }, [])
    function handleClickAdd(e) {
        let sum = 0
        let obj = {}
        let qty = 1;
        let id = e.target.id
        let yy = localStorage.getItem("cart")
        if (yy) {
          obj = JSON.parse(yy)
          if (obj[id]) {
            qty = obj[id] + 1
          }
        }
        obj[id] = qty;
        Object.keys(obj).map((key, index) =>{
            sum = sum + parseInt(obj[key]) 
        })
        xx.getQty(sum)  
        localStorage.setItem("cart", JSON.stringify(obj))
      } 

      function handleDelete(e){
        let newData1 =[...getData]
        newData1.map((value, key) =>{
            if(newData1[key]["id"] == e.target.id){
                delete newData1[key]                
            }
            let removeEmpty = newData1.filter(element => element !== "empty")
                setData(removeEmpty)
            
        })
            
    }

    function renderItem(){
        if(getData.length > 0){
            return getData.map((value, key) =>{
                let abc = [getData[key]["image"]]
        if (abc) {
          abc = JSON.parse(abc)
        }
                return(
                    <div className="col-sm-4">
                    <div key={key} className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src={"http://localhost/laravel8/laravel8//public/upload/product/" + x["id"] + "/" + abc["0"]} alt="" />  <h2>${getData[key]["price"]}</h2>
                          <p>{getData[key]["name"]}</p>
                          <a className="btn btn-default add-to-cart" ><i className="fa fa-shopping-cart" onClick={handleClickAdd}/>Add to cart</a>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>${getData[key]["price"]}</h2>
                            <p>{getData[key]["name"]}</p>
                            <a id={getData[key]["id"]} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                          <li><a id={getData[key]["id"]} onClick={handleDelete} ><i className="fa fa-plus-square" />Remove wishlist</a></li>
                          <li><Link to={"/product-detail/" + getData[key]["id"]}><i className="fa fa-plus-square" />more</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
            })
        }
    }

    return(
        <>
        <div className='col-sm-9'>
        <div className="features_items">{/*features_items*/}
        <h2 className="title text-center">Wish list Items</h2>
        {renderItem()}
        </div>
      </div></>
    )
}
export default Wishlist