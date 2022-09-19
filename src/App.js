import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import './styles.css';

import api from './services/api';



function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  const main = document.getElementById('main')

  async function handleSearch() {
    //01310930
    //79641190

    if (input === '') {
      alert('Preencha com algum CEP')
      return;
    }



    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")

      main.style.opacity = 1
      setTimeout(() => {
        main.style.opacity = 0
      }, 3000);

    } catch {
      console.log("Cep nao existente!");
      setInput("")


    }

  }

  return (
    <div className="container">
      <h1 className="title" > Buscador Cep </h1>

      <div className="containerInput" >
        <input
          type="text"
          placeholder="Digite o seu cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch} >
          <FiSearch size={25} color="#fff" />

        </button>

      </div>



      {Object.keys(cep).length > 0 && (
        <main id="main" className="main">
          <h2> {cep.cep}</h2>

          <span> {cep.logradouro} </span>
          <span> {cep.complemeto}  </span>
          <span> {cep.bairro} </span>
          <span> {cep.localidade} - {cep.uf} </span>

        </main>
      )}

    </div>
  );
}

export default App;
