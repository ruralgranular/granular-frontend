import React ,{useState} from 'react'
import { useNavigate } from 'react-router';
import { Translation } from 'react-i18next';


function MobileSearch() {
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
            <div>
                <div className="mobile-content d-block d-lg-none">
                    <div className="d-flex flex-column align-items-center justify-content-center mt-70">
                        <form action="#" className="header-search-two position-relative" onSubmit={onSubmit}>
                            <input type="text" placeholder={t("SearchBar")} onChange={(event) => setValue(event.target.value) }/>
                            <img src="/assets/icon_122.svg" alt="" className="icon position-absolute"/>
                        </form>
                    </div>
                </div> 
            </div>
        )}
        </Translation>
    )
}

export default MobileSearch