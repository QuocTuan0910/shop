import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
function Blog(props){
const [getItem, setItem] = useState("")
 useEffect(() =>{
    axios.get("http://localhost/laravel8/laravel8/public/api/blog")
    .then(res =>{
          setItem(res.data.blog)

    }).catch(error => console.log(error))
   
 }, [])
  function renderList(){
    if(Object.keys(getItem).length > 0){
      return getItem.data.map((value, key) =>{
        return (
          <>
          <div key={key} className="single-blog-post">
           <h3>{value.title}</h3>
          <div className="post-meta">
        <ul>
          <li><i className="fa fa-user" /> Mac Doe</li>
          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
        </ul>
        <span>
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star" />
          <i className="fa fa-star-half-o" />
        </span>
      </div>
      <a href>
        <img src={"http://localhost/laravel8/laravel8//public/upload/Blog/image/"+value.image} alt="" />
      </a>
      <p>{value.description}</p>
      <Link className="btn btn-primary" to={"/blog/detail/"  + value.id} >Read More</Link>
    </div>
          </>
        )
      })
    }

  }

return(
  <div className='col-sm-9'>
    <div className="blog-post-area">
    <h2 className="title text-center">Latest From our Blog</h2>
    {renderList()}
  </div>
  </div>
)
}
export default Blog;