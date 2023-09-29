import About from './About';
import { useState} from 'react';
import './App.css';
import NavBar from './NavBar';
import TextForm from './TextForm';
import Alert from './Alert';
import {
  BrowserRouter as Router,
    Route,
  Link
} from "react-router-dom";
import { Switch } from 'react-router-dom';



function App() {
  const [mode, setmode] = useState('light')
  const [alert, setAlert] = useState(null)
  const   showAlert = (message, type) => {
setAlert ({
  msg: message,
  type: type
})
setTimeout(() => {
  setAlert(null);
}, 1500);

  }
  const toggleMode = () => {
    if(mode === 'light'){
      setmode('dark')
      document.body.style.backgroundColor ='#343a40';
      showAlert("Dark mode is enabled", "success");
    }else{
      setmode('light')
      document.body.style.backgroundColor ='white';
      showAlert("Light mode is enabled", "success");
    }
  }
  
  return (
   <>
   <Router>
    <Route>

   <NavBar title = "Parapros" mode ={mode} toggleMode ={toggleMode} exact path ="/home"/>

    </Route>
   <Alert alert = {alert}/>
   <Switch>
   <Route exact path ="/about">
    
   <About/>
   </Route>
    <Route exact path ="/home">
    <TextForm heading = 'Enter the text below' mode ={mode} showAlert={showAlert}/>
    </Route>
   
   </Switch>
   </Router>
   </>
  );
}

export default App;
