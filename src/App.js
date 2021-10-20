import React, { Component } from 'react'
import FormPage from './components/job_application/FormPage'
import { Link , Route , BrowserRouter } from 'react-router-dom'
import AdminDashoard from './components/job_application/AdminDashoard'

 class App extends Component {
     constructor()
     {
         super()
         this.state={
             arr:['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer']
         }
     }
     
    render() {
        return (
         <BrowserRouter>
         <Link to='/form' style={{color : 'white'}}>FormPage</Link>{ "  -   "} 
         <Link to='/dashboard' style={{color : 'white'}}>AdminDashoard</Link>

         <Route path='/form' component={FormPage}/>
         <Route path='/dashboard' component={AdminDashoard}/>
         </BrowserRouter>
        )
    }
}
export default App