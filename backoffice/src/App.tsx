import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

type DomainRecord = {
  domain: string,
  count: number
}

const App = () => {
  const [domains, setDomains] = useState<DomainRecord[]>([]);

  useEffect(() => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8000/api/domains/most_visited?lag=1d", true);
    xmlHttp.setRequestHeader("Content-type", "application/json");

    xmlHttp.addEventListener("load", () => {
      const response = JSON.parse(xmlHttp.response);
      console.log(response);
      setDomains(response);
    });

    xmlHttp.send();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', margin: '300px auto', width: '50%' }}>
      <p style={{ margin: '10px auto' }}><u>Most visited domains in the past 24h:</u></p>
      {domains.map((domainRecord) => {
        return (<>
          <p style={{ margin: '10px auto' }}><b>Domain: </b>{domainRecord.domain}  -  <b>Occurrences: </b>{domainRecord.count}</p>
        </>)
      })}
    </div>
  );
}

export default App;
