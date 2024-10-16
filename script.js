/*fetch("https://pokeapi.co/api/v2/pokemon/lucario/")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));*/

//identifes the dropdown menu and sprite image
const dropdown = document.getElementById("spriteMenu");
const pkmn1 = document.getElementById("pkmn1");
const pkmn2 = document.getElementById("pkmn2");
const pkmn3 = document.getElementById("pkmn3");
const pkmn4 = document.getElementById("pkmn4");
const pkmn5 = document.getElementById("pkmn5");
const pkmn6 = document.getElementById("pkmn6");
const spriteImage = document.getElementById("sprite");

//retrives pokemon names and adds them to the drop down menu
fetch("https://pokeapi.co/api/v2/pokemon?limit=156&offset=493")
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {for (let i = 0; i < results.length; i++) {
            //create new option for dropdown
            const newOption = document.createElement("option");
            newOption.value = results[i].name;
            newOption.text = results[i].name;

            // Create another new option for pkmn1
            const newOption1 = document.createElement("option");
            newOption1.value = results[i].name;
            newOption1.text = results[i].name;

            // Create another new option for pkmn1
            const newOption2 = document.createElement("option");
            newOption2.value = results[i].name;
            newOption2.text = results[i].name;

            // Create another new option for pkmn1
            const newOption3 = document.createElement("option");
            newOption3.value = results[i].name;
            newOption3.text = results[i].name;

            // Create another new option for pkmn1
            const newOption4 = document.createElement("option");
            newOption4.value = results[i].name;
            newOption4.text = results[i].name;

            // Create another new option for pkmn1
            const newOption5 = document.createElement("option");
            newOption5.value = results[i].name;
            newOption5.text = results[i].name;

            // Create another new option for pkmn1
            const newOption6 = document.createElement("option");
            newOption6.value = results[i].name;
            newOption6.text = results[i].name;

            // Add the options to the respective dropdowns
            dropdown.add(newOption);
            pkmn1.add(newOption1);
            pkmn2.add(newOption2);
            pkmn3.add(newOption3);
            pkmn4.add(newOption4);
            pkmn5.add(newOption5);
            pkmn6.add(newOption6);
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
