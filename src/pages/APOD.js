import React, { useEffect, useState } from 'react'
import { fetchApi } from '../functions/fetchApi';

export const APOD = () => {
  const [loading, setloading] = useState(true);
  const [apod, setApod] = useState("");
  const [bgUrl, setBgUrl] = useState("");

 // "https://api.nasa.gov/planetary/apod?api_key=ef85gqVoyEVuuIgsl1DgBPmfwLVWKiTB8F5wuoV9"

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchApi("https://api.nasa.gov/planetary/apod?api_key=ef85gqVoyEVuuIgsl1DgBPmfwLVWKiTB8F5wuoV9"
      );
      setApod(response);
      try{
        await fetch(response.hdurl, {mode: "no-cors"})
        setBgUrl(response.hdurl)
      }
      catch{
        setBgUrl(response.url)
      }
      setloading(false);
    }
    asyncFetch();   
  }, []);

  if(loading){
    return (
          <h2>This app is Loading</h2>
    );
  }else {
    return (
      <>
        <h2 className='text-center font-italic'>{apod.title}</h2>
        <h4 className='text-center'>{apod.copyright}</h4>
        <img src={bgUrl} style={{width:"100%"}}>
          </img>
        <p>{apod.explanation}</p>
      </>
    );
  } 
}
