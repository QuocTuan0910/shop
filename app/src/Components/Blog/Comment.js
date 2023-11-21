import { useState } from "react";
import { useParams } from "react-router-dom";
import Erros from "../Member/Erros";
import axios from "axios";
function Comment(props){
    const [input, setInput] = useState("")
    const [errE, setErrE] = useState({})
    let params = useParams();
    let x = localStorage.getItem("data")
    if(x){
        x = JSON.parse(x)
    }
    let y = localStorage.getItem("data1")
    if(y){
        y=JSON.parse(y)
    }
    let z = localStorage.getItem("data2")
    if(z){
        z=JSON.parse(z)
    }
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ z,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
    }	
 
    
    function handleInput(e){
        setInput(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        let errSubmit = {}
        let flag = true;
        if(x != true){
            errSubmit.message = " vui lòng login"
            flag = false;
        }else if(input == ""){
            errSubmit.message = " vui lòng nhập"
            flag =false;
        }
        if(!flag){
            setErrE(errSubmit)
        } 
        if(input){
            let {reply} = props
            const formData = new FormData();
            formData.append('id_blog', params.id);
            formData.append('id_user', y["id"]);
            formData.append('id_comment', reply ? reply : 0);
            formData.append('comment', input);
            formData.append('image_user', y["avatar"]);
            formData.append('name_user', y["name"]);
            let {getCmt} = props;
            axios.post("http://localhost/laravel8/laravel8/public/api/blog/comment/" + params.id, formData, config)
            .then(res =>{
                setErrE("")
                 getCmt(res.data.data)
                // console.log(res.data.data)
            })
            .catch(erros =>console.log(erros))
          }
        }
         return(
                <form enctype="multipart/form-data"  onSubmit={handleSubmit}>
                <Erros errE={errE}/>
                <textarea name="message"  rows={11} onChange={handleInput}> </textarea>
                <button className="btn btn-primary" type="submit">post comment</button>
                </form>
         )       
    

         }
export default Comment;