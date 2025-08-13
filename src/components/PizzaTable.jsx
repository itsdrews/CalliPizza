import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const pizzas = [
  {
    id: 1,
    nome: "Margherita",
    tipo: "Tradicional",
    ingredientes:
      "Molho de tomate, Mussarela premium, Manjericão fresco e Azeite de oliva",
    valores: {
      Pequena: 35.9,
      Média: 45.9,
      Grande: 55.9,
      Família: 65.9,
    },
  },
  {
    id: 2,
    nome: "Calabresa",
    tipo: "Tradicional",
    ingredientes:
      "Molho de tomate, Mussarela, Calabresa premium e Cebola caramelizada",
    valores: {
      Pequena: 38.9,
      Média: 48.9,
      Grande: 58.9,
      Família: 68.9,
    },
  },
  {
    id: 3,
    nome: "Quatro Queijos",
    tipo: "Especial",
    ingredientes:
      "Molho de tomate, Mussarela, Provolone, Gorgonzola e Parmesão",
    valores: {
      Pequena: 42.9,
      Média: 52.9,
      Grande: 62.9,
      Família: 72.9,
    },
  },
  {
    id: 4,
    nome: "Portuguesa",
    tipo: "Tradicional",
    ingredientes:
      "Molho de tomate, Mussarela, Presunto, Ovos, Cebola, Azeitonas, Pimentão",
    valores: {
      Pequena: 40.9,
      Média: 50.9,
      Grande: 60.9,
      Família: 70.9,
    },
  },
];

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

export default function PizzaTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Sabor</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Ingredientes</TableCell>
            <TableCell align="right">Preço - Pequena</TableCell>
            <TableCell align="right">Preço - Média</TableCell>
            <TableCell align="right">Preço - Grande</TableCell>
            <TableCell align="right">Preço - Família</TableCell>
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
              <TableCell>{row.ingredientes}</TableCell>
              <TableCell align="right">{row.preco_p}</TableCell>
              <TableCell align="right">{row.preco_m}</TableCell>
              <TableCell align="right">{row.preco_g}</TableCell>
              <TableCell align="right">{row.preco_f}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
