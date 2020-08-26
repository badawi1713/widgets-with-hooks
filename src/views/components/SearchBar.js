import React, { useEffect } from "react";
import Axios from "axios";

const SearchBar = () => {
  const [term, setTerm] = React.useState("");
  const [debouncedTerm, setDebouncedTerm] = React.useState(term);
  const [results, setResults] = React.useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const searchHandler = async () => {
      const response = await Axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      try {
        await setResults(response.data.query.search);
      } catch (error) {
        console.log(error);
      }
    };

    if (debouncedTerm && !results.length) {
      searchHandler();
    } else {
      const clearoutId = setTimeout(() => {
        if (debouncedTerm) {
          searchHandler();
        }
      }, 1000);
      return () => {
        clearTimeout(clearoutId);
      };
    }
  }, [debouncedTerm, results]);

  const renderedResults = results.map((item, index) => {
    return (
      <div className="item" key={item.pageid}>
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${item.pageid}`}
            className="ui button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go
          </a>
        </div>

        <div className="content">
          <div className="header">{item.title}</div>
        </div>
        <span dangerouslySetInnerHTML={{ __html: item.snippet }}></span>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="Enter search term">Enter Search Term</label>
          <input
            type="text"
            name=""
            id=""
            className="input"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default SearchBar;
