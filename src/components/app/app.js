import React,{Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Cart from '../cart'
import Content from '../content'
import Footer from '../footer'
import Header from '../header'
import Login from '../login'
import Product from '../product'
import Description  from '../description/description'
import './app.css'

export default class App extends Component{
    state={
        login:false,
        username:"",
        activeUuid: "",
        descr_active:"",
        active_descr_title: '',
        active_descr_description: '',
    }

    loginActive = (body, email) =>{
        this.setState({
            login:body,
            username:email
        })
    }

    getUuid = (body) => {
        this.setState({
            activeUuid: body
        })
    }
    getDescription = (title, description)=>{
        this.setState({
            descr_active: 'active',
            active_descr_title: title,
            active_descr_description: description
        })      
    
    }
    
    componentDidMount = ()=>{
        let checkKey = localStorage.getItem('cartId');
       if(checkKey == null){
           localStorage.setItem('cartId', JSON.stringify([]))
       }
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
                        <Route path='/main' render={()=><Content sendUuid={this.getUuid} />}/>
                        
                        <Route path='/cart' render={()=><Cart getDescription={this.getDescription}/>}/>
                        <Route path='/products' render={()=><Product getDescription = {this.getDescription} uuid={this.state.activeUuid}/>}/>
                        <Description                            
                            descr_active={this.state.descr_active} 
                            get_active={(item)=>this.setState({descr_active:item})}     
                            active_descr_title={this.state.active_descr_title} 
                            active_descr_description={this.state.active_descr_description} />              
                        <Footer/>
                        <button onClick={()=>console.log(this.state.activeUuid)}>BTN</button>
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