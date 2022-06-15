import React, { useEffect, useState } from 'react';
import { fetchApi } from '../functions/fetchApi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";

export const NEO = () => {
  const [loading, setloading] = useState(true);
  const [neo, setNeo] = useState("");
  //const todaysdate = new date.split(",")[0];
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    async function asyncFetch() {
      let response = await fetchApi(
      "https://api.nasa.gov/neo/rest/v1/feed?" +
      "start_date="+
      moment(date).format("YYYY-MM-DD") + 
      "&end_date=" +
      moment(date).format("YYYY-MM-DD") +
      "&api_key=ef85gqVoyEVuuIgsl1DgBPmfwLVWKiTB8F5wuoV9");
      setNeo(response.near_earth_objects);
      setloading(false);
      console.log(moment(date).format("YYYY-MM-DD"));
    }
    asyncFetch();
  }, [date]);

  const neoStyle = {
    maxWidth: "18rem"
  }

  const NeoItem = () => {
    return (
      <div className="pt-5" style={{ width: "60%", margin: "0 auto" }}>
        <div className="d-flex flex-wrap justify-content-around">
          {neo[moment(date).format("YYYY-MM-DD")].map((n) => (
            <div key={n.id} className="card text-white bg-dark mb-5" style={neoStyle}>
              <div className="card-header">{n.name}</div>
              <div className="card-body">
                <h5 className="card-title mb-4">
                  Closest on {n.close_approach_data[0].close_approach_date_full}
                </h5>
                <p className="card-text">
                  Max Diameter:&nbsp;
                  {n.estimated_diameter.kilometers.estimated_diameter_max}
                  <br />
                  {n.is_potentially_hazardous_asteroid ? (
                      <span className='text-danger'>"It is hazardous bro be careful"</span>
                  ) : (
                    <span className='text-success'>"Char Din ki Chandni Brow"</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && neo[moment(date).format("YYYY-MM-DD")]) {
    return (
      <>
      <h4 className='text-center'> date Is {moment(date).format("YYYY-MM-DD")} </h4>
      <div className="d-flex justify-content-center mt-5"><Calendar onChange={setDate} value={date} /></div>
      <NeoItem/>
      </>
    );
    
  } else {
    return (
   <h2>Please wait, the app is loading!</h2>
   ) 

  }
};
