import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useFuncionario } from "../context/FuncionarioContext";
import { Link } from "react-router-dom";

export default function PizzaTable() {
  const { funcionario, setFuncionario, removerFuncionario } = useFuncionario();

  const HandleRemoverFuncionario = (id) => {
    const removeFuncionario = async () => {
      try {
        const sucesso = await removerFuncionario(id);

        if (sucesso) {
          setFuncionario((prevFuncs) =>
            prevFuncs.filter((funcionario) => funcionario.id !== id)
          );
        }
      } catch (e) {
        console.error("Erro ao remover funcionário: ", e);
      }
    };

    removeFuncionario(id);
  };

  return (
    <TableContainer component={Paper} className="pizza-table-container">
      <Table aria-label="funcionario table" className="pizza-table">
        <TableHead className="pizza-table-head">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Convênio</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funcionario.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.cpf}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>
                {row.cargo === "garcom" ? "Garçom" : ""}
                {row.cargo === "entregador" ? "Entregador" : ""}
              </TableCell>
              <TableCell>{row?.convenio || "Nenhum"}</TableCell>
              <TableCell align="center">
                <button
                  className="table-button alter"
                  onClick={() => {
                    console.log(row);
                    console.log(row.id);
                  }}
                >
                  <Link to={`/edit-func/${row.id}`}>
                    <DriveFileRenameOutlineOutlinedIcon
                      sx={{ fontSize: "2.4rem" }}
                    />
                  </Link>
                </button>
              </TableCell>
              <TableCell align="center">
                <button
                  className="table-button delete"
                  onClick={() => {
                    HandleRemoverFuncionario(row.id);
                  }}
                >
                  <DeleteOutlineOutlinedIcon sx={{ fontSize: "2.4rem" }} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
