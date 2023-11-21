import { useEffect, useState } from "react";
import Erros from "../Member/Erros";
import axios from 'axios'
import { useParams } from "react-router-dom";
function Edit(props){
    let params = useParams();
    const [data, setData] = useState("")
    const [input, setInput] = useState({
        name: "",
        price: "",
        brand: "",
        category: "",
        status: 1,
        company: "",
        detail: "",
        sale: 0
    })
    const [avatar, setAvatar] = useState("")
    const [errE, setErrE] = useState({})
    const [optionBrand, setOptionBrand] = useState("")
    const [optionCategory, setOptionCategory] = useState("")
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
        axios.get("http://localhost/laravel8/laravel8/public/api/user/product/" +params.id, config)
            .then(res => {
                setData(res.data.data.image)
               let x = res.data.data
               setInput({
                name: x["name"],
                price: x["price"],
                brand: x["id_brand"],
                category: x["id_brand"],
                company: x["company_profile"],
                detail: x["detail"],
                status: x["status"],
                sale: x["sale"]
               })
            })
            .catch(erros => console.log(erros))
    }, [])

    useEffect(() => {
        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
            .then(res => {
                setOptionBrand(res.data.brand)
                setOptionCategory(res.data.category)
            })
            .catch(erros => console.log(erros))
    }, [])
    function renderCheck(){
        if(Object.keys(data).length > 0){
            return Object.keys(data).map((key, index) =>{
                return(
                     <div className="checkbox_list">
                        <label for="avatar"> <img src={"http://localhost/laravel8/laravel8//public/upload/product/" + x["id"] + "/" + data[key]} alt="" /></label>
                        <input type="checkbox" id={data[key]} value="avatar" onClick={handleCheck}/>
                    </div>
                )
            })
        }
    }
    function renderOption() {
        if (optionBrand.length > 0) {
            return optionBrand.map((value, key) => {
                return (
                    <option key={key} value={value["id"]} > {value["brand"]}</option>
                )
            })
        }
    }
    function renderOption1() {
        if (optionCategory.length > 0) {
            return optionCategory.map((value, key) => {
                return (
                    <option key={key} value={value["id"]} > {value["category"]}</option>
                )
            })
        }
    }
    function renderSale() {
        if (input.status == 0) {
            return (
                <input type="number" name="sale" onChange={handleInput} />
            )
        }

        
    }
    const [checkBox, setCheck] =useState([])
    function handleCheck(e){
        if(e.target.checked){
            let value = e.target.id
            setCheck(state =>[...state, value])
            
        } else {
            let newAvatar = checkBox.filter(element => element !== e.target.id);
            setCheck(newAvatar)
            console.log(newAvatar)
        }  
    }
    function handleFile(e) {
        setAvatar(e.target.files)
    }
    function handleInput(e) {
        let getName = e.target.name;
        let value = e.target.value;
        setInput(state => ({ ...state, [getName]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errSubmit = {}
        let flag = true;
        if (input.name == "") {
            errSubmit.name = " cần nhập name "
            flag = false;
        }
        if (input.price == "") {
            errSubmit.price = " cần nhập price"
            flag = false
        }
        if (input.brand == "") {
            errSubmit.brand = " cần nhập brand"
            flag = false;
        }
        if (input.category == "") {
            errSubmit.category = " cần nhập category"
            flag = false;
        }
        if (input.status == "") {
            errSubmit.status = " cần nhập status"
            flag = false;
        }
        if (input.detail == "") {
            errSubmit.detail = " cần nhập detail"
            flag = false;
        }
        if (input.company == "") {
            errSubmit.company = " cần nhập company"
            flag = false;
        }
        if((avatar.length + data.length) - checkBox.length > 3 ){
            errSubmit.avatar =" vượt quá 3 file "
            flag = false;
        }

        if (avatar == "") {
            errSubmit.avatar = "cần chọn file"
            flag = false
        }
        else {

            Object.keys(avatar).map((key, index) => {
                let checkImg = ["png"];
                let size = avatar[key]["size"]
                let name = avatar[key]["name"]
                let split = name.split(".")
                let png = split[1]
                if (size > 1024 * 1024) {
                    errSubmit.avatar = " file vượt quá 1 mb"
                    flag = false
                }
                if (png != checkImg) {
                    errSubmit.avatar = "file không hợp lệ"
                    flag = false
                }
                if (avatar.length > 3) {
                    errSubmit.avatar = "toi da 3 file"
                    flag = false
                }

            })
        }
        if (!flag) {
            setErrE(errSubmit)
        } else {
            const formData = new FormData();
            formData.append('name', input.name);
            formData.append('price', input.price);
            formData.append('brand', input.brand);
            formData.append('category', input.category);
            formData.append('status', input.status);
            formData.append('company', input.company);
            formData.append('detail', input.detail);
            formData.append('sale', 0);
            Object.keys(avatar).map((item, i) => {
                formData.append("file[]", avatar[item])
            });
            Object.keys(checkBox).map((item, i) => {
                formData.append("avatarCheckBox[]", checkBox[item])
            });
          
            setErrE("")
            alert("add thành công")
            axios.post("http://localhost/laravel8/laravel8/public/api/user/product/update/" + params.id, formData, config)
                .then(res => {
                    console.log(res)
                })
                .catch(erros => console.log(erros))
        }
    }
    return(
        <div class="signup-form">
        <h2>Create product!</h2>
        <Erros errE={errE} />
        <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit} >
            <input type="text" placeholder="Name" value={input.name} name="name" onChange={handleInput} />

            <input type="text" placeholder="Price" value={input.value} name="price" onChange={handleInput} />
            <select name="brand" value={input.brand} onChange={handleInput} >
                <option value="" disabled selected>Please choose brand</option>
                {renderOption()}
            </select>
            <select name="category" value={input.category} onChange={handleInput} >
                <option value="" disabled selected>Please choose category</option>
                {renderOption1()}
            </select>
            <select name="status" value={input.status} onChange={handleInput} >
                <option value={1}> new </option>
                <option value={0}> sale </option>
            </select>
            {renderSale()}
            <input type="text" placeholder="Company profile"value={input.company} name="company" onChange={handleInput} />
            <input type="file" name="avatar" multiple onChange={handleFile} />
            {renderCheck()}
            <textarea placeholder="Detail" value={input.detail} name="detail" onChange={handleInput} />
            <button type="submit" class="btn btn-default">update product</button>
        </form>
    </div>
    )
}
export default Edit;