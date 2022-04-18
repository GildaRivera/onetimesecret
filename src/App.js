
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [secret, setSecret] = useState();
  const [shortUrl, setShortUrl] = useState("");
  const shortenUrl = useRef();
  const [count, setCount]= useState(0)
  const secretValue=useRef()
  const [clean, setClean]= useState(true)
  const createUrl = async () => {
    if (secret) {
      const rawResponse = await fetch(`http://localhost:8080/api/secret`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret: secret, count:count }),
      });
      let response = await rawResponse.json();
      setShortUrl(response.url);
    }
  };
  useEffect(() => {
    shortenUrl.current.value = shortUrl;
  }, [shortUrl]);
  const handleChange = (e) => {
    if(e.target.value!==""){
      setClean(false)
    }
    else{
      setClean(true)
    }
    setSecret(e.target.value);
  };
  const handleClean = ()=>{
shortenUrl.current.value=""
secretValue.current.value=""
  }
  return (
    <div>
      <div className="container" style={{"maxWidth":"70%"}}>
        <div
          className="notification is-primary"
          style={{
            backgroundColor: "#e6820966",
            position: "relative",
            top: "15vh",
          }}
        >
          <h1
            className="title is-1 has-text-centered"
            style={{ marginBottom: "10vh" }}
          >
            One time Secret
          </h1>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              className="input is-warning"
              type="text"
              onChange={handleChange}
              placeholder="Your secret"
              style={{ width: "90%", borderRadius: "15px" }}
              ref={secretValue}
            />
      {clean? <></>:      <button className="clear" onClick={handleClean}>k<i className="fa-solid fa-x"></i></button>}

          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "95%",
              margin: "2vh 0",
            }}
          >
            <button
              className="button is-primary is-light"
              style={{
                backgroundColor: "#ffe08a",
                borderColor: "transparent",
                color: "rgba(0,0,0,.7)",
              }}
              onClick={createUrl}
            >
             Generate secret
            </button>
            
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              className="input is-warning"
              type="text"
              placeholder="Your secret url"
              style={{
                width: "90%",
                borderRadius: "15px",
                marginBottom: "5vh",
              }}
              ref={shortenUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;