import React, { useState } from 'react'
import {  Link } from "react-router-dom";
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import VisualTool from './VisualTool';

function Header() {
  const [popupVisible, setPopupVisible] = useState(false);
  const openPopup = () => {
	  setPopupVisible(true);
	};
  
	const closePopup = () => {
	  setPopupVisible(false);
	};
    return (
		<header className="theme-main-menu sticky-menu theme-menu-ten"> 
			<div className="inner-content position-relative" >
        <div className="d-flex align-items-end justify-content-end d-lg-flex d-none">
					<a href="https://www.ruralgranular.eu/" className="nav-link text-black hide-on-scroll" role="button"  data-bs-auto-close="outside" aria-expanded="false" target="_blank" rel="noreferrer" >Granular Website</a>
					<a href="https://observatory.rural-vision.europa.eu/?lng=en&ctx=RUROBS" className="nav-link text-black hide-on-scroll" role="button"  data-bs-auto-close="outside" aria-expanded="false" target="_blank" rel="noreferrer" >Rural observatory</a>
				</div>
				<div className="d-flex align-items-center justify-content-between" style={{ position: 'relative'}}>
					<div className="logo order-lg-0">
						<Link to="/home">
							<img  src="/assets/logo-Granular-horizontal.webp" alt="" className="headerlogo"/>
						</Link>
					</div>
					<SearchBar/>
          {popupVisible && <VisualTool onClose={closePopup}/>}
					<NavBar openPopup={openPopup} />
				</div>
			</div> 			
		</header> 
    )
  }

export default Header