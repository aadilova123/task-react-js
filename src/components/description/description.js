import React,{Component} from 'react'
import './description.css'
import x from './x.svg'
export default class Description extends Component{

    
    render(){
        
        const {descr_active, active_descr_title, active_descr_description} = this.props;
        // console.log(active_descr);
        let classNames = `description_form_bg ${descr_active}`
        // Object.keys(active_descr).map(item => {
        //     console.log(active_descr.title)
        // })
        return(
            <div className={classNames}>  
            <div className="description_block">
                <span className="description_btn" onClick={()=>this.props.get_active('none')}>&times;</span>
                {/* {

                    Object.keys(active_descr).map(item => {
                        
                        return (
                            <div>
                                 <h1 className="description_title" key={item}>
                            {active_descr.title}
                            </h1>
                            <p className="description_info">{active_descr.description}</p>
                            </div>   
                           
                        )
                        
                    })
                } */}
                <h2 className="description_title">{active_descr_title}</h2><br/><br/>
                <p className="description_info">{active_descr_description}</p>    
            </div>         
                
       
            </div>
        )
    }
}