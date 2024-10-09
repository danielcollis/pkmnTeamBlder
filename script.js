/*fetch("https://pokeapi.co/api/v2/pokemon/lucario/")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));*/

//identifes the dropdown menu and sprite image
const dropdown = document.getElementById("spriteMenu");
const spriteImage = document.getElementById("sprite");

//retrives pokemon names and adds them to the drop down menu
fetch("https://pokeapi.co/api/v2/pokemon?limit=156&offset=493")
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {for (let i = 0; i < results.length; i++) {
        const newOption = document.createElement("option");
        newOption.value = results[i].name;
        newOption.text = results[i].name;
        dropdown.add(newOption);
    }})
    .catch(error => console.log(error));

//changes the sprite under "sprite loader"
async function changeSprite() {

    const pkmnName = dropdown.value;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);
    
        if (!response.ok) {
            throw new Error("Couldn't fetch.");
        }

        const data = await response.json();
        source = data.sprites.front_default;
        spriteImage.src = source;


    }
    catch (error){
        console.error(error);
    }
}
