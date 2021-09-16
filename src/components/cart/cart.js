import React, { Component } from 'react'
import './cart.css'
import w from './wear.png'
import plus from './plus.png'
import minus from './minus.png'
import info from './info.png'

export default class Cart extends Component{

    state = {
        products:[],
        cartProducts:[]
    }
    
    componentDidMount = async ()=>{
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
           console.log(data);
           this.setState({
               products: data
               
           })           
       })
       this.cartBtn()
        
    }

    cartBtn =() => {
        console.log("jjj")
        let newArr = []
        let arr = JSON.parse(localStorage.getItem("cartId"));
        this.state.products.filter(item =>{
            return arr.some(item2 =>{
                if(item.uuid==item2){
                    newArr.push(item)
                    this.setState({
                        cartProducts:newArr
                    });                    
                }
            })

        })
        
        
    }
    render(){    
        let count = 0;    
        let product = this.state.cartProducts.map(item=>{
            count = count + item.price;
            return (
                <div className="left_block">
                    <img src={info} alt="info"/>                  
                            <img src={w} alt="jacket"/>                            
                            <h4 className="category_name">{item.name}</h4>
                            <h4>Срок доставки / {item.duration}</h4>
                            <img src = {plus} alt="plus"/>
                            <p>3</p>
                            <img src = {minus} alt="minus" onClick={()=>console.log(this.state.cartProducts)}/>  
                            <p>{item.price}</p> 
                </div>
            )                
        })

        

        return(
            <div className="cart">
                <h1 className = "cart_title">Корзина</h1>
                <div className = "cart_block">
                    <div className="items">
                     {product}
                    </div>
                   
                    <div className="right_block">
                        <h1 className="total">ИТОГО</h1>
                        <h4 className="cart_items">{product.length} вещи</h4>
                        <h3 className="money">Общая сумма {count}</h3>
                        <button className="cart_btn">Оформить</button>
                    </div>
                </div>
            </div>
        )
    }
}