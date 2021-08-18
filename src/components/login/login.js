import React,{Component} from 'react'
import './login.css'

export default class Login extends Component{
    state={
        email:"",
        password:""
    }
    
    registerForm =async (event)=>{
        event.preventDefault();
        const response = await fetch('https://api.doover.tech/api/token/',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
        })
        await response.json()
        .then(data=>{  
            if(data.access !== undefined){
                localStorage.setItem('token', data.access)
                this.props.loginActivate(true)
            }          
            
        })
        this.setState({
            email:"",
            password:""
        })
    }
     
    render(){
        return(
            <div className="sign_form_bg">
                <form className="sign_form" onSubmit={this.registerForm}>
                <h2 className="sign_form_title">Войти</h2><br/><br/>
                <input type="text" placeholder="Логин" className="form_login" onChange={(e)=>this.setState({email:e.target.value})} value={this.state.email}/><br/>
                <input type="text" placeholder="Пароль" className="form_password" onChange={(e)=>this.setState({password:e.target.value})} value={this.state.password}/><br/>
                <button className="sign_form_button">Войти</button>
            </form>
            </div>
        )
    }
}