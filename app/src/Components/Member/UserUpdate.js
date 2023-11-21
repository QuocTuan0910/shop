import Erros from "./Erros";
import { useEffect, useState } from "react";
import axios from "axios";
function UserUpdate(){
    const [input, setInput] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        id:""
        
    })
    let x = localStorage.getItem("data")
    if(x){
        x = JSON.parse(x)
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
    useEffect(() =>{
        let userData = localStorage.getItem("data1")
        if(userData){
            userData = JSON.parse(userData);
            setInput({
                name : userData["name"],
                email: userData["email"],
                password: userData["password"],
                address:userData["address"],
                phone: userData["phone"],
                id: userData["id"],
            });
        }
       
    },[])
    const [errE, setErrE] = useState({})
    const [getFile, setFile] = useState("")
    const [avatar, setAvatar] = useState({})
    function handleInput(e){
        let getName = e.target.name;
        let value = e.target.value;
        setInput(state=>({...state,[getName]:value}));
    }
    function handleFile(e){
        const file = e.target.files
            let reader = new FileReader();
            reader.onload = (e) =>{
                setAvatar(e.target.result);
                setFile(file[0])
            };
            reader.readAsDataURL(file[0])
    }
    function handleSubmit(e){
        e.preventDefault();
        let errSubmit ={}
        let flag = true;

        if(x != true){  
            errSubmit.message = " vui lòng login"
            flag = false;
        }
        if(input.name ==""){
            errSubmit.name = " cần nhập name "
            flag = false;
          }
          if(input.phone == ""){
            errSubmit.phone = "  cần nhập phone"
            flag = false;
          }
          if(input.address == ""){
            errSubmit.address =" cần nhập address"
            flag = false;
          }
          if(getFile ==""){
            errSubmit.avatar ="cần chọn file"
             flag =false
          } else{
            let checkImg =["png"];
            let size = getFile["size"]
            let name = getFile["name"]
            let split = name.split(".")
            let png = split[1]
            if(size > 1024 * 1024){
                errSubmit.avatar =" file vượt quá 1 mb"
                flag = false
            }
            if(png != checkImg){
                errSubmit.avatar = "file không hợp lệ"
                flag = false
            }
          }
          if(!flag){
            setErrE(errSubmit)
          }else{
            const formData = new FormData();
            formData.append('name', input.name);
            formData.append('email', input.email);
            formData.append('password', input.password);
            formData.append('phone', input.phone);
            formData.append('address', input.address);
            formData.append('avatar', avatar);
            setErrE("")
            alert("đăng kí thành công")
            axios.post("http://localhost/laravel8/laravel8/public/api/user/update/" + input.id, formData, config)
            .then(res =>{
                localStorage.setItem("data1", JSON.stringify(res.data.Auth))
                
            })
            .catch(erros =>console.log(erros))
          }
        }
    return(
      <div className='col-sm-9'>
        <div className="blog-post-area">
        <h2 className="title text-center">Update user</h2>
        <div className="signup-form">
          <h2>New User Signup!</h2>
             <Erros errE={errE}/>
            < form action="#" enctype="multipart/form-data" onSubmit={handleSubmit}  >
              <input type="text" placeholder="Name" value={input.name} name="name"  onChange={handleInput}/>
              <input type="text" placeholder="Email Address" value={input.email} name="email" readOnly  />
              
              <input type="text" placeholder="Password" name="password"/>
              
              <input type="text" placeholder="Phone" value={input.phone} name="phone"   onChange={handleInput} />
             
              <input type="text" placeholder="Address" value={input.address} name="address"  onChange={handleInput}/>
              
              <input type="file"  name="avatar" onChange={handleFile}  />
            <button type="submit" className="btn btn-default">Update</button>
          </form>
        </div>
      </div>
      </div>  
    )
}
export default UserUpdate;