import React,{Component} from 'react'
import './header.css'
import logo from './Recents.svg'
import img from './img.svg'
export default class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="header_menu">
                <a href="">Главная</a>
                <a href="">Корзина</a>
            </div>
            <div className="header-right_block">
                <img lassName="logo" src={logo}/>
                <input type="text" placeholder="Найти вещь"/>
                <div className="signIn">
                    <span>Войти</span>
                    <img src={img}/>
                </div>
            </div>
            </div>
        )
    }
}