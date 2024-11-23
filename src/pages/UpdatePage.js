import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const apiURL = "https://672818c6270bd0b97554511a.mockapi.io/api/t1/players";

const UpdatePage = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState({
    name: '',
    position: '',
    career_start: '',
    career_end: '',
  });

  useEffect(() => {
    fetch(`${apiURL}/${playerId}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data))
      .catch((error) => console.error("선수 정보를 불러오는 중 오류 발생:", error));
  }, [playerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!player.name || !player.position || !player.career_start || !player.career_end) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    fetch(`${apiURL}/${playerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    })
      .then(() => navigate('/list')) // 수정 완료 후 목록 페이지로 이동
      .catch((error) => console.error("수정 중 오류 발생:", error));
  };

  return (
    <div>
      <h2>선수 수정</h2>
      <input
        type="text"
        name="name"
        value={player.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        type="text"
        name="position"
        value={player.position}
        onChange={handleChange}
        placeholder="포지션"
      />
      <input
        type="text"
        name="career_start"
        value={player.career_start}
        onChange={handleChange}
        placeholder="경력 시작 연도"
      />
      <input
        type="text"
        name="career_end"
        value={player.career_end}
        onChange={handleChange}
        placeholder="경력 종료 연도"
      />
      <button onClick={handleSubmit}>수정하기</button>
    </div>
  );
};

export default UpdatePage;
