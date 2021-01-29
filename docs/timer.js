import React, { useState, useEffect } from 'react';

const getNow = () => Math.floor(new Date().getTime() / 1000);

const Hello = () => {
  const [now, setNow] = useState(getNow);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(getNow());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });

  return <div style={{ color: 'cyan', fontSize: '200%' }}>Now: {now}</div>;
};

export default Hello;
