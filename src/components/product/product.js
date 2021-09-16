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
        arr:[],
        isClicked: false,
        descr_active: '',
        active_descr_title: '',
        active_descr_description: '',
    }

    componentDidMount = async()=>{
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
        let newArr = [...this.state.arr, key]
        this.setState({
            arr: newArr
        },()=>localStorage.setItem("cartId",JSON.stringify(this.state.arr)))
        
        // console.log(this.state.arr);
        // localStorage.setItem(this.state.arr)
    }

    getDescription = (title, description)=>{
        this.setState({
            descr_active: 'active',
            active_descr_title: title,
            active_descr_description: description
        })      
    
    }
    render(){
        localStorage.setItem("cartId",JSON.stringify(this.state.arr));
        const {products} = this.state
        let count = JSON.parse(localStorage.getItem("cartId"));
        
        // count.filter(item => item == item.uuid).length
        const items = products.map(item =>{
            let newArr = count.filter(item=> item === item.uuid).length;
    
            return(
                    <div className = "product_item" key={item.uuid}>
                    <img src = {wear} className="wear"/>
                    <div className = "product_descr">
                        <p className ="product_descr_text">{item.name}</p>
                        <p className ="product_descr_text">Срок доставки / 2 дня</p>
                        <p className ="product_descr_text">{item.price}</p>
                        <div className="add_to_basket">
                            <img src={plus} onClick={()=>this.setItemtoLocalStorage(item.uuid)}/>
                            <span>{newArr}</span>
                            <img src={minus} className = "minus"/>
                        </div>
                    </div>
                    <img src = {info} className = "info" onClick={()=>this.getDescription(item.hint.title, item.hint.description)}/>
                </div>
            )
        })
        
        return(
            <div className = "product_page">                
                    {items}    
                <Description descr_active={this.state.descr_active} get_active={(item)=>this.setState({descr_active:item})} active_descr_title={this.state.active_descr_title} active_descr_description={this.state.active_descr_description} />                
            </div>
        )
    }
}