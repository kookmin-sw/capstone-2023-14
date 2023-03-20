import React from 'react';

function Destination(props) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <img
        style={{ width: '100%', borderRadius: '15px' }}
        src={props.imgUrl}
        alt={props.title}
      />
      <span
        style={{
          position: 'absolute',
          zIndex: '1',
          color: 'white',
          left: 170,
          top: 120,
          fontWeight: 'bold',
          fontSize: '40px',
        }}
      >
        {props.title}
      </span>
      <div
        style={{
          position: 'absolute',
          width: '96%',
          height: '80px',
          zIndex: '1',
          color: 'white',
          bottom: 3,
          fontWeight: 'bold',
          backgroundColor: 'rgb(0,0,0,0.5)',
          borderRadius: '0 0 15px 15px',
          padding: '3% 0px 0px 4%',
        }}
      >
        <span>함께하면 좋은 '{props.companion}' 외 몇 명 </span>
      </div>
    </div>
  );
}
export default Destination;
