import React, { Component } from 'react'
import './product.css'
import wear from './wear.png'
import plus from './plus.png'
import minus from './minus.png'
import info from './info.png'
import Description from '../description/description'


export default class Product extends Component{
    state = {
        products: [],
        isClicked: false,
        
    }

    getProducts = async()=>{
        let token = localStorage.getItem('token')
        const response = await fetch('https://api.doover.tech/api/products/', {
            method: 'GET',
            headers: {'Content-Type':'application/json',
            Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
        })
       await response.json()
       .then(data=>{
        //    console.log(data);
           this.setState({
               products: data
               
           })
           
       })
    }
    setItemtoLocalStorage = (key) =>{
        // console.log(key)
        // {
        //     "item1_id": 2, // 2 – это кол-во товара с id = item1_id в корзине
        //     "item2_id": 1
        // }
       
        // this.setState({
        //     isClicked:true
        // })
        // console.log(this.state.isClicked)
        // if(this.state.isClicked){
        //     document.getElementsByClassName('minus').style.visibility='visible';
        // }
        let oldArr = JSON.parse(localStorage.getItem("cartId"));
        let newArr = [...oldArr, key]
        this.setState({
            arr: newArr
        },()=>localStorage.setItem("cartId",JSON.stringify(this.state.arr)))
        
        // console.log(this.state.arr);
        // localStorage.setItem(this.state.arr)
    }

   
    render(){
        this.getProducts();
        const {products} = this.state;
        const {uuid} = this.props;
        // let count = JSON.parse(localStorage.getItem("cartId"));//        
        // count.filter(item => item == item.uuid).length
        // console.log(products)
        let productsByCategory = products.filter(item=>item.category==uuid)
        const items = productsByCategory.map(item =>{
            // let newArr = count.filter(item => item == item.uuid).length;            
            
            return(
                    <div className = "product_item" key={item.uuid}>
                    <img src = {wear} className="wear"/>
                    <div className = "product_descr">
                        {/* <p className="product_descr_text">{item.category}</p> */}
                        <p className ="product_descr_text">{item.name}</p>
                        <p className ="product_descr_text" onClick={()=>console.log(productsByCategory)}>Срок доставки / 2 дня</p>
                        <p className ="product_descr_text">{item.price}</p>
                        <div className="add_to_basket">
                            <img src={plus} onClick={()=>this.setItemtoLocalStorage(item.uuid)}/>
                            <span>0</span>
                            <img src={minus} className = "minus"/>
                        </div>
                    </div>
                    <img src = {info} className = "info" onClick={()=>this.props.getDescription(item.hint.title, item.hint.description)}/>
                </div>
            )
        })
        
        return(
            <div className = "product_page">                
                    {items}    
            </div>
            
        )
    }
}