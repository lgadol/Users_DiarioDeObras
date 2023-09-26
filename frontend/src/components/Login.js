import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
  text-align: center;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  color: white;
  background-color: #2c73d2;
  &:hover {
    background-color: #1f4b85;
  }
`;

const Login = ({ onLogin }) => {
    const [ma, setMa] = useState('');
    const [s, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:8800/login', { ma, s })
            .then(({ data }) => {
                toast.success(`Bem-Vindo ${data.nome}!`);
                console.log('Chamando onLogin...');
                onLogin();
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
                console.log('onLogin chamado!');
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
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Login</Title>
                <Label>
                    Ma:
                    <Input value={ma} onChange={e => setMa(e.target.value)} required />
                </Label>
                <Label>
                    Senha:
                    <Input type="password" value={s} onChange={e => setPassword(e.target.value)} required />
                </Label>
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
    );
};

export default Login;
