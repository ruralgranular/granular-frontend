import React , {useState} from 'react'
import { Translation } from "react-i18next"
import {  Link } from "react-router-dom";

function DataProp(props) {
  let category = props.category.replace(/[\s&]/g,"")
  var buttonclass = "categorybutton clicked button"+category
  var image = props.image
  if (image === "/assets/Cohesion &amp; Values.jpg"){
    image = "/assets/Cohesion & Values.jpg"
  }
  if (image === "/assets/Well being &amp; Cohesion.jpg"){
    image = "/assets/Well being & Cohesion.jpg"
  }
  var description = props.desc
  if (typeof description !== 'boolean' && description.length>=200){
    description = description.slice(0,200)+"..."
  }
    
  return (
    <Translation>
    {(t, { i18n }) => (
        <div className="component-container ">
            <article className="blog-meta-three mb-60 lg-mb-40 wow fadeInUp">
            <figure className=" m0">
                <Link to={`/details/${props.id}`}  >
                <div className="dataoverview">
                    <h4>{props.title}</h4>
                    <p>{description}</p>
                    <div className="categsec" >
                    <button className="categorybutton clicked " style={{backgroundColor : props.color, borderColor : props.color}}>
                      <span ><img className="categoryicon" src={process.env.PUBLIC_URL + props.image} alt="Icon" /></span>
                      <span >{props.category.replace("amp;","")}</span>
                    </button>
                    </div>
                </div> 
                </Link>
            </figure>         
            </article> 
        </div>
    )}
    </Translation>
  )
}
export default DataProp
