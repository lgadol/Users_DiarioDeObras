import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaUserLargeSlash, FaPencil, FaEraser } from "react-icons/fa6";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

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

  const handleDelete = async (id) => {
    await axios
      .put("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);

  };

  const handleClean = async (id) => {
    await axios
      .put("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit();
  };

  return (
    <div>
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
            ? <div style={{ textAlign: "center" }} >Nenhum usuário desativado.</div>
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
                    <FaPencil title="Editar Usuário" onClick={() => handleEdit(item)} />
                  </Icon>
                </Td>
                <Td alignCenter width="5%">
                  <Icon color="brown" hoverColor="#571717">
                    <FaUserLargeSlash title="Desativar Usuário" onClick={() => handleDelete(item.id)} />
                  </Icon>
                </Td>
                <Td alignCenter width="5%">
                  <Icon color="darkorange" hoverColor="#bd6800">
                    <FaEraser title="Limpar Senha" onClick={() => handleClean(item.id)} />
                  </Icon>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      {/* Aqui começa o outro bloco com a lista dos usuários com ativo como "false" */}
      <div style={{ marginTop: "20px" }}>
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
                        <FaPencil title="Editar Usuário" onClick={() => handleEdit(item)} />
                      </Icon>
                    </Td>
                    <Td alignCenter width="5%">
                      <Icon color="brown" hoverColor="#571717">
                        <FaUserLargeSlash title="Desativar Usuário" onClick={() => handleDelete(item.id)} />
                      </Icon>
                    </Td>
                    <Td alignCenter width="5%">
                      <Icon color="darkorange" hoverColor="#bd6800">
                        <FaEraser title="Limpar Senha" onClick={() => handleClean(item.id)} />
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
