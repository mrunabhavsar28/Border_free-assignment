import React from "react";
import { useNavigate, useLocation} from 'react-router-dom';


import { FaSistrix, FaMicrophone } from "react-icons/fa";
 import { key, cx } from "../API";
import axios from "axios";
import Show from "./Show";
const Search = (props) => {

    const data = useLocation();

  const [state, setState] = React.useState(
   data.state.searchName
    
  );
  const [results, setResults] = React.useState([]);
  const [info, setInfo] = React.useState("");
    
  console.log(data)


  const navigate = useNavigate();

  const goBack = () => {

    navigate("/");



  };
const searchGoogle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
         `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${state}`
      );
      if (response) {
        setResults(response.data.items);
        setInfo(response.data.searchInformation);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    async function getPosts() {
      if (state) {
        try {
          const response = await fetch(
            "http://localhost:3070/results"
          );
          const data = await response.json();
          if (data) {
            setResults(data);

            console.log(results)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    getPosts();
  }, []);
  return (
    <div className="search">
      <div className="search__form">
        <div className="search__form-logo">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBywO90dK0IkAF83Eb6zpxL0LRQ5NHnbQzTn8DJ98aZB1gUfU1yfDY2bK-u1AO4hYNFDg&usqp=CAU" alt="logo" onClick={goBack} />
        </div>
        <div className="search__form-input">
          <form className="home__form" onSubmit={searchGoogle}>
            <input
              type="text"
              className="home__input"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />

            <FaSistrix className="search__icon" />
            <FaMicrophone className="microphone" />
          </form>
        </div>
      </div>
      <Show results={results} info={info} />
    </div>
  );
};

export default Search;
