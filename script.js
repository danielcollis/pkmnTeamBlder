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


//changes the sprites in the first row of the type matchup table
let spriteSelect = document.querySelector(".pkmnSelect");
let wholeTable = document.querySelector(".wholeTable").children[0];
//adds an event listener to every dropdown menu
for (let i = 0; i < spriteSelect.children.length; i++) {
    spriteSelect.children[i].addEventListener("change", function(event) {
        let dropdown = event.target;
        let name = dropdown.value;
        let index = Array.from(spriteSelect.children).indexOf(dropdown) + 1;

        for (let i = 1; i < wholeTable.children.length; i++) {
            wholeTable.children[i].children[index].setAttribute("data-value", 1);
            wholeTable.children[i].children[index].style.color = "transparent";
            wholeTable.children[i].children[7].innerHTML = 0;
            wholeTable.children[i].children[8].innerHTML = 0;
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            //assigns an index depending on which dropdown menu was selected, then changes that images' src to the name of the pkmn selected
            let spriteImg = document.querySelector(`.sprite${index}`).children[0];
            spriteImg.src = data.sprites.front_default;

            let types = [];
            for (let j = 0; j < data.types.length; j++) {
                types[j] = data.types[j].type.name;
            }
            
            for (let k = 0; k < types.length; k++) {
                let type = types[k];
                fetch(`https://pokeapi.co/api/v2/type/${type}`)
                .then(response => response.json())
                .then(data => {
                    for (let m = 0; m < data.damage_relations.double_damage_from.length; m++) {
                        let superEffectiveRow = document.querySelector(`.${data.damage_relations.double_damage_from[m].name}Row`);
                        let superEffectiveElem = superEffectiveRow.children[index];
                        superEffectiveElem.setAttribute("data-value", parseFloat(superEffectiveElem.getAttribute("data-value")) * 2);
                    }
                    for (let m = 0; m < data.damage_relations.half_damage_from.length; m++) {
                        let notEffectiveRow = document.querySelector(`.${data.damage_relations.half_damage_from[m].name}Row`);
                        let notEffectiveElem = notEffectiveRow.children[index];
                        notEffectiveElem.setAttribute("data-value", parseFloat(notEffectiveElem.getAttribute("data-value")) * 0.5);
                    }
                    for (let m = 0; m < data.damage_relations.no_damage_from.length; m++) {
                        let zeroEffectiveRow = document.querySelector(`.${data.damage_relations.no_damage_from[m].name}Row`);
                        let zeroEffectiveElem = zeroEffectiveRow.children[index];
                        zeroEffectiveElem.setAttribute("data-value", parseFloat(zeroEffectiveElem.getAttribute("data-value")) * 0);
                    }
                    
                    //only executes if both types have already been processed through the table
                    if (k == types.length - 1) {
                        for (let r = 1; r < wholeTable.children.length; r++) {
                            for (let t = 1; t < wholeTable.children[r].children.length; t++) {
                            if (wholeTable.children[r].children[t].getAttribute("data-value") == 0.25) {
                                wholeTable.children[r].children[8].innerHTML = parseFloat(wholeTable.children[r].children[8].innerHTML) + 2;
                            }
                            else if (wholeTable.children[r].children[t].getAttribute("data-value") == 0.5) {
                                wholeTable.children[r].children[8].innerHTML = parseFloat(wholeTable.children[r].children[8].innerHTML) + 1;
                            }
                            else if (wholeTable.children[r].children[t].getAttribute("data-value") == 2) {
                                wholeTable.children[r].children[7].innerHTML = parseFloat(wholeTable.children[r].children[7].innerHTML) + 1;
                            }
                            else if (wholeTable.children[r].children[t].getAttribute("data-value") == 4) {
                                wholeTable.children[r].children[7].innerHTML = parseFloat(wholeTable.children[r].children[7].innerHTML) + 2;
                            }
                            }
                        }
                    }

                    for (let p = 1; p < wholeTable.children.length; p++) {
                        for (let q = 1; q < wholeTable.children[p].children.length - 2; q++) {
                            let elem = wholeTable.children[p].children[q];
                            if (elem.getAttribute("data-value") == 0.25) {
                                elem.style.color = "greenyellow";
                                elem.innerHTML = "1/4";
                            }
                            else if (elem.getAttribute("data-value") == 0.5) {
                                elem.style.color = "rgb(164, 216, 86)";
                                elem.innerHTML = "1/2";
                            }
                            else if (elem.getAttribute("data-value") == 2) {
                                elem.style.color = "darkred";
                                elem.innerHTML = "2"
                            }
                            else if (elem.getAttribute("data-value") == 4) {
                                elem.style.color = "red";
                                elem.innerHTML = "4"
                            }
                            else if (elem.getAttribute("data-value") == 0) {
                                elem.style.color = "purple";
                                elem.innerHTML = "Immune";
                            }
                            else if (elem.getAttribute("data-value") == 1) {
                                elem.style.color = "transparent";
                            }
                        }

                        for (let v = 7; v < wholeTable.children[p].children.length - 1; v++) {
                            let elem = wholeTable.children[p].children[v];
                            if (parseFloat(elem.innerHTML) == 0) {
                                elem.style.fontWeight = "bold";
                                elem.style.color = "white";
                            }
                            else if (parseFloat(elem.innerHTML) == 1) {
                                elem.style.fontWeight = "bold";
                                elem.style.color = "white";
                                elem.style.backgroundColor = "rgba(100, 0, 0, 0.693)";
                            }
                            else if (parseFloat(elem.innerHTML) >= 2) {
                                elem.style.fontWeight = "bold";
                                elem.style.color = "white";
                                elem.style.backgroundColor = "rgba(200, 0, 0, 0.693)";
                            }
                        }

                        for (let v = 8; v < wholeTable.children[p].children.length; v++) {
                            let elem = wholeTable.children[p].children[v];
                            if (parseFloat(elem.innerHTML) == 0) {
                                elem.style.fontWeight = "bold";
                                elem.style.color = "white";
                            }
                            else if (parseFloat(elem.innerHTML) == 1) {
                                elem.style.fontWeight = "bold";
                                elem.style.color = "white";
                                elem.style.backgroundColor = "rgba(0, 100, 0, 0.750)";
                            }
                            else if (parseFloat(elem.innerHTML) >= 2) {
                                elem.style.fontWeight = "bold";
                                elem.style.color = "white";
                                elem.style.backgroundColor = "rgba(0, 200, 0, 0.750)";
                            }
                        }

                    }
                })
                .catch(error => console.log(error));
            }

        })
        .catch(error => console.log(error));
    })
}


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
