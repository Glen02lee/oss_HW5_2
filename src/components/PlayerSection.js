import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const apiURL = "https://672818c6270bd0b97554511a.mockapi.io/api/t1/players";

const PlayerSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [allPlayers, setAllPlayers] = useState([]);
  const [isPlayerListVisible, setIsPlayerListVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    position: '',
    career_start: '',
    career_end: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);  // 모달 상태 추가
  const [editMode, setEditMode] = useState(false); // 수정 모드 확인용

  // 선수 목록 불러오기
  const loadPlayers = () => {
    setIsLoading(true);
    fetch(apiURL)
      .then((response) => response.json())
      .then((players) => {
        setAllPlayers(players);
        setIsLoading(false);
        setIsPlayerListVisible(true);
      })
      .catch((error) => {
        console.error("선수 목록을 불러오는 중 오류 발생:", error);
        setIsLoading(false);
      });
  };

  // 선수 추가
  const addPlayer = () => {
    if (!newPlayer.name || !newPlayer.position || !newPlayer.career_start || !newPlayer.career_end) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayer),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPlayers([...allPlayers, data]);
        closeModal(); // 모달 닫기
      })
      .catch((err) => console.error("Error:", err));
  };

  // 선수 수정
  const editPlayer = () => {
    if (!newPlayer.name || !newPlayer.position || !newPlayer.career_start || !newPlayer.career_end) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    fetch(`${apiURL}/${newPlayer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlayer),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedPlayers = allPlayers.map(player =>
          player.id === data.id ? data : player
        );
        setAllPlayers(updatedPlayers);
        closeModal(); // 모달 닫기
      })
      .catch((err) => console.error("Error:", err));
  };

  // 선수 삭제
  const deletePlayer = (playerId) => {
    fetch(`${apiURL}/${playerId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedPlayers = allPlayers.filter(player => player.id !== playerId);
        setAllPlayers(updatedPlayers);
      })
      .catch((error) => console.error("선수 삭제 중 오류 발생:", error));
  };

  // 검색 필터링
  const filteredPlayers = allPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 모달 열기
  const openModal = (player = null) => {
    if (player) {
      setNewPlayer(player); // 수정할 선수 데이터를 모달에 채우기
      setEditMode(true); // 수정 모드 활성화
    } else {
      setNewPlayer({
        name: '',
        position: '',
        career_start: '',
        career_end: '',
      });
      setEditMode(false); // 추가 모드 활성화
    }
    setIsModalVisible(true); // 모달 보이기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalVisible(false);
    setEditMode(false);
  };

  // 현재 경로에 맞는 페이지 렌더링
  const renderPage = () => {
    switch (location.pathname) {
      case '/detail':
        return <div>선수 상세 페이지</div>; // 상세 페이지 구현 필요
      case '/update':
        return <div>선수 수정 페이지</div>; // 수정 페이지 구현 필요
      case '/list':
      case '/':
        return (
          <div>
            <button onClick={loadPlayers}>
              선수 목록 불러오기
            </button>

            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isLoading && <p>로딩 중...</p>}

            <div>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <div key={player.id}>
                    <p>
                      ID: {player.id}, 이름: {player.name}, 포지션: {player.position}, 경력: {player.career_start} - {player.career_end}
                    </p>
                    <button onClick={() => navigate(`/update/${player.id}`)}>수정</button>
                    <button onClick={() => deletePlayer(player.id)}>삭제</button>
                  </div>
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </div>
          </div>
        );
      default:
        return <div>404 페이지를 찾을 수 없습니다.</div>;
    }
  };

  return (
    <div id="player-section">
      {renderPage()}
      <button onClick={() => navigate('/update')}>선수 추가</button>
    </div>
  );
};

export default PlayerSection;
