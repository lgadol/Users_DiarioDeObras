import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 125px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  height: 42px;

  color: white;
  background-color: #2c73d2;
  &:hover {
    background-color: #1f4b85;
  }
`;

const Select = styled.select`
  width: 145px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.admin.value = onEdit.admin;
      user.ativo.value = onEdit.ativo;
      user.ma.value = onEdit.ma;
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.admin.value ||
      !user.ativo.value ||
      !user.ma.value ||
      !user.nome.value ||
      !user.email.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          admin: user.admin.value,
          ativo: user.ativo.value,
          ma: user.ma.value,
          nome: user.nome.value,
          email: user.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          admin: user.admin.value,
          ativo: user.ativo.value,
          ma: user.ma.value,
          nome: user.nome.value,
          email: user.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.admin.value = "";
    user.ativo.value = "";
    user.ma.value = "";
    user.nome.value = "";
    user.email.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Admin</Label>
        <Select name="admin">
          <option value="true">true</option>
          <option value="false">false</option>
        </Select>
      </InputArea>
      <InputArea>
        <Label>Ativo</Label>
        <Select name="ativo">
          <option value="true">true</option>
          <option value="false">false</option>
        </Select>
      </InputArea>
      <InputArea>
        <Label>MA</Label>
        <Input name="ma" pattern="MA\d{4}"
          title="Por favor, insira no formato 'MA' seguido por quatro dígitos."
          required onChange={e => e.target.value = e.target.value.toUpperCase()}
        />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" required onChange={e => e.target.value = e.target.value.toUpperCase()} />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input
          name="email"
          type="email"
          pattern=".+@medabil\.com\.br$"
          title="Por favor, insira um e-mail que termine com '@medabil.com.br'."
        />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
