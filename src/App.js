import React, { useState } from "react";

function App() {
  const currentDate = new Date()
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");

  const sampleData = {
    quotes: {
      SGDAUD: 1.048665,
      SGDCAD: 0.936289,
      SGDCNY: 4.935779,
      SGDHKD: 5.583746,
      SGDHUF: 288.658241,
      SGDJPY: 99.976137,
      SGDKRW: 976.199554,
      SGDMXN: 14.232897,
      SGDMYR: 3.194992,
      SGDNZD: 1.168546,
      SGDPHP: 40.514852,
      SGDUSD: 0.711417,
    },
    source: "SGD",
    success: true,
    timestamp: 1662365883,
  };
  const sampleForexArray = Object.entries(sampleData.quotes);

  const [inputDate, setInputDate] = useState(currentDate);
  const [liveData, setLiveData] = useState(sampleForexArray);

  const handleClick = (e) => {
    e.preventDefault();
    setInputDate(currentDate);
    fetchLiveForex();
  };

  const handleDate = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInputDate(e.target.value.split("-").reverse().join("-"));
    fetchHistoricalForex(e.target.value);
  };

  const fetchLiveForex = async () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "tYQ7EhPDkqSITYJ72t0pAMYgZsnfM6VR");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    try {
      const res = await fetch(
        "https://api.apilayer.com/currency_data/live?source=SGD&currencies=USD%2CCAD%2CHKD%2CPHP%2CHUF%2CAUD%2CJPY%2CCNY%2CMXN%2CMYR%2CKRW%2CNZD",
        requestOptions
      );
      console.log(res);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      const forexArray = Object.entries(data.quotes);
      setLiveData(forexArray);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHistoricalForex = async (selectedDate) => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "tYQ7EhPDkqSITYJ72t0pAMYgZsnfM6VR");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    try {
      const res = await fetch(
        `https://api.apilayer.com/currency_data/historical?date=${selectedDate}&source=SGD&currencies=USD%2CCAD%2CHKD%2CPHP%2CHUF%2CAUD%2CJPY%2CCNY%2CMXN%2CMYR%2CKRW%2CNZD`,
        requestOptions
      );
      console.log(res);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      const forexArray = Object.entries(data.quotes);
      setLiveData(forexArray);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <h1>Yet Another Forex</h1>
          <h4>(base currency SGD)</h4>
        </div>
        <div className="col-md-3">
          <button className="button-81" onClick={handleClick}>
            Get today's rates
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {inputDate ? <h4>Rates as of {inputDate}</h4> : <></>}
        </div>
        <div className="col-md-6">
          <input type="date" onChange={handleDate}></input>
        </div>
      </div>
      <div className="row">
        {liveData ? (
          liveData.map((data, index) => {
            return (
              <div key={index} className="col-md-3">
                <h4>{data[0].substring(3)}</h4>
                <h4>{data[1]}</h4>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
