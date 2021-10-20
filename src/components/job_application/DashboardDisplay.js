import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Modal, Button ,Space} from 'antd'
import 'antd/dist/antd.css';

 class DashboardDisplay extends Component {
    constructor()
    {
        super()
        this.state={
            applicationforms:[],
            bool:false
        }
    }
    componentDidMount(){
        axios.get(`https://dct-application-form.herokuapp.com/users/application-forms`)
        .then((response)=>{
            const applicationforms =response.data
            const frontend = applicationforms.filter(e => {
                return (e.jobTitle === this.props.role)
            })
            this.setState({applicationforms:frontend})
            console.log(frontend);
            
        })
     }
     funstatus(obj){
         if(obj.status === 'applied')
         {
           return (<div className="btn-group"><button onClick={()=>{this.handleShortList(obj)}} className='btn btn-primary'>shortlist</button>
                        <button onClick={()=>{this.handleReject(obj)}} className='btn btn-danger'>reject</button>
                   </div>)
         }
         else if(obj.status === "rejected")
         {
             return (<button className='btn btn-danger'>reject</button>)
         }
         else if(obj.status === "shortlisted")
         { 
             return (<button className='btn btn-primary'>shortlisted</button>)
         }
     }
     handleShortList=(obj)=>{
        this.setState({bool:true})
        console.log(obj._id);
        const shortlist ={"status": "shortlisted"}
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${obj._id}`,shortlist)
        .then((response)=>{
            const obj1 = response.data
            this.setState((prevState) => {
                return {
                    applicationforms : prevState.applicationforms.map((message) => {
                        if(message._id === obj1._id) {
                            console.log("shortlist");
                            return Object.assign({}, message, obj1)  
                        } else {
                            return Object.assign({}, message)
                        }
                    })
                }
            })
        })
     }
     handleReject=(obj)=>{
        console.log(obj._id);
        const shortlist ={"status": "rejected"}
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${obj._id}`,shortlist)
        .then((response)=>{
            const obj1 = response.data
            this.setState((prevState) => {
                return {
                    applicationforms : prevState.applicationforms.map((message) => {
                        if(message._id === obj1._id) {
                            console.log("reject");
                            return Object.assign({}, message, obj1)  
                        } else {
                            return Object.assign({}, message)
                        }
                    })
                }
            })
        })
        this.setState({bool:false})
     }
     toastnotification=()=>{
         return(
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="..." className="rounded mr-2" alt="..."/>
                    <strong className="mr-auto">Bootstrap</strong>
                    <small className="text-muted">11 mins ago</small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
                </div>
         )
     }
     handleShowDetails(obj){
        Modal.info({
            title : `${obj.name } profile`,
            content: (
                <div>
                Contact number :{obj.phone} <br/>
                Email          :{obj.email} <br/>
                Skills         :{obj.skills.split(',').map(e =>e)}<br/>
                Experience     :{obj.experience}<br/>
                </div>
              )
        })
     }

    render() {
        return (
            <div>
            <div className='container1'>
                <h3>{this.props.role}</h3>
                <p>List of candidates applied for {this.props.role} job({this.state.applicationforms.length})</p>
                <table border='.5' className='table' >
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Technical Skills</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>View Details</th>
                        <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.applicationforms.map(e =>{
                                return(<tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.skills}</td>
                                    <td>{e.experience}</td>
                                    <td>{moment(e.createdAt).format('Do MMMM YYYY')}</td>
                                    <td><Space><Button className='btn btn-success' onClick={()=>{this.handleShowDetails(e)}}>View Details</Button></Space></td>
                                    <td>{e.status && this.funstatus(e)}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            {this.state.bool && this.toastnotification()}
            </div>
        )
    }
}
export default DashboardDisplay
