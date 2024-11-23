import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListPage = () => {
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    fetch('https://672818c6270bd0b97554511a.mockapi.io/api/t1/players')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(err => console.error('Error fetching players:', err));
  }, []);

  return (
    <div>
      <h1>선수 목록</h1>
      {players.map(player => (
        <div key={player.id}>
          <p>{player.name} - {player.position}</p>
          <Link to={`/detail/${player.id}`}>상세 보기</Link> | 
          <Link to={`/update/${player.id}`}>수정</Link>
        </div>
      ))}
    </div>
  );
};

export default ListPage;
