import axios from "axios"
import React ,{ useEffect, useState } from "react"


var url = `${process.env.REACT_APP_API_URL}`


export async function FetchWithId(keyw){
  var key = keyw
  if (keyw === undefined){
    var key = ""
  }
  const response = await  axios.get(url+"/dataset/"+key)
  return response
}

export async function UpdateViews(uuid,field_views){
  var urls = url+'/datasets/updateViews/'+uuid+':'+(field_views)
  const response = await axios.patch(urls)
  return response
}

export async function ContactUs(selectedOption,inputEmail,inputName,comment,urlProp){
  const response = await axios.post(url+'/email', { "subject":selectedOption , "senderEmail":inputEmail , "senderName":inputName , "description":comment , "url":urlProp });
  return response
}

export async function FetchSimilar(indicator_class){
  const response = await axios.get(url+ "/datasets/similar/"+indicator_class)
  return response  
}


export async function FetchCategories(){
  const response = await axios.get(url+"/categories")
  return response
}

export async function FetchSortedCategories(){
  const response = await axios.get(url+"/categories/sorted")
  return response
}

export async function FetchRecent(){
  const response = await  axios.get(url+"/datasets/recent")
  return response
}

export async function FetchPopular(){
  const response = await axios.get(url+"/datasets/popular")
  return response
}

export async function FetchQnA () {
  const response = await axios.get(url+"/qna");
  return response;
}

export async function FetchMetadataTooltip(name){
  const response = await axios.get(url+"/metadatatooltip/"+name)
  return response
}


export async function FetchCharts(name){
  const response = await axios.get(url+"/charts/" + name)
  return response
}

export async function downloadCSV(name){
  axios.get(
    url + '/csv/' + name,
    {
      headers: {
        "Content-Type": "text/csv"  
      },
      responseType: 'blob', 
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name+'.csv');
      document.body.appendChild(link);
      link.click();
    });
}