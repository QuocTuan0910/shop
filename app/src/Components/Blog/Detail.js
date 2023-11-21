import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from './Comment'
import axios from 'axios'
import Listcomment from "./Listcomment";
import Rate from "./Rate";
function Details(props){
  let params = useParams();
  const [getItem, setItem] = useState("");
  const [listCmt, setListCmt] = useState({})
  const [reply, setReply] = useState("")
  function getCmt(data){

    setListCmt(listCmt.concat(data))
    // console.log(listCmt.concat(data))
  }
  function getReply(data){
    setReply(data)
  }
  useEffect(() =>{
    axios.get("http://localhost/laravel8/laravel8/public/api/blog/detail/" + params.id)
    .then(res =>{
      setItem(res.data.data)
      setListCmt(res.data.data.comment)
    })
    .catch(error => console.log(error));
  },[])
  // console.log(listCmt)
  function renderList(){
    return (
      <div className="single-blog-post">
       <h3> {getItem["title"]}</h3>
       <div className="post-meta">
         <ul>
           <li><i className="fa fa-user" /> Mac Doe</li>
           <li><i className="fa fa-clock-o" /> 1:33 pm</li>
           <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
         </ul>
        
       </div>
       <a href>
         <img src={"http://localhost/laravel8/laravel8//public/upload/Blog/image/"+ getItem["image"]} alt="" />
       </a>
        <h1>{getItem["description"]}</h1>
       <div className="pager-area">
         <ul className="pager pull-right">
           <li><a href="#">Pre</a></li>
           <li><a href="#">Next</a></li>
         </ul>
       </div>
     </div>
 )
  }
    return(
        <>
        <div className='col-sm-9'>
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {renderList()}

        </div>
        <div className="rating-area">
       
          <Rate/>
          <ul className="tag">
            <li>TAG:</li>
            <li><a className="color" href>Pink <span>/</span></a></li>
            <li><a className="color" href>T-Shirt <span>/</span></a></li>
            <li><a className="color" href>Girls</a></li>
          </ul>
        </div>
        <div className="socials-share">
          <a href><img src="images/blog/socials.png" alt="" /></a>
        </div>
      
        <div className="response-area">
          <h2>{listCmt.length} RESPONSES</h2>
          <Listcomment getReply={getReply} listCmt={listCmt}/>    
        </div>
        <div className="replay-box">
          <div className="row">
            <div  id="cmt" className="col-sm-12">
              <h2>Leave a replay</h2>
              <Comment reply={reply} getCmt={getCmt}/>
            </div>
          </div>
        </div>
        </div>
        </>
    )
}
export default Details;