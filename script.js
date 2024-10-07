fetch("https://pokeapi.co/api/v2/pokemon/lucario/")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
