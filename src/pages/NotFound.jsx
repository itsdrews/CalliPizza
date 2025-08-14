import React from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <header className="header">
        <Logo />
      </header>
      <main className="page-notfound">
        <h1>Desculpe!</h1>
        <h2>Esta página não foi encontrada :(</h2>
        <div>
          <button>
            <Link to="/">
              <p>Tente novamente! </p>
            </Link>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
