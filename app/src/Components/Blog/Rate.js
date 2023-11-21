
    import StarRatings from 'react-star-ratings';
    import { useEffect, useState } from "react"; 
import Erros from '../Member/Erros';
import { useParams } from 'react-router-dom';
import axios from 'axios';

    function Rate(props){
        const [rating, setRating] = useState(0)
        const [errE, setErrE] = useState({})
        
        let params = useParams();
        
        let x = localStorage.getItem("data")
        if(x){
            x= JSON.parse(x)
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
    useEffect(() =>{
        axios.get("http://localhost/laravel8/laravel8/public/api/blog/rate/" + params.id)
        .then(res =>{
        let sum = res.data.data;
        let s = 0;
        if(Object.keys(sum).length > 0){
            Object.keys(sum).map((key, index) =>{
                s = s + sum[key]["rate"];
                
            })
            let trungBinh = s/Object.keys(sum).length;
            setRating(trungBinh)
        }
         
    })
     .catch(erros => console.log(erros))
    }, [])


        function changeRating( newRating, name ) {
          setRating(newRating)
          let errSubmit = {}
          let  flag = true;
          if(x != true){
            errSubmit.rating = " chưa login"
            flag = false
          } 
          if(!flag){
            setErrE(errSubmit)
          }
          if(x){    
            const data = new FormData();
            data.append('user_id', y["id"])
            data.append('blog_id', params.id)
            data.append('rate', rating)
            axios.post("http://localhost/laravel8/laravel8/public/api/blog/rate/" + params.id, data, config)
            .then(res =>{
                setErrE("")
               
            })
            .catch(erros => console.log(erros))
          }
         
        
        }
       
        return (
           <>
            <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={6}
            name='rating'
          /></>
         
        );
       
    }
    export default Rate;