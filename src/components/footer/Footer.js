import React,{Component} from 'react'

import './footer.css'
import logo from './Recents.svg'
import y from './V1.svg'
import wp from './v2.svg'
import f  from './v3.svg'

export default class Footer extends Component{
    render(){
        return(
            <div className="footer">
                <img src={logo} alt="alt"/>
                <div className="social">
                    <img src={y} alt="y"/>
                    <img src={wp}/>
                    <img src={f}/>
                </div>
                <p>+7(077) 555 55 70</p>
            </div>
        )
    }
}