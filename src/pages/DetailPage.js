import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const apiURL = "https://672818c6270bd0b97554511a.mockapi.io/api/t1/players";

const DetailPage = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/${playerId}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data))
      .catch((error) => console.error("선수 정보를 불러오는 중 오류 발생:", error));
  }, [playerId]);

  if (!player) {
    return <p>선수 정보를 불러오는 중...</p>;
  }

  return (
    <div>
      <h2>선수 상세 정보</h2>
      <p><strong>이름:</strong> {player.name}</p>
      <p><strong>포지션:</strong> {player.position}</p>
      <p><strong>경력 시작:</strong> {player.career_start}</p>
      <p><strong>경력 종료:</strong> {player.career_end}</p>
    </div>
  );
};

export default DetailPage;
