import React from 'react'
import { Translation } from "react-i18next"
import { Link } from 'react-router-dom'


function HeadDetails(props) {
    var buttonclass = "detailscategorybutton clicked button"+props.category.replace(" ","")
    return (
        <Translation>
            {(t, { i18n }) => (
                <div className="fancy-feature-fiftyOne position-relative mt-30 lg-mt-2">
                  <div className="row">
                    <div className="col-xxl-8 col-lg-9 wow fadeInLeft">
                      <div className="d-flex flex-wrap justify-content-start align-items-center">
                        {props.category ? (
                            <button className={"categorybutton clicked"} style={{backgroundColor : props.color, borderColor : props.color}} >
                              <span ><img className="categoryicon" src={process.env.PUBLIC_URL + `/assets/${props.image}`} alt="Icon" /></span>
                              <span >{props.category.replace("amp;","")}</span>
                            </button>
                          ) : null}
                        <div className="blog-pubish-date p-1">
                          <span>{props.date}</span>
                          .
                          {props.author ? (
                            <Link to={`/collection/${props.author}/1`} className="fw-500">
                              {" By " + props.author}
                            </Link>
                          ) : null}
                        </div>
                      </div>
                      <h2 className="blog-heading-one tx-dark">{props.title}</h2>
                    </div>
                  </div>
                  <img src="/assets/icon_logo.png" alt="" className="lazy-img shapes shape-two"/>
                </div> 
            )}
        </Translation>
    )
    }

export default HeadDetails