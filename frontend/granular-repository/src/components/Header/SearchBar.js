import React , { useState } from 'react'
import { Translation } from "react-i18next"
import { useNavigate } from 'react-router-dom'

function SearchBar() {

  const [searchValue, setValue] = useState('');
  const navigate = useNavigate();
  const onSubmit = (event) => {
    event.preventDefault();
    if (searchValue === ""){
      navigate(`/collection/All/1`, { replace: true  } );
    }else{
      navigate(`/collection/${searchValue}/1`, { replace: true  } );
    }
  };

  return (
    <Translation>
      {(t, { i18n }) => (
        <div className="right-widget search-bar d-flex align-items-center order-lg-3">
            <form action="#" className="header-search-two position-relative me-4 me-xxl-5 d-none d-xl-block" onSubmit={onSubmit} >
                <input type="text" placeholder={t("SearchBar")} onChange={(event) => setValue(event.target.value) }/>
                <img src="/assets/icon_122.svg" alt="" className="icon position-absolute"/>
            </form> 
        </div>
      )}
    </Translation>
  )
}

export default SearchBar