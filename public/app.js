
const btnToJson = document.getElementById("btnToJson");
const btnToXML = document.getElementById("btnToXML");

btnToJson.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  // Fem una petició HTTP al servidor (Express)
  // fetch() envia una request al backend
const res = await fetch("/convertXMLtoJson", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: { "Content-Type": "application/json" },
    // Cos de la petició (les dades que enviem)
    // Convertim l’objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });

  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();
  
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value = json.result;
});

btnToXML.addEventListener("click", async () => {

  const text = document.getElementById("input").value;

  // Fem una petició HTTP al servidor (Express)
  // fetch() envia una request al backend
  const res = await fetch("/convertTOXMl", {
    // Tipus de petició
    // POST = enviem dades al servidor
    method: "POST",
    // Capçaleres HTTP
    // Indiquem que estem enviant dades en format JSON
    headers: {
      "Content-Type": "application/json"
    },

    // Cos de la petició (les dades que enviem)
    // Convertim l’objecte JS a text JSON
    body: JSON.stringify({ data: text })
  });

  // El servidor respon amb JSON
  // Convertim la resposta a objecte JavaScript
  const json = await res.json();
  
  // Mostrem el resultat a la textarea de sortida
  document.getElementById("output").value = json.result;
});
const btnPokemon = document.getElementById("btnPokemon"); 

btnPokemon.addEventListener("click", async () => {
    // Agafem el nom de l'input
    const name = document.getElementById("input").value.toLowerCase().trim();

    // Truquem al servidor
    const res = await fetch("/convertPokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: name })
    });

    const json = await res.json();
    const pokemon = json.result; // Aquí hi ha les dades que envio el server

    // Mostra les habilitats al textarea 'output'
    const habs = pokemon.abilities.map(a => a.ability.name).join(", ");
    document.getElementById("output").value = "Habilitats: " + habs;

   // Mostra la imatge (l'sprite)
    // Fem servir l'id "pokeImg" que està a l'HTML
    let img = document.getElementById("pokeImg");
    img.src = pokemon.sprites.front_default; 
    
    // Mostra el nom a sota (opcional)
    document.getElementById("pokeName").innerText = pokemon.name.toUpperCase();
});