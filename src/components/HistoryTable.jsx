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
import { useCozinha } from "../context/CozinhaContext";

export default function HistoryTable() {
  const { cozinha } = useCozinha();
  console.log(cozinha);

  return (
    <TableContainer component={Paper} className="pizza-table-container">
      <Table aria-label="pizza table" className="pizza-table">
        {/* Cabeçalho */}
        <TableHead className="pizza-table-head">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Pedido</TableCell>
            <TableCell>Valor Total</TableCell>
            <TableCell sx={{ width: "250px" }}>Entrega</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        {/* Conteúdo */}
        <TableBody>
          {cozinha.map((c) => (
            <TableRow
              sx={{
                border: 0,
              }}
              key={c.id}
            >
              <TableCell scope="row">{c.id}</TableCell>
              <TableCell scope="row">
                {/* Subtabela */}
                <Table>
                  <TableBody
                    sx={{
                      border: 0,
                    }}
                  >
                    {c.pedidos.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.quantidade}x</TableCell>
                        <TableCell>{p.nome}</TableCell>
                        <TableCell>{p.tamanho}</TableCell>
                        <TableCell align="right">{p.valor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
              <TableCell scope="row" align="right">
                R${c.valor}
              </TableCell>
              <TableCell
                scope="row"
                sx={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  width: "250px",
                }}
              >
                {c.mesa ? `Mesa ${c.mesa}` : ""}
                {c.endereco ? c.endereco : ""}
              </TableCell>
              <TableCell scope="row">
                {c.entregue ? "Entregue" : "Em Andamento"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
