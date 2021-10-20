import React, { Component } from 'react'
import { Link , Route , BrowserRouter } from 'react-router-dom'
import FrontEndDeveloper from './FrontEndDeveloper'
import NodejsDeveloper from './NodejsDeveloper'
import MEANStackDeveloper from './MEANStackDeveloper'
import FULLStackDeveloper from './FULLStackDeveloper'

 class AdminDashoard extends Component {
     constructor(props)
     {
         super(props)
         this.state={
            arr:['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer'],
            applicationforms:[]
         }
     }           

    render() {
        return (
            <div>
            <h1 align='center'>Admin Dashboard</h1>
            
            <div className ="container1" align='center'>
            <BrowserRouter>
            <Link to='/FrontEndDeveloper'>Front-End Developer</Link>{ "  -   "} 
            <Link to='/NodejsDeveloper'>Node.js Developer</Link>{ "  -   "}
            <Link to='/MEANStackDeveloper'>MEAN Stack Developer</Link>{ "  -   "}
            <Link to='/FULLStackDeveloper'>FULL Stack Developer</Link>
            
            <Route path='/FrontEndDeveloper' component={FrontEndDeveloper}/>
            <Route path='/NodejsDeveloper' component={NodejsDeveloper}/>
            <Route path='/MEANStackDeveloper' component={MEANStackDeveloper}/>
            <Route path='/FULLStackDeveloper' component={FULLStackDeveloper}/>
            
            </BrowserRouter>
            </div>
            </div>
        )
    }
}
export default AdminDashoard