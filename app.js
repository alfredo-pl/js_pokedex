document.addEventListener("DOMContentLoaded", function(event) { 

    let container = document.querySelector(".container");
    let divPokemon = document.querySelector("#div-pokemon");

    
    const loadPokemons = (url) => {
        fetch(url)
        .then((resp) =>resp.json())
        .then((data)=>{

            let p = document.createElement("p");
            p.setAttribute("id", "next-page");
            p.setAttribute("style", "display:none");
            p.innerHTML = data.next;

            
            container.appendChild(p);

          
            data.results.forEach(pokemon => {       
                let div = document.createElement("div");
                    div.setAttribute("class","card my-2");
                    div.setAttribute("style","width: 18rem");
                div.innerHTML = `
                <div class="card-header">
                    <h5 class="card-title text-center text-uppercase mb-0">${pokemon.name}</h5>
                </div>
                <div class="card-body text-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjqAUwbBeaBklkNqLW7YFzRFJxkeugHXPCQ&usqp=CAU" class="card-img-top w-50" id="img-${pokemon.name}" alt="${pokemon.name}">                                
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-primary detail" data-toggle="modal" data-info="primario" data-target="#modal${pokemon.name}">¡Quiero saber más de este pokémon!</button>
                        <div class="modal fade" id="modal${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="modalLabel${pokemon.name}" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-uppercase" id="modalLabel${pokemon.name}">${pokemon.name}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body text-center" id="modal-body-${pokemon.name}">
                                    </div>
                                    <div class="modal-footer " id="modal-footer-${pokemon.name}">
                                        <div class="col-2 mr-0 pr-0">
                                            <div id="type-${pokemon.name}">
                                                <h6 class="text-center">Type</h6>
                                               
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div id="generations-${pokemon.name}">
                                                <h6 class="text-center">Generations</h6>
                                                <div class="row"></div>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div id="skills-${pokemon.name}">
                                                <h6 class="text-center">Abilities</h6>
                                            </div>
                                        </div>
                                        <div class="col-3">
                                            <div id="mov-${pokemon.name}">
                                                <h6 class="text-center">Mov</h6>
                                                <ul class="p-1"></ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                divPokemon.appendChild(div);
            })
        }).catch((error) => console.log('Esto falló ', error));
        
    }

    divPokemon.addEventListener('click', function(e){
          

        if(e.target.dataset.info == "primario"){
            let modal = e.target.dataset.target;
            let nombre = modal.replace("#modal","");
       
            if( !document.querySelector(`#modal-body-${nombre} > img`)){
                fetch('https://pokeapi.co/api/v2/pokemon/'+nombre)
                .then((resp) =>resp.json())
                .then((pokemon)=>{
                    document.querySelector(`#img-${pokemon.name}`).setAttribute("src",`${pokemon.sprites.other["dream_world"].front_default}`);
                   
                    let img = document.createElement("img");
                        img.setAttribute("class","w-25");
                        img.setAttribute("alt",`${pokemon.name}`);
                        img.setAttribute("src", `${pokemon.sprites.other["official-artwork"].front_default}`);
                    document.querySelector(`#modal-body-${pokemon.name}`).appendChild(img);


                    for(var i = 0; i < pokemon.types.length;i++){
                        let div = document.createElement("div");
                            div.innerHTML = ` <div class="modal modal-sm fade" id="modal-type-${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="modalLabelType${pokemon.name}" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title text-uppercase" id="modalLabelType${pokemon.name}">${pokemon.name}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body text-center" id="modal-body-type-${pokemon.name}">
                                        <div class="row">
                                            <div class="col-6 ddf">
                                                <h6>Double damage from</h6>
                                            </div>
                                            <div class="col-6 ddt">
                                                <h6>Double damage to</h6>
                                            </div>
                                            <div class="col-6 hdf">
                                                <h6>Half damage from</h6>
                                            </div>
                                            <div class="col-6 hdt">
                                                <h6>Half damage to</h6>
                                            </div>
                                            <div class="col-6 ndf">
                                                <h6>No damage from</h6>
                                            </div>
                                            <div class="col-6 ndt">
                                                <h6>No damage to</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    `;
                        let btn = document.createElement("button");
                            btn.setAttribute("class","btn btn-info");
                            btn.setAttribute("data-toggle","modal");
                            btn.setAttribute("data-info","secundario");
                            btn.setAttribute("data-target",`#modal-type-${pokemon.name}`);
                            btn.innerText ="Ver relaciones de daño";
                        let p = document.createElement("p");
                            p.setAttribute("class","text-center");
                            p.innerText = `${pokemon.types[i].type.name}`;
                            console.log(pokemon.types[i].type.url)

                           

                        div.prepend(btn);
                        div.prepend(p);
                        document.querySelector(`#type-${pokemon.name}`).appendChild(div);

                        relationDamage(pokemon.types[i].type.url, `modal-body-type-${pokemon.name}`);
                     
                    }
                    
                    for(var i = 0; i < pokemon.game_indices.length;i++){
                        let div = document.createElement("div");
                            div.setAttribute("class","col-6 text-center");
                        let p = document.createElement("p");
                            p.innerText = `${pokemon.game_indices[i].version.name}`;
                        div.appendChild(p);
                        document.querySelector(`#generations-${pokemon.name} .row`).appendChild(div);
                    }

                    for(var i = 0; i < pokemon.abilities.length;i++){
                       
                        let div = document.createElement("div");
                        div.innerHTML = ` <div class="modal modal-xxl fade" id="modal-skill-${pokemon.name}" tabindex="-1" role="dialog" aria-labelledby="modalLabelSkill${pokemon.name}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable modal-sm mr-5" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-uppercase" id="modalLabelSkill${pokemon.name}">${pokemon.name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body text-center" id="modal-body-skill-${pokemon.name}">
                                       <h6>Pokemon Relationship </h6>
                                
                                </div>
                            </div>
                        </div>
                    </div>    `;

                    

                    let btn = document.createElement("button");
                        btn.setAttribute("class","btn btn-info");
                        btn.setAttribute("data-toggle","modal");
                        btn.setAttribute("data-info","secundario");
                        btn.setAttribute("data-target",`#modal-skill-${pokemon.name}`);
                        btn.innerText ="Otros pokémon que tienen esta habilidad";
           
                    let p = document.createElement("p");
                        p.setAttribute("class","text-center");
                        p.innerText = `${pokemon.abilities[i].ability.name}`;
                    
                        div.prepend(btn);
                        div.prepend(p);
                    document.querySelector(`#skills-${pokemon.name}`).appendChild(div);

                    relationPokemon(pokemon.abilities[i].ability.url, `modal-body-skill-${pokemon.name}`);
                    }

                    for(var i = 0; i < 5;i++){
                        let p = document.createElement("p");
                            p.innerText = `${pokemon.moves[i].move.name}`;
                            document.querySelector(`#mov-${pokemon.name}`).appendChild(p);

                    }
                    
                }).catch((error) => console.log(error));
            }
            
        }
       
     
    });
    
    const relationDamage = (url, body) =>{
          
        fetch(url)
        .then((resp) =>resp.json())
        .then((type)=>{
            console.log(body);
           
            for(var i = 0; i < type.damage_relations.double_damage_from.length;i++){
                let p = document.createElement("p");
                    p.setAttribute("class","text-center");
                    p.innerText = `${type.damage_relations.double_damage_from[i].name}`;
                document.querySelector(`#${body} .ddf`).appendChild(p);
            }

            for(var i = 0; i < type.damage_relations.double_damage_to.length;i++){
                let p = document.createElement("p");
                    p.setAttribute("class","text-center");
                    p.innerText = `${type.damage_relations.double_damage_to[i].name}`;
                document.querySelector(`#${body} .ddt`).appendChild(p);
            }

            for(var i = 0; i < type.damage_relations.half_damage_from.length;i++){
                let p = document.createElement("p");
                    p.setAttribute("class","text-center");
                    p.innerText = `${type.damage_relations.half_damage_from[i].name}`;
                document.querySelector(`#${body} .hdf`).appendChild(p);
            }

            for(var i = 0; i < type.damage_relations.half_damage_to.length;i++){
                let p = document.createElement("p");
                    p.setAttribute("class","text-center");
                    p.innerText = `${type.damage_relations.half_damage_to[i].name}`;
                document.querySelector(`#${body} .hdt`).appendChild(p);
            }
            for(var i = 0; i < type.damage_relations.no_damage_from.length;i++){
                let p = document.createElement("p");
                    p.setAttribute("class","text-center");
                    p.innerText = `${type.damage_relations.no_damage_from[i].name}`;
                document.querySelector(`#${body} .ndf`).appendChild(p);
            }

            for(var i = 0; i < type.damage_relations.no_damage_to.length;i++){
                let p = document.createElement("p");
                    p.setAttribute("class","text-center");
                    p.innerText = `${type.damage_relations.no_damage_to[i].name}`;
                document.querySelector(`#${body} .ndt`).appendChild(p);
            }
            console.log(type.damage_relations);


        }).catch((error) => console.log(error));
    }

    const relationPokemon = (url, body) =>{
          
        fetch(url)
        .then((resp) =>resp.json())
        .then((ability)=>{
            console.log(body);
           
            for(var i = 0; i < ability.pokemon.length;i++){
                let p = document.createElement("p");
                    p.setAttribute("class","text-center");
                    p.innerText = `${ability.pokemon[i].pokemon.name}`;
                document.querySelector(`#${body}`).appendChild(p);
            }

          
            console.log(type.damage_relations);


        }).catch((error) => console.log(error));
    }
    
    let btn = document.getElementById("btn-load-pokemon");
    btn.onclick = () =>{
        let url = document.getElementById("next-page").textContent;
        container.removeChild(document.getElementById("next-page"));
        loadPokemons(url)        
    }

    loadPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

});