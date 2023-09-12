import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/HomePage/Home';
import Overview from './components/OverView/Overview';
import Details from './components/Details/Details';
import Contact from './components/Contact/Contact';
import ScrollToTop from './services/ScrollToTop';
import VisualTool from './components/Charts/VisualTool';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop/>
        <Routes> 
            <Route path="/" element={<Home />}/>
            <Route path="home" element={<Home />} />
            <Route exact path="collection" element={<Overview />}>
                <Route path=":terms" element={<Overview />}>
                  <Route path=":page" element={<Overview />}>  
                    <Route path=":filters" element={<Overview />}/>  
                  </Route>
                </Route>   
            </Route> 
            <Route path="details" element={<Details />} >
                <Route path=":id" element={<Details />} />
            </Route>
            <Route path="contact" element={<Contact/>}/>
            <Route path="visualization-toolkit" element={<VisualTool/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
