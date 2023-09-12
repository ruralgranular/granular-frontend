import React from 'react'
import { Translation } from "react-i18next"
import { Link } from "react-router-dom";

function CategoryCard(props) {
  var picture ="/assets/420X358-7.jpg"

  if (props.picture !== null){
    picture = props.picture
  }

  return (
    <Translation>
		{(t, { i18n }) => (
      <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.2s">
        <Link to={`/collection/All/1/${props.title}`}>
          <div className="card-style-twentyOne position-relative mt-35"> 
            <img src={ picture } alt="" className="lazy-img " />
              <div className="hover-overlay d-flex flex-column align-items-center position-absolute tran3s cathover">
                  <h3 className="tx-granural2 text-cstm categorycard" >{props.title}</h3>
                  {props.desc?(
                    <p className="category-desc">{props.desc}</p>
                  ):(
                    <p/>
                  )}
                  <Link to={`/collection/All/1/${props.title}`} className="btn-four fw-500 mt-auto"  >{t("ViewD")}</Link>
              </div> 
          </div> 
        </Link>
      </div>
    )}
    </Translation>
  )
}

export default CategoryCard