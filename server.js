const express = require("express");
const convert = require("xml-js");
const app = express();
const PORT = 3000;

// permet rebre JSON
app.use(express.json());

// servir fitxers estàtics (HTML, JS, CSS)
app.use(express.static("public"));


// endpoint d'exemple
app.post("/convertXMLtoJson", (req, res) => {
    const { data } = req.body;
    let result1 = convert.xml2json(data, {compact: true, spaces: 4});
    const result = result1;
    res.json({ result });
});

//=================funció a completar===========================================
app.post("/convertTOXMl", (req, res) => {
  const { data } = req.body;
   let textRebut='{"key1":value1,"key2":value2,""key3":value3}'; 
   //a data esperem un text similar al de dalt
   textRebut = data; //guardem el text real que envia el usuari 
   // com el json que rebrem es de tipus simple, sense objectes ni llistes netejerem l'string per treballar millor.
   textRebut= textRebut.replace("{",""); //eliminem del string la clau d'obertura
   textRebut= textRebut.replace("}",""); //eliminem del string la clau de tancament
   textRebut = textRebut.replace(/"/g, ""); //eliminem del string tots els ""
   
   //key1:value1,key2:value2,key3:value3  us pudeo imaginar un resultat com aquest

   //Sabem que per cada key del json haurem de crear una etiqueta i aquesta tindra com a contingut el value


   let keyvalues =[];//declarem una llista buida
   keyvalues = textRebut.split(",");// si ha un string  li apliquem split, guardem una llista de elements separats per el carcter
   let keys=[]; //aqui guardarem les keys després
   let values =[]; // i aquí els values
   for(let i=0; i < keyvalues.length;i++) //aquest for permet un bucle que recorre tots els keyvalues
    {
       let temp= keyvalues[i].split(":") // separem el string en dos parts per el :
       keys.push(temp[0]);// la primera part(la 0) sera la key i la afegim  a la llista de keys.
       values.push(temp[1]);// la segona part sera el value i la afegim a la llista de values.
    }

   let xml="";//declarem un string
   xml +="<arrel>";//afegim al string un tros de text
   //
   for(let i =0;i<keys.length;i++)
    {
        xml += "<" + keys[i] + ">"; //Obre l'etiqueta XML amb el nom de la clau
        xml += values[i]; //Insereix el valor corresponent entre les etiquetes
        xml += "</" + keys[i] + ">"; //Tanqueu l'etiqueta XML per completar el node
      }
    xml +="</arrel>";
    console.log(xml);
    const result = xml; //Emmagatzema l'XML generat a la constant result

  res.json({ result });
});

//nova ruta pokeapi
app.post("/convertPokemon", async (req, res) => {
    const name = req.body.data; // El nom que ve de l'input
    
    // Truquem a l'API de Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonJson = await response.json();
    
    // Tornem el JSON complet al client
    res.json({ result: pokemonJson });
});

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});