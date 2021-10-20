import React, { Component } from 'react'
import axios from 'axios'

class FormPage extends Component {
    constructor(props)
     {
         super(props)
         this.state={
            arr:['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer'],
             name:'',
             email:'',
             phone:'',
             jobTitle:'',
             experience:'',
             skills:''
         }
     }
     handleChange=(e)=>{
         this.setState({[e.target.name] : e.target.value })
     }
     handleSubmit =(e)=>{
         e.preventDefault()
         const formdata={
            name: this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            jobTitle:this.state.jobTitle,
            experience:this.state.experience,
            skills:this.state.skills
         }
         //console.log(formdata);
         axios.post(`https://dct-application-form.herokuapp.com/users/application-form`,formdata)
         .then((response)=>{
             const newuser = response.data
             this.setState({
                name:'',
                email:'',
                phone:'',
                jobTitle:'',
                experience:'',
                skills:''
             })
             console.log(newuser); 
         })
         .catch((error)=>{
             console.log(error.message);
             
         })
     }
    render() {
        return (
            
            <div >
            <h1 align='center' style={{color : 'white'}}>Apply For A Job</h1>
            <div className ="container">
            <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
            
            <div className="form-horizontal">
            <div className="form-group row">
                <label htmlFor="name" className="control-label col-md-4">Full name </label>
                <div className="col-md-8">
                <input
                type='text'
                name='name'
                value={this.state.name}
                onChange={this.handleChange}
                id="name"  className="form-control" 
                /></div><br/><br/>
            </div></div>
            
            <div className="form-horizontal">
            <div className="form-group row">
                <label htmlFor="name" className="control-label col-md-4">Email address </label>
                <div className="col-md-8">
                <input
                placeholder='example@email.com'
                type='email'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                id="name"  className="form-control" 
                /></div><br/><br/>
            </div></div>

            <div className="form-horizontal">
            <div className="form-group row">
            <label htmlFor="name" className="control-label col-md-4">Contact Number </label>
            <div className="col-md-8">
            <input
            placeholder='+91 9988554344'
            type='text'
            name='phone'
            value={this.state.phone}
            onChange={this.handleChange}
            id="name"  className="form-control"
            /></div><br/><br/>
            </div></div>
            
            <div className="form-horizontal">
            <div className="form-group row">
            <label htmlFor="name" className="control-label col-md-4">Applying for job </label>
            <div className="col-md-8">
            <select value={this.state.jobTitle} onChange={this.handleChange} name='jobTitle' id="name"  className="form-control">
            <option>select</option>
            {
                this.state.arr.map(e =>{
                    return(
                        <option value={e} key={e}>{e}</option>
                    )
                })
            }
            </select>
            </div><br/><br/>
            </div></div>
            
            <div className="form-horizontal">
            <div className="form-group row">
            <label htmlFor="name" className="control-label col-md-4">Experience </label>
            <div className="col-md-8">
            <input
            placeholder='Experience (2 years 3 months)'
            type='text'
            name='experience'
            value={this.state.experience}
            onChange={this.handleChange}
            id="name"  className="form-control"
            /></div><br/><br/>
            </div></div>
             
            <div className="form-horizontal">
            <div className="form-group row">
            <label htmlFor="name" className="control-label col-md-4">TechnicalSkills</label>
            <div className="col-md-8"> 
            <textarea
            name='skills'
            value={this.state.skills}
            onChange={this.handleChange}
            id="name"  className="form-control"
            /></div><br/><br/>
           </div></div>

            <input
            className='btn btn-primary'
            type='submit'
            value='Send Application'
            />
            </div>
            </form>
            </div>
            </div>
        )
    }
}
export default FormPage