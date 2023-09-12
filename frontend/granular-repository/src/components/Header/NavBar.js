import React,{useState} from 'react'
import { Link , useLocation } from "react-router-dom";
import { Translation } from "react-i18next"
import MobileSearch from './MobileSearch';
import VisualTool from './VisualTool'

function NavBar({ openPopup }) {
	const location = useLocation();
	var path = location.pathname.split("/")
  
	return ( 
		<Translation>
		{(t, { i18n }) => (
		<nav className="navbar navbar-expand-lg order-lg-2">
			<button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					{(path[1]==="home") ? (
						<li className="nav-item active">
							<Link className="nav-link" role="button"  data-bs-auto-close="outside" aria-expanded="false" to="/home">{t("NavBarHome")}</Link>
						</li>
					):(
						<li className="nav-item">
							<Link className="nav-link" role="button"  data-bs-auto-close="outside" aria-expanded="false" to="/home">{t("NavBarHome")}</Link>
						</li>
					)}

					<li className="nav-item ">
						<Link className="nav-link" role="button"  data-bs-auto-close="outside" aria-expanded="false"  to="/collection/All/1" >
							<span>{t("Repository")}</span>
						</Link>
					</li>
					

					
					{(path[1]==="visualtools") ? (
						<li className="nav-item active">
							<Link className="nav-link" role="button"  data-bs-auto-close="outside" aria-expanded="false" to="/visualization-toolkit">{t("VisualToolkit")}</Link>
						</li>
					):(
						<li className="nav-item">
							<Link className="nav-link" role="button"  data-bs-auto-close="outside" aria-expanded="false" to="/visualization-toolkit">{t("VisualToolkit")}</Link>
						</li>
					)}	
						
					<li className="nav-item ">
						<button className="nav-link" onClick={openPopup}>User Manual</button>
						{/* {popupVisible && <VisualTool onClose={closePopup} />} */}
					</li>

					<a href="https://www.ruralgranular.eu/" className="nav-link text-black d-block d-lg-none" role="button"  data-bs-auto-close="outside" aria-expanded="false" target="_blank" rel="noreferrer" >Granular Website</a>
					<a href="https://observatory.rural-vision.europa.eu/?lng=en&ctx=RUROBS" className="nav-link text-black d-block d-lg-none" role="button"  data-bs-auto-close="outside" aria-expanded="false" target="_blank" rel="noreferrer" >Rural observatory</a>

					{(path[1]==="contact") ? (
						<li className="nav-item active">
							<Link className="nav-link" role="button"  data-bs-auto-close="outside" aria-expanded="false" to="/contact">{t("Contactnavbar")}</Link>
						</li>
					):(
						<li className="nav-item">
							<Link className="nav-link" role="button"  data-bs-auto-close="outside" aria-expanded="false" to="/contact">{t("Contactnavbar")}</Link>
						</li>
					)}	
				</ul>
				<MobileSearch/>
			</div>
		</nav>
		)}
		</Translation>
	)
}

export default NavBar