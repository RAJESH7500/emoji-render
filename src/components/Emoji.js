import React from 'react';

const Emoji = ({ emoji }) => {
  //function to retur the actual emoji code to render as a html code
  const decodedEmoji = (emojiCode) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = emojiCode;
    return textarea.value;
  };

  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>{emoji.name}</h5>
        <h
          className='emoji-item'
          dangerouslySetInnerHTML={{
            __html: decodedEmoji(emoji.htmlCode[0]),
          }}
        />
      </div>
    </div>
  );
};

export default Emoji;
