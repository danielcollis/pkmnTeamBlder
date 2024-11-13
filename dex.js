let bars = ["hpBar", "atkBar", "defBar", "spatkBar", "spdefBar", "speedBar"];

function loadDex() {
    for (let i = 1; i <= 6; i++) {
        let pkmnName = localStorage.getItem(`pkmn${i}Name`);
        let screenCurr = document.getElementById(`screen${i}`);
        if (pkmnName != "None") {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`)
            .then(response => response.json())
            .then(data => {
                screenCurr.children[0].src = data.sprites.front_default;
                for (let j = 0; j < 6; j++) {
                    screenCurr.children[1].children[j].innerHTML += data.stats[j].base_stat;
                    let currBarWidth = screenCurr.querySelector(`.${bars[j]}`).style.width = `${data.stats[j].base_stat * 1.2}px`
                    let currBar = screenCurr.children[2].children[j].children[0];
                    if ((parseFloat(currBarWidth) / 1.2) < 40) {
                        currBar.style.backgroundColor = "red";
                    }
                    else if ((parseFloat(currBarWidth) / 1.2) < 60) {
                        currBar.style.backgroundColor = "orangered";
                    }
                    else if ((parseFloat(currBarWidth) / 1.2) < 80) {
                        currBar.style.backgroundColor = "orange";
                    }
                    else if ((parseFloat(currBarWidth) / 1.2) < 100) {
                        currBar.style.backgroundColor = "yellow";
                    }
                    else if ((parseFloat(currBarWidth) / 1.2) < 120) {
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