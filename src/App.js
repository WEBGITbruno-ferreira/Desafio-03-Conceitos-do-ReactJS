import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repos, setRepos] = useState([])

  useEffect(()=>{

    api.get('repositories').then(response => { 
      console.log(response)

    setRepos(response.data)
    })
  }, []);



  async function handleAddRepository() {
    const  response =  await api.post('repositories', {
      title:"Desafio Node.js", 
	    url:"http://github.com/...",
	    techs: ["Node.js", "..."] 
    })

    const repo =  response.data

    setRepos([...repos, repo])

    console.log(repos)

    // TODO
  }

  async function handleRemoveRepository(id) {
    console.log(id)
   
    

    const  response =  await api.delete(`repositories/${id}`).then(

      () => {

      const   newArrRepo =  repos
      const   repoIndex = repos.findIndex(itemRepo => itemRepo.id === id)
          
      newArrRepo.splice(repoIndex, 1)
       
      setRepos([...newArrRepo])
      
    }

    ) 
    
  }

  function AtuDelRepo(arr) {
    setRepos(arr)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
      {repos.map( item =>  <div key={item.id}> <li >  {item.title} </li>  <button onClick={() => handleRemoveRepository(item.id)}> remover </button> </div> )}    
        
    
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
