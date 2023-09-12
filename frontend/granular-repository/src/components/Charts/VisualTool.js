import React, { useEffect, useState } from 'react'
import NightingaleChart from './NightingaleChart';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';  
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import BasicChart from './BasicChart';
import { FetchCharts } from '../../Functions';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DoughnutChart from './DoughnutChart';

function VisualTool() {
  
	const filter = [
		{
			name: "Geographic coverage of datasets",
			values: [
			{ name :'Grid level', value : 20},
			{ name :'Lau level', value : 15},
			{ name :'National level', value : 5},
			{ name :'NUTS2 level', value : 25},
			{ name :'NUTS3 level', value : 20},
			{ name :'Unknown', value : 3},
			]
		},
		{
			name: "Dataset update frequency",
			values: [
				{ name :'Annual basis', value : 20},
				{ name :'Bi-annual basis', value : 15},
				{ name :'Less than annual frequency', value : 5},
				{ name :'More than bi-annual frequency', value : 25}
			]
		},
		{
			name: "Datasets per data class",
			values: [
				{ name :'Qualitative datasets', value : 20},
				{ name :'Quantitative datasets', value : 25},
				{ name :'Time-series datasets', value : 15},
				{ name :'Cross-sectoral datasets', value : 25}
			]
		},
		{
			name: "Datasets per data type",
			values: [
				{ name :'Numerical datasets', value : 5},
				{ name :'Text datasets', value : 25},
				{ name :'Survey datasets',value : 11},
				{ name :'Satellite datasets', value : 13},
				{ name :'Vector datasets', value : 20},
				{ name :'Raster datasets', value : 5},
				{ name :'RS/GIS datasets', value : 5},
				{ name :'Point datasets',value : 21},
				{ name :'Tabular datasets', value : 20}
			]
		},
		{
			name: "Cost considerations for data access",
			values: [
				{ name :'Yes', value : 5},
				{ name :'No', value : 25},
				{ name :'Partial', value : 11},
				{ name :'n/a', value : 13}
			]
		}
	];
	
	var [filters, setFilters] = useState([]);
	var [filtersM, setFiltersM] = useState([]);
	var [selectedFiltersM, setSelectedFiltersM] = useState([]);
	const [type, setType] = useState('Nightingale');
	const [data ,setData] = useState([])
	const [dataM ,setDataM] = useState([])
	const filter_names = ["Geographic coverage of datasets","Dataset update frequency","Datasets per data class","Datasets per data type","Datasets data access"]

	
	useEffect(() => {
		async function fetchchartdata() {
			try {
				const response = await FetchCharts(filters.map(item => item.value));
				setData(response.data);
			} catch (error) {
				console.error(error);
			} 
		}
		fetchchartdata();
	},[filters]); 

	useEffect(() => {
		async function fetchchartdata() {
			try {
				const response = await FetchCharts(filtersM.map(item => item.value));
				setDataM(response.data);
			} catch (error) {
				console.error(error);
			} 
		}
		fetchchartdata();
	},[filtersM]);

	const handleChange = (event) => {
		if (filters.some(item => item.value === event.target.value)) {
			const newArray = filters.filter(item => item.value !== event.target.value);
    		setFilters(newArray);
		}else{
			setFilters([...filters,{value : event.target.value , type:0}]);
		}
	};

	const handleChangeType = (name) => (event,value) => {
		setFilters(prevItems => {
			return prevItems.map(item => {
			  if (item.value === name) {
				return { ...item, type: value }; 
			  }
			  return item; 
			});
		});
	};


	const handleChangeMobile = (event) => {
		const {
			target: { value },
		} = event;
		setSelectedFiltersM(
			typeof value === 'string' ? value.split(',') : value,
		);
		console.log(event.target.value)
		event.target.value.forEach(name => {
			if (!filtersM.some(item => item.value === name)) {
				setFiltersM([...filtersM,{value : event.target.value[event.target.value.length-1] , type:0}]);
			}
		});
		filtersM.forEach(name => {
			if (event.target.value.indexOf(name.value) === -1 ) {
				const newArray = filtersM.filter(item => item.value !== name.value);
				setFiltersM(newArray);
			}
		});
	};

	const handleChangeTypeM = (name) => (event,value) => {
		setFiltersM(prevItems => {
			return prevItems.map(item => {
			  if (item.value === name) {
				return { ...item, type: value }; 
			  }
			  return item; 
			});
		});
	};

	return (
		<div className="main-page-wrapper">
			<Header/>
			
			<div className="fancy-feature-fiftyOne position-relative pt-190 pb-225 lg-pb-150 lg-pt-150 md-pb-80">
				<div className="container"> 
					
					<div className="d-md-none">
						<div className="filter-bar-container">
							<div className="filter-bar">
								<FormControl sx={{ m: 1, width: 1000 }}>
									<InputLabel id="demo-multiple-checkbox-label">Please select the indicators</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={selectedFiltersM}
										onChange={handleChangeMobile}
										input={<OutlinedInput label="Tag" />}
										renderValue={(selected) => selected.join(', ')}
										// checked={Object.values(filtersM).map(entry => entry.value)}
									>
										{filter_names.map((item) => (
											<MenuItem key={item} value={item}>
											<Checkbox checked={selectedFiltersM.indexOf(item) > -1} />
											<ListItemText primary={item} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</div>
					
						<div className="container py-5">
							{filtersM.length<1 && (
								<div className="text-center">
									<em>Please select one or more indicators to start the visualization</em>
								</div>
							)}
							{/* <div className="mb-2"> */}
							{
								filtersM.map(option=>(
									<div className="d-flex flex-wrap align-items-center mb-40">
										<Box className="mb-10" sx={{ width: '100%', bgcolor: 'background.paper' }}>
											<Tabs value={option.type} onChange={handleChangeTypeM(option.value)} centered>
												<Tab label="Nightingale" />
												<Tab label="Basic" />
												<Tab label="Doughnut" />
											</Tabs>
										</Box>
										{(option.type===0) ? (
											<div className="mob">
												<NightingaleChart  chartData={dataM.find(item => item.name === option.value)}/>
											</div>
										):(option.type===1)? (
											<div className="mob">
												<BasicChart  chartData={dataM.find(item => item.name === option.value)}/>
											</div>
										):(
											<div className="mob">
												<DoughnutChart  chartData={dataM.find(item => item.name === option.value)}/>
											</div>
										)}
									</div>
								))
							}
							{/* </div> */}
						</div>
					</div>


					<div className="visual-container d-none d-md-grid">
						<div className="left-panel side-bar"  >
							<div className="blog-sidebar-category mt-3 mb-60 md-mb-50 sidebar">
								<h4 className="sidebar-title">Indicator category</h4>
								<div>
									<FormGroup className="form-group" >
										{filter_names.map((item) => (
											<FormControlLabel  control={<Checkbox value={item} checked={filters.some(obj => obj.value === item)} onChange={handleChange}  />} label={item} />
										))}
									</FormGroup>    
								</div>
							</div>
						</div>
						<div className="right-panel">
							<div className="container py-5">
								{filters.length<1 && (
									<div className="text-center">
										<em>Please select one or more indicators to start the visualization</em>
									</div>
								)}
								<div className="column-container">
								{(data) && 
									filters.map(option=>(
										<div className="d-flex flex-column align-items-center">
											<Box sx={{ width: '70%', bgcolor: 'background.paper' }}>
												<Tabs value={option.type} onChange={handleChangeType(option.value)} centered>
												<Tab label="Nightingale" />
												<Tab label="Basic" />
												<Tab label="Doughnut" />
												</Tabs>
											</Box>
											{(option.type===0) ? (
												<div className="p-3" >
													<NightingaleChart  chartData={data.find(item => item.name === option.value)}/>
												</div>
											):(option.type===1)? (
												<div className="p-3" >
													<BasicChart  chartData={data.find(item => item.name === option.value)}/>
												</div>
											):(
												<div className="p-3">
													<DoughnutChart chartData={data.find(item => item.name === option.value)}/>
												</div>
											)}
											</div>
									))
								}
								</div>
							</div>
						
					</div>
				</div>
			</div> 
				
			</div>
			<Footer/>
		</div>
	)
}

export default VisualTool