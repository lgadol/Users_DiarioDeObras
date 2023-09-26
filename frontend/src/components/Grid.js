import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaUserLargeSlash, FaPencil, FaEraser, FaUserCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1500px;
  margin: 20px auto;
`;

export const H1 = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  td { border-bottom: 1px solid #ccc; }
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Icon = styled.div`
  color: ${props => props.color};
  cursor: pointer;
  &:hover {
    color: ${props => props.hoverColor};
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDeactivateUser = async (id) => {
    await axios.put(`http://localhost:8800/toggleativo/${id}`)
      .then(({ data }) => {
        toast.success(data);
        setUsers(users.map(user => user.id === id ? { ...user, ativo: user.ativo === 'true' ? 'false' : 'true' } : user));
      })
      .catch(({ data }) => toast.error(data));
  };

  const handleClearPassword = async (id) => {
    await axios.put(`http://localhost:8800/setnull/${id}`)
      .then(({ data }) => {
        toast.success(data);
        setUsers(users.map(user => user.id === id ? { ...user, s: null } : user));
      })
      .catch(({ data }) => toast.error(data));
  };

  return (
    <div>
      {/* Usuários ativos */}
      <H1>Usuários Ativos</H1>
      <Table>
        <Thead>
          <Tr>
            <Th onlyWeb>Admin</Th>
            <Th onlyWeb>Ativo</Th>
            <Th>MA</Th>
            <Th>Nome</Th>
            <Th onlyWeb>Email</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.length === 0
            ? <div style={{ textAlign: "center" }} >Nenhum usuário ativo.</div>
            : users.filter(item => item.ativo === "true").map((item, i) => (
              <Tr key={i}>
                <Td width="10%" onlyWeb>{item.admin}</Td>
                <Td width="10%" onlyWeb>{item.ativo}</Td>
                <Td width="10%">{item.ma}</Td>
                <Td width="30%">{item.nome}</Td>
                <Td width="40%" onlyWeb>
                  {item.email}
                </Td>
                <Td alignCenter width="5%">
                  <Icon color="#2c73d2" hoverColor="#1f4b85">
                    <FaPencil title="Editar Usuário" onClick={() => { handleEdit(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                  </Icon>
                </Td>
                <Td alignCenter width="5%">
                  <Icon color="brown" hoverColor="#571717">
                    <FaUserLargeSlash title="Desativar Usuário" onClick={() => handleDeactivateUser(item.id)} />
                  </Icon>
                </Td>
                <Td alignCenter width="5%">
                  <Icon color="darkorange" hoverColor="#bd6800">
                    <FaEraser title="Limpar Senha" onClick={() => handleClearPassword(item.id)} />
                  </Icon>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {/* Usuários desativados */}
      <div style={{ marginTop: "20px" }}>
        <H1>Usuários Desativados</H1>
        <Table>
          <Thead>
            <Tr>
              <Th onlyWeb>Admin</Th>
              <Th onlyWeb>Ativo</Th>
              <Th>MA</Th>
              <Th>Nome</Th>
              <Th onlyWeb>Email</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.length === 0
              ? null
              : users.filter(item => item.ativo === "false").length === 0
                ? <div style={{ textAlign: "center" }} >Nenhum usuário desativado.</div>
                : users.filter(item => item.ativo === "false").map((item, i) => (
                  <Tr key={i}>
                    <Td width="10%" onlyWeb>{item.admin}</Td>
                    <Td width="10%" onlyWeb>{item.ativo}</Td>
                    <Td width="10%">{item.ma}</Td>
                    <Td width="30%">{item.nome}</Td>
                    <Td width="40%" onlyWeb>
                      {item.email}
                    </Td>
                    <Td alignCenter width="5%">
                      <Icon color="#2c73d2" hoverColor="#1f4b85">
                        <FaPencil title="Editar Usuário" onClick={() => { handleEdit(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                      </Icon>
                    </Td>
                    <Td alignCenter width="5%">
                      <Icon color="#32cd32" hoverColor="darkgreen">
                        <FaUserCheck title="Ativar Usuário" onClick={() => handleDeactivateUser(item.id)} />
                      </Icon>
                    </Td>
                    <Td alignCenter width="5%">
                      <Icon color="darkorange" hoverColor="#bd6800">
                        <FaEraser title="Limpar Senha" onClick={() => handleClearPassword(item.id)} />
                      </Icon>
                    </Td>

                  </Tr>
                ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Grid;
