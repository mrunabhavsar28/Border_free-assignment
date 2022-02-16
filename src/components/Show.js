import React from "react";


const Show = (props) => {
  const { results, info } = props;
  console.log(results);
  const handleclick=async ()=>{
    try{
      const res=await fetch("http://localhost:3070/results", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body:JSON.stringify(results) 
      });
      
      const data = await res.json();
      console.log(data)
   

    }
    catch(e){
      console.log(e)


    }
    
  }
  const handlePost = async (urlpath) => {
    await fetch("http://localhost:3070", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        path: urlpath
      }) // body data type must match "Content-Type" header
    });

  }
  return (

    <div className="show">
      <div className="show__info">
        {info ? `Total results: ${info.totalResults}` : ""}
      </div>
      {/* <button onClick={handleclick}>ok</button> */}
      {results.length > 0
        ? results.map((result) => (
          <div className="show__details">
            <div className="show__link">
              <a href={result.displayLink}>{result.displayLink}</a>
            </div>
            <div className="show__title">
              <a onClick={() => { handlePost(result.link) }
              } href={result.link}>{result.title}</a>
            </div>
            <div className="show__description">
              <p>{result.snippet}</p>
            </div>
          </div>
        ))
        : ""}
    </div>
  );
};

export default Show;
