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
import { Link } from "react-router-dom";
import { BorderBottom } from "@mui/icons-material";

function createData(id_comanda, id_pizza, nome, tamanho, descricao) {
  return { id, nome, tipo, ingredientes, preco_p, preco_m, preco_g, preco_f };
}

export default function HistoryTable() {
  //   const rows = pizzas.map((pizza) =>
  //     createData(
  //       pizza.id,
  //       pizza.nome,
  //       pizza.tipo,
  //       pizza.ingredientes,
  //       pizza.valores.pequena,
  //       pizza.valores.media,
  //       pizza.valores.grande,
  //       pizza.valores.familia
  //     )
  //   );

  return (
    <TableContainer component={Paper} className="pizza-table-container">
      <Table aria-label="pizza table" className="pizza-table">
        {/* Cabeçalho */}
        <TableHead className="pizza-table-head">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Pedido</TableCell>
            <TableCell>Valor Total</TableCell>
            <TableCell>Entrega</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        {/* Conteúdo */}
        <TableBody>
          <TableRow
            sx={{
              border: 0,
            }}
          >
            <TableCell scope="row">002</TableCell>
            <TableCell scope="row">
              {/* Subtabela */}
              <Table>
                <TableBody
                  sx={{
                    border: 0,
                  }}
                >
                  <TableRow>
                    <TableCell>Mussarela</TableCell>
                    <TableCell>Pequena</TableCell>
                    <TableCell>34,99</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
            <TableCell scope="row">34,99</TableCell>
            <TableCell scope="row">Darcy Vargas, 1500, Adrianópolis</TableCell>
            <TableCell scope="row">Em andamento</TableCell>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell scope="row">001</TableCell>
            <TableCell scope="row">
              {/* Subtabela */}
              <Table>
                <TableBody
                  sx={{
                    border: 0,
                  }}
                >
                  <TableRow>
                    <TableCell>Calabresa</TableCell>
                    <TableCell>Grande</TableCell>
                    <TableCell>59,99</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Calabresa</TableCell>
                    <TableCell>Familia</TableCell>
                    <TableCell>69,99</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
            <TableCell scope="row">189,97</TableCell>
            <TableCell scope="row">Mesa 01</TableCell>
            <TableCell scope="row">Entregue</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
