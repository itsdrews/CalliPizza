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

function createData(
  id,
  nome,
  tipo,
  ingredientes,
  preco_p,
  preco_m,
  preco_g,
  preco_f
) {
  return { id, nome, tipo, ingredientes, preco_p, preco_m, preco_g, preco_f };
}

export default function PizzaTable({ pizzas, setPizzas, removerPizza }) {
  const rows = pizzas.map((pizza) =>
    createData(
      pizza.id,
      pizza.nome,
      pizza.tipo,
      pizza.ingredientes,
      pizza.valores.Pequena,
      pizza.valores.Média,
      pizza.valores.Grande,
      pizza.valores.Família
    )
  );

  const HandleRemoverPizza = (id) => {
    const removePizza = async () => {
      try {
        const sucesso = await removerPizza(id);

        if (sucesso) {
          setPizzas((pizzasAnteriores) =>
            pizzasAnteriores.filter((pizza) => pizza.id !== id)
          );
        }
      } catch (e) {
        console.error("Erro ao remover pizza: ", e);
      }
    };

    removePizza(id);
  };

  return (
    <TableContainer component={Paper} className="pizza-table-container">
      <Table aria-label="pizza table" className="pizza-table">
        <TableHead className="pizza-table-head">
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Sabor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Ingredientes</TableCell>
            <TableCell align="right">Preço - Pequena</TableCell>
            <TableCell align="right">Preço - Média</TableCell>
            <TableCell align="right">Preço - Grande</TableCell>
            <TableCell align="right">Preço - Família</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                {row.ingredientes}
              </TableCell>
              <TableCell align="right">R${row.preco_p.toFixed(2)}</TableCell>
              <TableCell align="right">R${row.preco_m.toFixed(2)}</TableCell>
              <TableCell align="right">R${row.preco_g.toFixed(2)}</TableCell>
              <TableCell align="right">R${row.preco_f.toFixed(2)}</TableCell>
              <TableCell align="center">
                <button
                  className="table-button alter"
                  onClick={() => console.log("editando", row.nome)}
                >
                  <DriveFileRenameOutlineOutlinedIcon
                    sx={{ fontSize: "2.4rem" }}
                  />
                </button>
              </TableCell>
              <TableCell align="center">
                <button
                  className="table-button delete"
                  onClick={() => HandleRemoverPizza(row.id)}
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
