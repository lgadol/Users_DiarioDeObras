import { useEffect, useState, useContext } from "react";
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { FaSignOutAlt, FaUserAlt, FaMoon, FaSun } from 'react-icons/fa';
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import Login from "./components/Login.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import logoMedabil from './img/Institucional_horizontal.png';
import logoInovacao from './img/Inovação2.png';
import { ThemeContext } from "./components/ThemeContext";

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
  color: red;
  cursor: pointer;

  &:hover {
    color: darkred;
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
  font-size: 15px;
`;

const Username = styled.span``;

const DarkButton = styled.button`
  border: none;
  cursor: pointer;
  margin-right: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const Logar = (ma, password) => {
    return new Promise((resolve, reject) => {
      const chamada = JSON.stringify({
        ma: ma,
        s: password,
        Banco: "users_diario_obras",
        Tabela: "get_online()"
      });
      axios.post('https://comandos.medabil.eng.br/chamar/', chamada, { headers: { "Content-Type": "application/json" } }
      ).then((response) => {
        if (response.data.Status === 'OK') {
          // Segunda chamada de API para verificar se o usuário é um administrador
          axios.post('http://localhost:8800/checkAdmin', { ma: ma }, { headers: { "Content-Type": "application/json" } }
          ).then((adminResponse) => {
            if (adminResponse.data.admin === 'true') {
              toast.success(`Bem-Vindo!`);
              setIsLoggedIn(true);
              localStorage.setItem('isLoggedIn', 'true');
              setUsername(response.data.nome);
              localStorage.setItem('username', response.data.nome);
              resolve({ success: true });
            } else {
              toast.error('Usuário sem permissão!');
              resolve({ success: false });
            }
          }).catch((adminError) => {
            toast.error(adminError.message);
            reject(adminError);
          });
        } else {
          toast.error('MA ou senha incorretos.');
          resolve({ success: false });
        }
      }).catch((error) => {
        toast.error(error.message);
        reject(error);
      });
    })
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
        <ImageM src={logoMedabil} alt="Logo" />
        <ImageI src={logoInovacao} alt="Logo" />
        <Routes>
          <Route path="/login" element={<Login onLogin={Logar} />} />
          {isLoggedIn ? (
            <Route path="/" element={
              <>
                <UserDisplay>
                  {/* <FaUserAlt />
                  <Username>{username}</Username> */}
                </UserDisplay>
                <ButtonGroup>
                  <DarkButton onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <><FaSun /> Modo Claro</> : <><FaMoon /> Modo Escuro</>}
                  </DarkButton>
                  <LogoutButton setIsLoggedIn={setIsLoggedIn}>
                    Sair
                  </LogoutButton>
                </ButtonGroup>
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
    </ThemeContext.Provider>
  );
}

export default App;