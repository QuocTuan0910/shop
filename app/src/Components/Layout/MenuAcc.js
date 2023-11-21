import { Link } from "react-router-dom";

 function MenuAcc(props){

    return(
        <div className="left-sidebar">
        <h2>Account</h2>
        <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title"><Link to="/user/update/account/">account  <Link > <i className="fa fa-plus"></i> </Link> </Link></h4>
             
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title"><Link to="/user/update/account/my-product/">My product <Link to={"/user/update/account/add-product/"}> <i className="fa fa-plus"></i> </Link> </Link></h4>
            </div>
          </div>
        </div>{/*/category-products*/}
      </div>

    )
 }
 export default MenuAcc;