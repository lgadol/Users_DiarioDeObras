import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { FaSignOutAlt } from 'react-icons/fa';
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import Login from "./components/Login.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';

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
  float: right;

  color: #2c73d2;
  &:hover {
    color: #1f4b85;
  }
`;

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Atualiza o valor no localStorage quando o usuário faz logout
    navigate('/login');
  };

  return <StyledLogoutButton onClick={handleLogout} />;
};

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={() => { setIsLoggedIn(true); localStorage.setItem('isLoggedIn', 'true'); }} />} /> 
        {isLoggedIn ? (
          <Route path="/" element={
            <>
              {console.log('Renderizando o componente quando o usuário está logado')}
              <LogoutButton setIsLoggedIn={setIsLoggedIn} />
              <Container>
                <Title>Adicionar/Editar Usuário</Title>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
                <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
              </Container>
              <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
              <GlobalStyle />
            </>
          } />
        ) : (
          <Route path="*" element={
            <>
              {console.log('Renderizando o componente quando o usuário não está logado')}
              <Navigate to="/login" />
            </>
          } />
        )}
      </Routes>
    </Router>
  );
}

export default App;
