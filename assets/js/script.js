//$(selector).accion()
$(document).ready(function() {
  $('#btnBuscar').click(function() {
        let nombrePokemon = $('#campoBuscar').val().toLowerCase();

        //Si existe o no existe
    if (nombrePokemon) {
        buscarPokemon(nombrePokemon);
    };    
});

//Solicitar el Pókemon a la API
    function buscarPokemon(pokemon) {
        $.ajax({
			type: "GET",
			url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
			dataType: "json",
			success: function (data) {
			renderPokeData(data);
			}
		});

        //Limpiamos el Input
        $('#campoBuscar').val('');
    }

    function renderPokeData(data) {
        //Eliminamos el div auxiliar
        $('.card').remove();

        let div = $('<div></div>');
        div.addClass('poke card');

        let name = $('<h3></h3>');
        name.addClass('card-title');
        name.append(data.id + ' ' + data.name.toUpperCase());
        div.append(name);

        let img = $('<img />');
        img.attr('src', data.sprites.other["official-artwork"].front_default);
        img.addClass('card-img');
        div.append(img);

        let body = $('<div></div>');
        body.addClass('card-body');

        //Logica para mostrar tipos
        let pokeType = data.types;
        let tipos = '';

        pokeType.forEach(function(type, index, array) {
            //Agregar guión
            if (index < array.length - 1) {
                tipos += `${type['type']['name']} - `.toUpperCase();
            }
            else {
                tipos += `${type['type']['name']}`.toUpperCase();
            }
        });

        body.append(`<div>Tipo: ${tipos}</div>`);
        div.append(body);

        $('#pokemon-container').append(div);
    };

    buscarPokemon(1);
});