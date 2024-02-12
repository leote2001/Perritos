import { Card } from "./components/Card";
import { bredFor } from "./helpers/obtenerBredFor";
import { useState, useEffect } from "react";
import { listadoRazasApi } from "./helpers/listadoRazasApi";
import {Cargando} from "./components/Cargando";
import {Error} from "./components/Error";

function App() {
  const [loading, setLoading] = useState(true);
  const [newError, setNewError] = useState(null);
  const [razas, setRazas] = useState([]);
  const [arrayBredFor, setArrayBredFor] = useState([]);
  useEffect(() => {
    const llamaApi = async () => {
      try {
        const response1 = await listadoRazasApi();
        setRazas(response1);
        setArrayBredFor(bredFor(response1));
        setLoading(false);
      } catch (error) {
        setNewError("Ocurrió un error! Error: "+error.message);
      }
    }
     llamaApi();
  }, []);
  return (
    <>
      <header>
        <h1 className="text-center">Perritos</h1>
      </header>
      <main className="text-center">
      {newError && <Error err={newError} />}
        {!loading ?
          <Card
            razas={razas}
            arrayBredFor={arrayBredFor}
            setNewError={setNewError}
          />
          : <Cargando /> 
        }
      </main>
      <footer>
        <p className="text-muted text-center">Copyright &copy;2023</p>
      </footer>
    </>
  );
}

export default App;
