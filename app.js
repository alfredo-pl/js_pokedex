$(document).ready(function(){


    function loadPokemons(url) {
        
            $.ajax({
               /*  beforeSend: function() {
                    $('#btn-load-pokedex').text('Cargando...');
                }, */
                type: 'GET',
                url: url
        
            }).done(function(response) {
               var p = $('<p>', {
                    'text' : response.next,
                    'style' : 'display:none',
                    'id': 'next-page'
                  });
                  $('.container').append(p);
                response.results.forEach(function(pokemon) {
                
                    $('#div-pokemon').append(`
                        <div class="card my-2" style="width: 18rem;">
                            <div class="card-header">
                                <h5 class="card-title text-center text-uppercase mb-0">${pokemon.name}</h5>
                            </div>
                            <div class="card-body text-center">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPjqAUwbBeaBklkNqLW7YFzRFJxkeugHXPCQ&usqp=CAU" class="card-img-top w-50" id="img-${pokemon.name}" alt="${pokemon.name}">                                
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary detail" data-toggle="modal" data-target="#modal${pokemon.name}">¡Quiero saber más de este pokémon!</button>
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
                                                <div class="modal-footer px-3" id="modal-footer-${pokemon.name}">
                                                    <div class="col-2">
                                                        <div id="type-${pokemon.name}">
                                                            <h6>Type</h6>
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
                                                            <h6>Abilities</h6>
                                                        </div>
                                                    </div>
                                                    <div class="col-3">
                                                        <div id="mov-${pokemon.name}">
                                                            <h6>Mov</h6>
                                                            <ul class="p-1"></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                   
                });
            
            }).fail(function(error) {
                console.log('Esto falló ', error);
            });
        
    }


    $('#div-pokemon').on('click', '.detail', function() {
        var modal = $(this).data('target');
        var nombre = modal.replace("#modal","");
       
        if($( `#modal-body-${nombre}` ).html().trim() ==''){
      
            $.ajax({
                type: 'GET',
                url: 'https://pokeapi.co/api/v2/pokemon/'+nombre
            }).done(function(pokemon) {
               $(`#img-${pokemon.name}`).attr("src",pokemon.sprites.other["dream_world"].front_default);

                $(`#modal-body-${pokemon.name}`).append(`
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" class="w-25 " alt="${pokemon.name}">
                `);
            

                for(var i = 0; i < pokemon.types.length;i++){
                    $(`#type-${pokemon.name}`).append(`
                    <p>${pokemon.types[i].type.name}</p>
                    `);
                }
                for(var i = 0; i < pokemon.game_indices.length;i++){
                    $(`#generations-${pokemon.name} .row`).append(`
                    <p class="col-6">${pokemon.game_indices[i].version.name}</p>
                    `);
                }
               
                for(var i = 0; i < pokemon.abilities.length;i++){
                    $(`#skills-${pokemon.name}`).append(`
                    <p>${pokemon.abilities[i].ability.name}</p>
                    `);
                }
                for(var i = 0; i < 5;i++){
                    $(`#mov-${pokemon.name} > ul`).append(`
                    <li>${pokemon.moves[i].move.name}</li>
                    `);
                }
          
            });
        }
    });
    

    $( "#btn-load-pokemon" ).click(function() {
        var url = $('#next-page').text();
        $('#next-page').remove();
        loadPokemons(url)
      });

    loadPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

});