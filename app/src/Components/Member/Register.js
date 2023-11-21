import { useState } from "react";
import Erros from "./Erros";
import axios from 'axios'
function Register(props){

    const [input, setInput] = useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        level:"0"
        
    })
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
    function IsEmail(email) {
        var regex =
/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        let errSubmit ={}
        let flag = true;

        
        if(input.name ==""){
            errSubmit.name = " cần nhập name "
            flag = false;
          }
          if(input.email == ""){
            errSubmit.email = " cần nhập email"
            flag = false;
          } else if(IsEmail(input.email) == false){
            errSubmit.email = "nhập sai định dạng"
            flag = false
          }
          if(input.password == ""){
            errSubmit.password = " cần nhập password"
            flag = false
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
            const data ={
                name : input.name,
                email: input.email,
                password : input.password,
                phone: input.phone,
                address: input.address,
                avatar : avatar,
                level : input.level

            }
            setErrE("")
            alert("đăng kí thành công")
            axios.post("http://localhost/laravel8/laravel8/public/api/register", data)
            .then(res =>{
                console.log(res)
            })
            .catch(erros =>console.log(erros))
          }

    }
    

    return(
        <div class="signup-form">
						<h2>New User Signup!</h2>
                        <Erros errE={errE}/>
						<form action="#" enctype="multipart/form-data"  onSubmit={handleSubmit} >
						              	<input type="text" placeholder="Name" name="name" onChange={handleInput} />
                            
							              <input type="text" placeholder="Email Address" name="email" onChange={handleInput}/>
							
                            <input type="text" placeholder="Password" name="password" onChange={handleInput}/>
                            
                            <input type="text" placeholder="Phone" name="phone" onChange={handleInput} />
                           
                            <input type="text" placeholder="Address" name="address" onChange={handleInput} />
                            
                            <input type="file"  name="avatar" onChange={handleFile} />
                            <input type="number" name="level" value={input.level}/>
                           
                            
                            {/* <input type="text" placeholder="Level" name="level" onChange={handleInput} />
							<p class="enter_level"></p> */}
                            <button type="submit" class="btn btn-default">Signup</button>
						</form>
					</div>
    )
}
export default Register;