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
                }
            })
            .catch(error => console.error(error));
            
        }
    }
}

window.onload = loadDex;






//CLEAR LOCAL STORAGE ONCE PAGE LOADS