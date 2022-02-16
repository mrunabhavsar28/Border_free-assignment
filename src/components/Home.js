import React from "react";
import { useNavigate } from 'react-router-dom';
import { key, cx } from "../API";
import axios from "axios";



import { FaSistrix, FaMicrophone } from "react-icons/fa";
const Home = (props) => {
  const [state, setState] = React.useState("");
  // console.log(props)
  const [results, setResults] = React.useState([]);
  const [info, setInfo] = React.useState("");
 
  const navigate = useNavigate();

  const SearchAsk = async (e) => {
    e.preventDefault();
    console.log(state)
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
    navigate("/search", {state:{searchName:state, results:results, info:info}
  }
    )

    
  };
  return (
    <div className="Home_btn">
      {/* <h1>{state}</h1> */}
      <div className="home__container">
        <div className="home__logo">
          <img src="https://1000logos.net/wp-content/uploads/2018/09/Ask.com-Logo-500x281.jpg" alt="Logo" />
        </div>
        <form className="home__form" onSubmit={SearchAsk}>
          <input
            type="text"
            className="home__input"
            onChange={(e) => setState(e.target.value)}
            value={state}
            required
          />
          <div className="home__group">
            <input type="submit" className="home__btn" value="ASK me" />
          </div>
          <FaSistrix className="search__icon" />
          <FaMicrophone className="microphone" />
        </form>
      </div>
    </div>
  );
};

export default Home;
