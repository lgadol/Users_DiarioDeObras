import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import Login from "./components/Login.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import logoMedabil from './img/Institucional_horizontal.png';
import logoInovacao from './img/Inovação2.png';

const Container = styled.div`
  width: 100%;
  max-width: 1500px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

const StyledLogoutButton = styled(FaSignOutAlt)`
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
  color: #2c73d2;
  cursor: pointer;

  &:hover {
    color: #1f4b85;
  }
`;

const ButtonText = styled.span`
  margin-right: 3px;
`;

const LogoutButton = ({ setIsLoggedIn, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  return (
    <ButtonContainer onClick={handleLogout}>
      <ButtonText>{children}</ButtonText>
      <StyledLogoutButton />
    </ButtonContainer>
  );
};

const ImageM = styled.img`
  position: absolute;
  width: 100px;
  margin-top: 5px;
`;

const ImageI = styled.img`
  position: absolute;
  margin-left: 110px;
  margin-top: 5px;
  width: 75px;
`;

const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  color: #2c73d2;
  font-size: 15px;
`;

const Username = styled.span`
  color: #2c73d2;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLogin = async (ma, s) => {
    let success = false;
    await axios.post('http://localhost:8800/login', { ma, s })
      .then(({ data }) => {
        toast.success(`Bem-Vindo ${data.nome}!`);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        setUsername(data.nome);
        localStorage.setItem('username', data.nome);
        success = true;
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response) {
          toast.error(error.response.data);
        } else if (error.request) {
          toast.error("Nenhuma resposta recebida do servidor.");
        } else {
          toast.error(error.message);
        }
      });
    return success;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Router>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <ImageM src={logoMedabil} alt="Logo" />
      <ImageI src={logoInovacao} alt="Logo" />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {isLoggedIn ? (
          <Route path="/" element={
            <>
              <UserDisplay>
                <FaUserAlt />
                <Username>{username}</Username>
              </UserDisplay>
              <LogoutButton setIsLoggedIn={setIsLoggedIn}>
                Sair
              </LogoutButton>
              <Container>
                <Title>Adicionar/Editar Usuário</Title>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
                <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
              </Container>
              <GlobalStyle />
            </>
          } />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;