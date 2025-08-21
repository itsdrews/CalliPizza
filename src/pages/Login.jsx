import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Login = () => {
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (codigo === "123" && senha === "123") {
      login({ nome: "funcionario", codigo }, "fake-jwt-token");
      navigate("/cardapio");
    } else {
      if (codigo === "321" && senha === "321") {
        login({ nome: "administrador", codigo }, "fake-jwt-token");
        navigate("/pizza-adm");
      } else {
        setErro("Código ou senha inválidos");
      }
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <Logo />
      </header>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login de Usuário</h2>
          {erro && <p className="erro">{erro}</p>}
          <div className="input-container">
            <label htmlFor="codigo">Usuário</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Digite o seu código de idenficação numérico"
              required
              autoFocus
            />
          </div>
          <div className="input-container">
            <label htmlFor="senha">Senha</label>
            <div className="senha-wrapper">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="senha"
                placeholder="Digite a senha de acesso"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-senha"
                onClick={() => setMostrarSenha((prev) => !prev)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrarSenha ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="sbmt-btn">
            Fazer Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
