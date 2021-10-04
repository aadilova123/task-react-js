import React,{Component} from 'react'
import './header.css'
import logo from './Recents.svg'
import img from './img.svg'
import {Link} from 'react-router-dom'
export default class Header extends Component{

    
    render(){

        const {sendUsername} = this.props;
        return(
            <div className="header">
                <div className="header_menu">
                <Link to='/main'>Главная</Link>
                <Link to='/cart'>Корзина</Link>
            </div>
            <div className="header-right_block">
                <img lassName="logo" src={logo} alt="img"/>
                <input type="text" placeholder="Найти вещь"/>
                <div className="signIn">
                    <span>{sendUsername}</span>
                    <img src={img} alt="img"/>
                </div>
            </div>
            </div>
        )
    }
}