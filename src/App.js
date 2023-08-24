import './App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'bootstrap';

function App() {
  const [nameBestPetShop, setNameBestPetShop] = useState("PetShopTest");
  const [precoTotal, setPrecoTotal] = useState(0);
  const [valueData, setValueData] = useState(new Date());
  const [valueQtdCaesPequenos, setValueQtdCaesPequenos] = useState("");
  const [valueQtdCaesGrandes, setValueQtdCaesGrandes] = useState("");
 

  const itemsPetShop = [
    {
      nome: "Meu canino Feliz",
      distancia: 2000, // distancia em metros
      banhoCaesPequenos: 20,
      banhoCaesGrandes: 40,
      precoFinalDeSemanaCaesPequeno: (20 * 0.2) + 20,
      precoFinalDeSemanaCaesGrandes: (40 * 0.2) + 40
    },
    {
      nome: "Vai Rex",
      distancia: 1700, // distancia em metros
      banhoCaesPequenos: 15,
      banhoCaesGrandes: 50,
      precoFinalDeSemanaCaesPequeno: 20,
      precoFinalDeSemanaCaesGrandes: 55
    },
    {
      nome: "Chow Chawgas",
      distancia: 800, // distancia em metros
      banhoCaesPequenos: 30,
      banhoCaesGrandes: 45,
      precoFinalDeSemanaCaesPequeno: 30,
      precoFinalDeSemanaCaesGrandes: 45
    },
  ]
      
  const handleInputs = (event) => {
    event.preventDefault();
    let bestPetShop = "";
    let precoTotalPetShop = 100000;
    let distancia = 0;
    
    // Dia de Semana
    if(new Date(Date.parse(valueData)).getDay() !== 5 && 
        new Date(Date.parse(valueData)).getDay() !== 6) {
      
      itemsPetShop.map((petShop) => {
        let valorAtualDoBanho = (valueQtdCaesPequenos * petShop.banhoCaesPequenos) + 
        (valueQtdCaesGrandes * petShop.banhoCaesGrandes);

        if(valorAtualDoBanho < precoTotalPetShop){
          bestPetShop = petShop.nome;
          precoTotalPetShop = valorAtualDoBanho;
          distancia = petShop.distancia;
        } else if (valorAtualDoBanho === precoTotalPetShop){
          if(petShop.distancia < distancia){
            bestPetShop = petShop.nome;
            precoTotalPetShop = valorAtualDoBanho;
            distancia = petShop.distancia;
        }}
        return null;
      })
    } else {
      // Final de Semana
      itemsPetShop.map((petShop) => {
        let valorAtualDoBanho = (valueQtdCaesPequenos * petShop.precoFinalDeSemanaCaesPequeno) + 
        (valueQtdCaesGrandes * petShop.precoFinalDeSemanaCaesGrandes);

        if(valorAtualDoBanho < precoTotalPetShop){
          bestPetShop = petShop.nome;
          precoTotalPetShop = valorAtualDoBanho;
          distancia = petShop.distancia;
        } else if (valorAtualDoBanho === precoTotalPetShop){
          if(petShop.distancia < distancia){
            bestPetShop = petShop.nome;
            precoTotalPetShop = valorAtualDoBanho;
            distancia = petShop.distancia;
        }}
        return null;
      })
    }
    setNameBestPetShop(bestPetShop);
    setPrecoTotal(precoTotalPetShop);
  }


  
  return (
    <main>
        
       <div className="card">
      {/* Data */}
      <form className="dataForm">
        <h5 className='titulo'>Localize o melhor PetShop</h5>
        <label>Preencha os dados abaixo:</label>
        <input className='field'
          name="data"
          value={valueData}
          type='date'
          onChange={(event) => setValueData(event.target.value)}
          placeholder ='Insira a data ' 
        />
        
        {/* Qtd caes pequenos */}
        <input
          name="quantidade de caes pequenos"
          value={valueQtdCaesPequenos}
          type='number'
          placeholder='Insira a quantidade de cães pequenos'
          onChange={(event) => setValueQtdCaesPequenos(event.target.value)}
        />
        {/* Qtd caes grandes */}
        <input
          name="quantidade de caes grandes"
          value={valueQtdCaesGrandes}
          type='number'
          placeholder='Insira a quantidade de cães grandes'
          onChange={(event) => setValueQtdCaesGrandes(event.target.value)}
        />
        <Button as="a" variant="primary"
        onClick= {handleInputs}>
        Localizar
        </Button>
      </form>
      
      {/* Saída: Nome do melhor canil, preço total de banho:  */}
      {nameBestPetShop !== "PetShopTest" 
        ? <div className='cardResultado'>
            <p>Seu melhor PETSHOP é: <strong>{nameBestPetShop}.</strong><br></br> e o preço total dos banhos é de: <strong> R${precoTotal}.</strong></p>
          </div> 
        : ""}
     
      </div>   
      
    </main>

    
  )
}

export default App;
