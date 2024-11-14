let bars = ["hpBar", "atkBar", "defBar", "spatkBar", "spdefBar", "speedBar"];

function loadDex() {
    for (let i = 1; i <= 6; i++) {
        //gets selected names from local storage
        let pkmnName = localStorage.getItem(`pkmn${i}Name`);
        //iterates through all divs on the screen
        let screenCurr = document.getElementById(`screen${i}`);
        if (pkmnName != "None") {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`)
            .then(response => response.json())
            .then(data => {
                //sets the img attribute in each figure to the sprite from pokeapi
                screenCurr.children[0].children[0].src = data.sprites.front_default;
                //sets capitalName to a capitalized version of the selected names
                let capitalName = pkmnName.charAt(0).toUpperCase() + pkmnName.slice(1).toLowerCase();
                //changes the image caption to the capitalized string
                screenCurr.children[0].children[1].innerHTML = capitalName;
                //iterates through each
                for (let j = 0; j < 6; j++) {
                    screenCurr.children[1].children[j].innerHTML += data.stats[j].base_stat;
                    let currBarWidth = screenCurr.querySelector(`.${bars[j]}`).style.width = `${data.stats[j].base_stat * 0.1}vw`
                    let currBar = screenCurr.children[2].children[j].children[0];
                    if ((parseFloat(currBarWidth) / 0.1) < 40) {
                        currBar.style.backgroundColor = "red";
                    }
                    else if ((parseFloat(currBarWidth) / 0.1) < 60) {
                        currBar.style.backgroundColor = "orangered";
                    }
                    else if ((parseFloat(currBarWidth) / 0.1) < 80) {
                        currBar.style.backgroundColor = "orange";
                    }
                    else if ((parseFloat(currBarWidth) / 0.1) < 100) {
                        currBar.style.backgroundColor = "yellow";
                    }
                    else if ((parseFloat(currBarWidth) / 0.1) < 120) {
                        currBar.style.backgroundColor = "yellowgreen";
                    }
                    else {
                        currBar.style.backgroundColor = "limegreen";
                    }
                }
            })
            .catch(error => console.error(error));
            
        }
    }
}

window.onload = loadDex;






//CLEAR LOCAL STORAGE ONCE PAGE LOADS