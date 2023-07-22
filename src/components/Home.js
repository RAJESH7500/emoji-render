import React, { useEffect, useState } from 'react';
const Home = () => {
  // react state to hold the data
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [index, setIdex] = useState(0);
  const [renderData, setRenderData] = useState([]);
  //useEffect to fetch the data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://emojihub.yurace.pro/api/all');
      const responseData = await response.json();
      setRenderData(responseData.slice(0, 10));
      setData(responseData);
      setFilterData(responseData);
    };
    fetchData();
  }, []);

  //useEffect to render the list of searched emoji
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newData = data.filter((emoji) =>
        emoji.category.includes(inputValue)
      );
      setFilterData(newData);
      setRenderData(newData.slice(0, 10));
      console.log('new flag data', newData);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  useEffect(() => {
    const newData = filterData.slice(index * 10, index * 10 + 10);
    setRenderData(newData);
  }, [index]);

  const handlenext = () => {
    if (index < 0 || index > filterData.length / 10) {
      setIdex(0);
    } else {
      setIdex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index < 0 || index > filterData.length / 10) {
      setIdex(0);
    } else {
      setIdex(index - 1);
    }
  };

  //function to retur the actual emoji code to render as a html code
  const decodedEmoji = (emojiCode) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = emojiCode;
    return textarea.value;
  };

  return (
    <div className='main-container'>
      <div className='search-bar'>
        <input
          className='search-input'
          type='text'
          placeholder='Search emojis...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className='emoji-container'>
        {renderData.map((emoji, index) => (
          <h
            className='emoji-item'
            key={index}
            dangerouslySetInnerHTML={{
              __html: decodedEmoji(emoji.htmlCode[0]),
            }}
          />
        ))}
      </div>
      <div className='buttons'>
        <button type='button' className='btn btn-primary' onClick={handlePrev}>
          Prev
        </button>
        <button
          type='button'
          className='btn btn-secondary ml-3'
          onClick={handlenext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
