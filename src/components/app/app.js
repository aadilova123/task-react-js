import React,{Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Cart from '../cart'
import Content from '../content'
import Description from '../description/description'
import Footer from '../footer'
import Header from '../header'
import Login from '../login'
import Product from '../product'
import './app.css'

export default class App extends Component{
    state={
        login:false,
        username:""
    }

    loginActive = (body, email) =>{
        this.setState({
            login:body,
            username:email
        })
    }
    
    
    render(){
        const {login} = this.state;
        return(
            <div className="app">
                <div className="app_container">
                    <Router>
                        <Header sendUsername = {this.state.username}/>
                        {
                        login ?
                        <>
                        <Route path='/main' component={Content}/>
                        <Route path='/cart' component={Cart}/>
                        <Footer/>
                        </>
                        :
                        <Login loginActivate={this.loginActive}/>
                        }
                    </Router>                    
                </div>
            </div>
        )
    }
}