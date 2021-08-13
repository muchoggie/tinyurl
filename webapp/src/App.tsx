import React from 'react';
import { useState } from 'react';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [tinyUrlId, setTinyUrlId] = useState('');

  const onInputChange = (event: any) => {
    setOriginalUrl(event.target.value);
  }

  const onSubmit = () => {
    var data = { url: originalUrl }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8000/api/tinyurls", true);
    xmlHttp.setRequestHeader("Content-type", "application/json");

    xmlHttp.addEventListener("load", () => {
      const response = JSON.parse(xmlHttp.response);
      setTinyUrlId(response.tinyUrlId)
    });

    xmlHttp.send(JSON.stringify(data));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', margin: '300px auto', width: '50%' }}>
      <p style={{ flex: 1, display: 'flex', flexDirection: 'row', position: 'relative', margin: '0 auto' }}>
        <input type="text" placeholder="https://www.googl..." value={originalUrl} onChange={onInputChange} style={{ width: '300px' }} />
      </p>
      <p style={{ flex: 1, display: 'flex', flexDirection: 'row', position: 'relative', margin: '20px auto' }}>
        <button onClick={onSubmit}>Create</button>
      </p>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', position: 'relative', margin: '10px auto' }}>
        {tinyUrlId ? <><a>The new url is: </a><a href={`http://localhost:8000/${tinyUrlId}`} target="_blank" rel="noreferrer">http://localhost:8000/{tinyUrlId}</a></> : ''}
      </div>
    </div>
  );
}

export default App;
