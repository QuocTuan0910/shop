import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProduct(props) {
  const [data, setData] = useState("")

  let x = localStorage.getItem("data1")
  if (x) {
    x = JSON.parse(x)
  }
  let z = localStorage.getItem("data2")
  if (z) {
    z = JSON.parse(z)
  }
  let config = {
    headers: {
      'Authorization': 'Bearer ' + z,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  }
  useEffect(() => {
    axios.get("http://localhost/laravel8/laravel8/public/api/user/my-product",  config)
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      })
      .catch(erros => console.log(erros))
  }, [])
  // console.log(data)



  function handleClick(e){
    let dele = e.target.id;
    // console.log(dele)
    axios.get("http://localhost/laravel8/laravel8/public/api/user/product/delete/" + dele, config )
    .then(res =>{
      setData(res.data.data)
    })
    .catch(erros => console.log(erros))
    // console.log(e.target.id)
    
  }
  function renderItem() {
    if (Object.keys(data).length > 0) {
      return Object.keys(data).map((key, index) => {
        let abc = [data[key]["image"]]
        if (abc) {
          abc = JSON.parse(abc)
        }
        return (
          <tr >
            <td className="cart_id">
              <p> {data[key]["id"]} </p>
            </td>
            <td className="cart_name">
              <p>{data[key]["name"]}</p>
            </td>
            <td className="cart_img">
              <a href=""><img src={"http://localhost/laravel8/laravel8//public/upload/product/" + x["id"] + "/" + abc["0"]} alt="" /></a>
            </td>
            <td className="cart_price">
              <p>${data[key]["price"]}</p>
            </td>
            <td className="cart_action">
              {/* <Link  className="product_edit" >edit</Link> */}
              <Link className="product_edit" to={"/user/update/account/product/" + data[key]["id"]} > edit</Link>
              <a id={data[key]["id"]} className="product_delete"  onClick={handleClick}>xoa</a>
            </td>
          </tr>
        )
      })
    }
  }
  return (
    <div className='col-sm-9'>
    <div className="table-responsive cart_info">
      <table className="table table-condensed">
        <thead>
          <tr className="cart_menu">
            <td className="id">id</td>
            <td className="name">Name</td>
            <td className="image">Image</td>
            <td className="price">Price</td>
            <td className="action">Action</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {renderItem()}
        </tbody>
      </table>
    </div>
    </div>
  )
}
export default MyProduct;