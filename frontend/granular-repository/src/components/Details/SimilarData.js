import React from 'react'
import { Link } from 'react-router-dom'

function SimilarData(props) {

  let description = props.description;
  const descriptionlength = 100
    if (description && description.length <= descriptionlength){
      description = description.substring(0, description.length)
    }else if(description.length > descriptionlength){
      description = description.substring(0, descriptionlength)+"..."
    }

  return (
    <div class="news-block d-flex align-items-center pt-20 pb-20 border-top">
        {/* <div><img src={props.image} alt="" className="lazy-img"/></div> */}
      <Link to={`/details/${props.id}`} className="title tran3s link-text" style={{ width: '100%' }} >
        <div className="d-flex flex-column align-items-between p-2" style={{ width: '100%' }}>
          <h4 style={{ marginBottom: '20px' }}>
            {props.title}
          </h4>
          <div style={{ marginBottom: '30px' }}>{description}</div>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-column justify-content-center">
              <div className="">{props.date}</div>
              <div className="">By {props.author}</div>
            </div>
            <button className="m-2" style={{ borderRadius: '5px', background: props.color ? props.color : '#F0F0F0' }}>
              <div className="d-flex flex-row justify-content-between align-items-center category-tag px-2">
                <img className="categoryicon" src={`/assets/${props.categoryIcon ? props.categoryIcon : ""}`} alt="Icon" />
                  {props.categoryName ? props.categoryName : ""} ({props.fieldIndicatorClass ? props.fieldIndicatorClass : 0})
              </div>
            </button>
          </div>

        </div>
      </Link>
    </div>
  )
}

export default SimilarData