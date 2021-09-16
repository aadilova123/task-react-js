import React,{Component} from 'react'
import './login.css'

export default class Login extends Component{
    state={
        email:"",
        password:"",
        users: []
    }
    
    componentDidMount =async (event)=>{
        // event.preventDefault();
        const response = await fetch('https://api.doover.tech/api/token/',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email:"admin@inzgiba.me",
                password:"test123123"
            })
        })
        await response.json()
        .then(data=>{  
            if(data.access !== undefined){
                localStorage.setItem('token', data.access)
                // this.props.loginActivate(true)
            }          
            
        })
        this.setState({
            email:"",
            password:""
        })
        this.getUsers();
    }

    getUsers = async () =>{
        let token = localStorage.getItem('token')
        const response = await fetch('https://api.doover.tech/api/users/', {
            method: 'GET',
            headers: {'Content-Type':'application/json',
            Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
        })
       await response.json()
       .then(data=>{
           console.log(data)
           this.setState({
               users:data
           })
       })
    }

    registerForm = (event) =>{
        event.preventDefault();
        this.state.users.map(({email,username})=>{
            if(this.state.email === email && this.state.password === username){
                console.log(username)
                this.props.loginActivate(true, email)
            }
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