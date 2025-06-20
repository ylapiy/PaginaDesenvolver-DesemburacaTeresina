fetch('https://projetodesemburacateresinaapi-production-1abf.up.railway.app/registro') 
  .then(response => response.json())
  .then(data => {
    const tbody = document.querySelector("#tabelaDenuncias tbody");
    data.forEach(registro => {
      const linha = `
        <tr>
          <td>${registro.fid}</td>
          <td>${registro.data}</td>
          <td>${registro.categoria}</td>
          <td>${registro.status}</td>
          <td>${registro.observacao}</td>
          <td>${registro.rua}</td>
          <td>${registro.bairro}</td>

          <button onclick="DeletBancoDeDados(registro.fid)">Excluir</button>
          <button>Editar</button>

        
   
        </tr>
      `;
      tbody.innerHTML += linha;
    });
  });

  async function DeletBancoDeDados(id){

    fetch(`https://projetodesemburacateresinaapi-production-1abf.up.railway.app/registro/${id}`, {method:'DELETE'})
    .then(response => response.json())
    .then(data =>{
      console.log(data)

    })
  
  }




  async function MudarBancoDeDados() {
    




  }