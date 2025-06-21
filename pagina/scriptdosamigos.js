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

          <div class="divbotoes">
          <button onclick="DeletBancoDeDados(${registro.fid})" class="botaobonito">Excluir</button>
          <button onclick="HoraDeMudar(
           ${registro.fid},
          '${registro.data}',
          '${registro.categoria}',
          '${registro.status}',
           ${registro.fid},
          '${registro.rua}',
          '${registro.bairro}'
          )" class="botaobonito" >Editar</button>
          </div>

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
      location.reload()

    })
  
  }

  function HoraDeMudar(id,data,categoria,status,observacao,rua,bairro){
    const fundo_escuro = document.querySelector('.fundoescuro')
    fundo_escuro.style.display = "flex"
    fundo_escuro.style.visibility = "visible"

    const popmudando = document.querySelector('.popupfaltaImage')
    popmudando.querySelector('span').innerText = `${id}`

    const campos = popmudando.querySelectorAll('input')

    campos[0].value = `${data}`
    campos[1].value = `${categoria}`
    campos[2].value = `${status}`
    campos[3].value = `${observacao}`
    campos[4].value = `${rua}`
    campos[5].value = `${bairro}`

    

    document.getElementById('fecharimagem').addEventListener("click",() => {fundo_escuro.style.display = "none";fundo_escuro.style.visibility = "hidden"})

    document.getElementById('salvar').addEventListener("click", () =>{MudarBancoDeDados(id,campos[0].value,campos[1].value,campos[2].value,campos[3].value,campos[4].value, campos[5].value)})

  }


  async function MudarBancoDeDados(id,data,categoria,status,observacao,rua,bairro) {
  
  const NovaEntrada = {
      
    "data": ConverteData(data),
    "categoria": categoria,
    "status": status,
    "observacao": observacao,
    "rua": rua,
    "bairro": bairro

  }
    
 fetch(`https://projetodesemburacateresinaapi-production-1abf.up.railway.app/registro/${id}`, {method:'PUT',headers : {'Content-Type' :'application/json'},
    body: JSON.stringify(NovaEntrada)}).then(()=>{
      console.log("olha o banco")
      setTimeout(location.reload(),3000)

    })

  }

  function ConverteData(data){

    partes = data.split("-");
    const NovaData = partes[2]+"-"+partes[1]+"-"+partes[0]
    console.log(NovaData)
    return NovaData

  }