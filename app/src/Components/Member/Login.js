import { useState } from "react"
import axios from 'axios'
import Erros from "./Erros";
import {useNavigate} from "react-router-dom"
function Login(props){
    const [getInput, setInput] = useState({
        email:"",
        password:"",
        level:"0"
    })
    const [errE, setErrE] = useState({})
    const navigate = useNavigate();
   
    
    function handleInput(e){
        let getName = e.target.name
        let value = e.target.value
        setInput(state =>({...state,[getName]:value}))
    }
    function handleSubmit(e){
        e.preventDefault();
        let errSubmit = {};
        let flag = true
        if(getInput.email ==""){
            errSubmit.email = "cần nhập email"
        }else if(IsEmail(getInput.email) == false){
            errSubmit.email = "nhap sai dinh dang"
            flag = false
          } 
          if(getInput.password == ""){
            errSubmit.password = " cần nhập password"
            flag = false
          }
          if(!flag){
            setErrE(errSubmit)
          } else {
            const data ={   
                email : getInput.email,
                password: getInput.password,
                level: getInput.level

            }
            axios.post("http://localhost/laravel8/laravel8/public/api/login", data)
            .then(res =>{
                if(res.data.errors){
                    setErrE(res.data.errors);
                } else{
                    console.log(res)
                    setErrE("")
                    alert("thành công")
                    navigate("/")
                    let x = true;
                       
                    let y = res.data.Auth;
                    let z = res.data.token;                   
                    localStorage.setItem("data", JSON.stringify(x));
                    localStorage.setItem("data1", JSON.stringify(y));
                    localStorage.setItem("data2", JSON.stringify(z));
                    // localStorage.setItem("user", JSON.stringify(res.data))

                   
                }
            })
          }
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
    return(
        <div class="login-form">
						<h2>Login to your account</h2>
						<form action="#" onSubmit={handleSubmit}>
                            <Erros errE={errE}/>
							<input type="text" placeholder="Email Address" name="email" onChange={handleInput}/>
                            <input type="text" placeholder="password" name="password" onChange={handleInput}  />
							<input type="number" name="level" value={getInput.level} />
                            <span>
								<input type="checkbox" class="checkbox" /> 
								Keep me signed in
							</span>
							<button type="submit" class="btn btn-default">Login</button>
						</form>
					</div>
    )
}
export default Login