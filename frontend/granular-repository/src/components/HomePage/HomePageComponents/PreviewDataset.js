import React from 'react'
import { Translation } from "react-i18next"
import { Link } from 'react-router-dom'


function PreviewDataset({ title, description, id, category, author }) {
    const descriptionlength = 100
    if (description && description.length <= descriptionlength){
      description = description.substring(0, description.length)
    }else if(description.length > descriptionlength){
      description = description.substring(0, descriptionlength)+"..."
    }
    
    return (
        <Translation>
        {(t, { i18n }) => (
            <div className="dataset-preview col-lg-3 col-sm-5 m-3">
                <Link style={{ padding:0, height:'100%', width: '100%' }} to={`/details/${id}`} className='link-text'>

                    {/* <img src={props.image} alt="" className="" /> */}
                    <div className="d-flex flex-column justify-content-between align-items-start p-3 h-100">
                        <p className="dataset-preview-title">
                            <Link to={`/details/${id}`} className="property-name link-text" >{title}</Link>
                        </p>
                        <p className="dataset-preview-description">{description}</p>
                        <div className="d-flex flex-row align-items-center justify-content-between dataset-preview-bottom-info">
                            <strong className="dataset-preview-author">By {author}</strong>
                            <Link to={`/details/${id}`} className="read-more tran3s link-text" >
                              <button className="m-2" style={{ 
                                borderRadius: '5px', 
                                background: category ? category.color : '#F0F0F0',
                              }}>
                                <div className="d-flex flex-row justify-content-between align-items-center category-tag p-1">
                                  <img className="categoryicon" src={`/assets/${category ? category.selected_icon : ""}`} alt="Icon" />
                                  {category ? category.name : ""} ({category ? category.field_indicator_class : 0})
                                </div>
                              </button>
                            </Link>
                        </div>
                    </div>
                </Link>
            </div>
        )}
        </Translation>
    )
}

export default PreviewDataset