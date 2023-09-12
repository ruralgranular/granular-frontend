import React,{useState} from 'react'
import ReactECharts from 'echarts-for-react';
import { useMediaQuery } from 'react-responsive';
import MetadataModal from './MetadataModal';
import { createMyMetadataViewFeature, createMyDownloadCSVFeature } from './toolboxFeatures.js';



function DoughnutChart(props) {
    const [showPopup, setShowPopup] = useState(false);

    const isMobile = useMediaQuery({ query: `(max-width: 400px)` });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' })
    const myMetadataViewFeature = createMyMetadataViewFeature(setShowPopup);
    const myDownloadCSVFeature = createMyDownloadCSVFeature((props.chartData !== undefined) ? props.chartData.name : 'chart');
    
    const option = {
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: true,
          itemGap: 10,
          feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
              myMetadataView: myMetadataViewFeature,
              myDownloadCSV: myDownloadCSVFeature,
            },
            top: "5%",
            left: "0"
        },
        legend: {
          top: 'bottom',
          left: 'center',
          type: (props.chartData!==undefined && props.chartData.values.length > 11) ? 'scroll' : 'plain',
        },
        title: {
          text: (props.chartData!==undefined) ? props.chartData.name : "",
          textStyle: {
            fontSize : isTablet ? 14 : 18
        }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: [30, isTablet ? 150 : 200],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: (props.chartData!==undefined) ? props.chartData.values : [],
          }
        ]
      };
      return    <div>
          {(props.chartData!==undefined) && (
              <div>
                <ReactECharts option={option} className="" style={{width: isTablet ? "360px":"500px" , height:isTablet ? "500px":"600px"}} />
                <MetadataModal name={props.chartData.name} values = {props.chartData.values} showPopup={showPopup} setShowPopup={setShowPopup} type="Doughnut"/>  
              </div>
              )}
            </div>
}

export default DoughnutChart