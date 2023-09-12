import React from 'react'
import { Translation } from "react-i18next"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function OVSearchbar(props) {
  const [searchValue, setValue] = useState("");
  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
    if (searchValue === ""){
      navigate(`/collection/All/1`, { replace: true  } );
    }else{
      navigate(`/collection/${searchValue}/1`, { replace: true  } );
    }
  };

  var placeholder = "Search..."
  if (props.placeholder !== undefined ){
    placeholder = props.placeholder
  }

  return (
    <Translation>
        {(t, { i18n }) => (
            <div className="blog-sidebar-search mb-55 md-mb-40">
                <form action="#" onSubmit={onSubmit}>
                    <input type="text" placeholder="Search..." onChange={(event) =>  setValue(event.target.value) }/>
                    <button role="button" ><i className="bi bi-search"></i></button>
                </form>
            </div>
        )}
    </Translation>
  )
}

export default OVSearchbar