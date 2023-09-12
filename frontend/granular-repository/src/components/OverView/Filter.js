import React, { useState ,useEffect} from 'react';

const Filter = ({ options, onFilterChange ,clear,setClear,onstart,setOnstart}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const handleFilterChange = (event) => {
    const value = event.target.value;
    let newSelectedFilters = [...selectedFilters];

    if (event.target.checked) {
      newSelectedFilters.push(value);
    } else {
      newSelectedFilters = newSelectedFilters.filter(filter => filter !== value);
    }

    setSelectedFilters(newSelectedFilters);
    onFilterChange(newSelectedFilters);
  }

  useEffect(()=>{
    if (clear===true){
      setSelectedFilters([]);
      onFilterChange([]);
      setClear(false)
    }
    if (onstart!==undefined){
      var defilters = onstart.split("+")
      let newSelectedFilters = [...selectedFilters];
      defilters.map((opt)=>{
        if(options.includes(opt)){
          newSelectedFilters.push(opt)
        }
        return 0
      })
      newSelectedFilters = [...new Set(newSelectedFilters)];
      setSelectedFilters(newSelectedFilters);
      onFilterChange(newSelectedFilters);
      setOnstart(undefined)
    }
  },[clear, onstart, onFilterChange, setClear, selectedFilters, setOnstart, options])

  return (
    <div className="d-flex flex-column align-items-start justify-content-center">
      <dl>
      {options.map(option => (
        <dd className='w-100' style={{ textAlign: 'left' }}>
        <label key={option}>
          <dt>
          <input
            type="checkbox"
            value={option}
            checked={selectedFilters.includes(option)}
            onChange={handleFilterChange}
            style={{ marginRight: '1rem' }}
          />
          {option}
          </dt>
        </label>
        </dd>
      ))}
      </dl>
    </div>
  );
}

export default Filter;