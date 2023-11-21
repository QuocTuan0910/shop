import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext"

function Cart(props) {
    const user = useContext(UserContext)

    let xx = localStorage.getItem("cart")
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

    let sum = 0
    Object.keys(getData).map((key, index) =>{
        sum =(parseInt(getData[key]["price"]) * parseInt(getData[key]["qty"])) + sum
    })

    function handleUp(e) {
        let newData =[...getData]
        newData.map((value, key) =>{
            if(newData[key]["id"] == e.target.id){
                newData[key]["qty"] += 1
                setData(newData)
            }
        })
    }
    function handleDown(e){
        let newData = [...getData]
        newData.map((value, key) =>{
            if(newData[key]["id"] == e.target.id){
                newData[key]["qty"] -= 1
                setData(newData)
                if(newData[key]["qty"] < 1){
                    delete newData[key]           
                    let removeEmpty = newData.filter(element => element !== "empty")
                    setData(removeEmpty)
                }
            } 
           
        })
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
   function renderTotal(){
            return(
                <>
                 <div className="total_area">
                <ul>
                  <li>Cart Sub Total <span>${sum}</span></li>
                  <li>Eco Tax <span>$2</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  <li>Total <span>${sum}</span></li>
                </ul>
                <a className="btn btn-default update" href>Update</a>
                <a className="btn btn-default check_out" href>Check Out</a>
              </div>
                </>

            )
        
   }

    function renderItemCart() {
        if (getData.length > 0) {
            return getData.map((value, key) => {
                let abc = [getData[key]["image"]]
                if (abc) {
                    abc = JSON.parse(abc)
                }
                let total = parseInt(getData[key]["price"]) * parseInt(getData[key]["qty"])
                return (
                    <tr>
                        <td className="cart_product">
                            <a href><img src={"http://localhost/laravel8/laravel8//public/upload/product/" + x["id"] + "/" + abc["0"]} alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{getData[key]["name"]}</a></h4>
                            <p>Web ID: {getData[key]["id"]}</p>
                        </td>
                        <td className="cart_price">
                            <p>${getData[key]["price"]}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" id={getData[key]["id"]} onClick={handleUp}> + </a>
                                <input className="cart_quantity_input" type="text" name="quantity" value={getData[key]["qty"]} autoComplete="off" size={2} />
                                <a className="cart_quantity_down" id={getData[key]["id"]} onClick={handleDown}> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">$ {total}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" id={getData[key]["id"]} href onClick={handleDelete}>delete</a>
                        </td>
                    </tr>

                )


            })
        }
    }
    return (
        <>
        <section id="cart_items">
            <div className="container">
                <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                </div>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                                <td className="image">Item</td>
                                <td className="description" />
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                                <td />
                            </tr>
                        </thead>
                        <tbody>
                            {renderItemCart()}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>Get Quotes</a>
                <a className="btn btn-default check_out" href>Continue</a>
              </div>
            </div>
            <div className="col-sm-6">
              {/* <div className="total_area">
                <ul>
                  <li>Cart Sub Total <span>$59</span></li>
                  <li>Eco Tax <span>$2</span></li>
                  <li>Shipping Cost <span>Free</span></li>
                  <li>Total <span>$61</span></li>
                </ul>
                <a className="btn btn-default update" href>Update</a>
                <a className="btn btn-default check_out" href>Check Out</a>
              </div> */}
                {renderTotal()}
            </div>
          </div>
        </div>
      </section>
        </>
    )
}
export default Cart;