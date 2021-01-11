const search = document.getElementById("search");
const matchlist = document.getElementById("match-list");

// Search States.json and filter it 

const searchStates = async searchText => {
    const res = await fetch("../data/states.json");
    const states = await res.json();
    
    // Get mathces to current text input
    let matches = states.filter(state =>{
        const regex = new RegExp(`^${searchText}`, "gi");
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if (searchText.length === 0){
        matches = [];
        matchlist.innerHTML = "";
    }
    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-4">
        <h4>${match.name} (${match.abbr}) <br> <span class="text-primary">${match.capital}</span> <span class="text-secondary">CP:${match.CP}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `).join("");

        matchlist.innerHTML = html;
    }
}

search.addEventListener("input", ()=> searchStates(search.value));
