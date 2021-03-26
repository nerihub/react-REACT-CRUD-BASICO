import React, {useState} from 'react';
import uniqid from 'uniqid';

const ListadoNombres = () => {

  const [nombre,setNombre]=useState('');
  const [listaNombres,setListaNombres]=useState([]);
  const [modoEdicion,setModoEdicion]=useState(false);
  const [id, setId]=useState('');
  const [error,setError]=useState(null);

  const addNombre = (e) =>{
    e.preventDefault();
    if(!nombre.trim()){
      setError('Nombre no puede ser vacio');
      return;
    }
    const nuevoNombre = {
        id:uniqid(),
        tituloNombre:nombre

    };
    setListaNombres([...listaNombres,nuevoNombre]);
    setNombre('');
    setError(null);
  }

  const deleteNombre = (id) =>{
    const nuevoArray = listaNombres.filter( item => item.id !== id)
      setListaNombres(nuevoArray);

  }

  const editarNombre = (item) => {
    setId(item.id);
    setModoEdicion(true);
    setNombre(item.tituloNombre);
  }

  const editar = (e) => {
    e.preventDefault();
    if(!nombre.trim()){
      setError('Nombre no puede ser vacio');
      return;
    }
    const nuevoArray = listaNombres.map(item => item.id === id ? {id:id,tituloNombre:nombre}:item);
    setListaNombres(nuevoArray);
    setModoEdicion(false);
    setNombre('');
    setError(null);
  }

  return (
    <div>
      <div className="container">
        <h2>Applicacion De CRUD Basico</h2>
      </div>
      
      <div className="row">
        <div className="col">
          <h2>Listado De Nombres</h2>
            <ul className="list-group">
             {
               listaNombres.map( item =>
                 <li key="{item.id}" className="list-group-item">
                  {item.tituloNombre}
                  <button className="btn btn-danger float-right" onClick={() => {deleteNombre(item.id)}}>
                    Borrar
                  </button>
                  <button className="btn btn-info float-right" onClick={() => {editarNombre(item)}}>
                    Editar
                  </button>
                 </li>  
               ) 
             }
            </ul>
        </div>
        <div className="col">
          <h2>Formulario para Añadir Nombres</h2>
          <form onSubmit={modoEdicion?editar:addNombre} className="form-group">
            <input 
              onChange={(e)=>{setNombre(e.target.value)}} 
              className="form-control mb-3" 
              type="text" placeholder="Introduce el nombre" 
              value={nombre}
            />
            <input 
              className="btn btn-info btn-block" 
              type="submit" 
              value={modoEdicion? "Guardar" : "Registar"} 
            />
          </form>
          {
            error != null? (
              <div className="alert alert-danger">
                {error}
              </div>
            ):(
                <div>
                </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default ListadoNombres;