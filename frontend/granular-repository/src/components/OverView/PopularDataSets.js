import React from 'react'
import { Translation } from "react-i18next"
import {  Link } from "react-router-dom";

function PopularDataSets(props) {
  return (
    <Translation>
        {(t, { i18n }) => (
            <div className="news-block d-flex align-items-center pt-20 pb-20 border-top">
                <div style={{ maxWidth: '100px', maxHeight: '60px' }}><img src={props.image} alt="" className="lazy-img"/></div>
                <div className="post ps-4">
                    <h4 className="mb-5"><Link to={`/details/${props.id}`} className="title tran3s" >{props.title}</Link></h4>
                    <div className="date">{props.date}</div>
                </div>
          </div>
        )}
    </Translation>
  )
}

export default PopularDataSets