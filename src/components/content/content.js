import React, { Component } from 'react'
import './content.css'
import tovar from './tovar.png'

export default class Content extends Component{
    state = {
        category: []
    }

    componentDidMount = async()=>{
        let token = localStorage.getItem('token')
        const response = await fetch('https://api.doover.tech/api/products/categories/', {
            method: 'GET',
            headers: {'Content-Type':'application/json',
            Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
        })
       await response.json()
       .then(data=>{
           this.setState({
               category: data
           })
       })
    }

    render(){
        const {category} = this.state
        const products = category.map(item =>{
            return(
                <li key = {item.uuid}>
                    <img src={tovar} className="products_img"/>
                    <span className="products_name">{item.name}</span>
                    <div className = "products_breadCrumps">
                        <p>Брюки</p>
                        <p>Верхняя одежда</p>
                        <p>Джемперы</p>
                    </div>
                </li>
            )
        })

        return(
            <div className="content">
                <h1 className = "category">Категории</h1>
                <div className = "products">
                    <ul>
                        {products}
                    </ul>
                </div>
            </div>
        )
    }
}