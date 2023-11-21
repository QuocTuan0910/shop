import { useEffect, useState } from "react";
import Erros from "../Member/Erros";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function AddProduct(props) {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        price: "",
        brand: "",
        category: "",
        status: 1,
        company: "",
        detail: "",
        sale: ""
    })
    const [avatar, setAvatar] = useState("")
    const [errE, setErrE] = useState({})
    const [optionBrand, setOptionBrand] = useState("")
    const [optionCategory, setOptionCategory] = useState("")
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
        axios.get("http://localhost/laravel8/laravel8/public/api/category-brand")
            .then(res => {
                setOptionBrand(res.data.brand)
                setOptionCategory(res.data.category)
            })
            .catch(erros => console.log(erros))
    }, [])
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
            formData.append('sale', input.sale);
            Object.keys(avatar).map((item, i) => {
                formData.append("file[]", avatar[item])
            });
            setErrE("")
            alert("add thành công")
            axios.post("http://localhost/laravel8/laravel8/public/api/user/product/add", formData, config)
                .then(res => {
                    console.log(res)
                    navigate("/user/update/account/my-product/")
                })
                .catch(erros => console.log(erros))
        }
    }
    return (
        <div className='col-sm-9'>
        <div class="signup-form">
            <h2>Create product!</h2>
            <Erros errE={errE} />
            <form action="#" enctype="multipart/form-data" onSubmit={handleSubmit} >
                <input type="text" placeholder="Name" name="name" onChange={handleInput} />

                <input type="text" placeholder="Price" name="price" onChange={handleInput} />
                <select name="brand" onChange={handleInput} >
                    <option value="" disabled selected>Please choose brand</option>
                    {renderOption()}
                </select>
                <select name="category" onChange={handleInput} >
                    <option value="" disabled selected>Please choose category</option>
                    {renderOption1()}
                </select>
                <select name="status" value={input.status} onChange={handleInput} >
                    <option value={1}> new </option>
                    <option value={0}> sale </option>
                </select>
                {renderSale()}
                <input type="text" placeholder="Company profile" name="company" onChange={handleInput} />
                <input type="file" name="avatar" multiple onChange={handleFile} />
                <textarea placeholder="Detail" name="detail" onChange={handleInput} />
                <button type="submit" class="btn btn-default">Add product</button>
            </form>
        </div>
        </div>
    )
}
export default AddProduct;