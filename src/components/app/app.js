import React,{Component} from 'react'
import Content from '../content'
import Footer from '../footer'
import Header from '../header'
import Login from '../login'
import './app.css'

export default class App extends Component{
    state={
        login:false
    }

    loginActive = (body) =>{
        this.setState({
            login:body
        })
    }
    
    render(){
        const {login} = this.state;
        return(
            <div className="app">
                <div className="app_container">
                    <Header/>
                    {
                    login ?
                    <>
                    <Content/>
                    <Footer/>
                    </>
                    :
                    <Login loginActivate={this.loginActive}/>
                    }
                </div>
            </div>
        )
    }
}