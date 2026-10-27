const resultado = document.getElementById("result");

let card = document.getElementById("card");
let card__img = document.getElementById("card_img");
let card__nombre = document.getElementById("card__nombre");
let card__tipo = document.getElementById("card__tipo");
let dialogo = document.getElementById("dialogo");

export async function pokefuncion() {
  for (let i = 1; i <= 151; i++) {
    const pokelista = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemon = await pokelista.json();

    resultado.innerHTML += `<div class="card">
      <p>${pokemon.name} ${pokemon.id < 10 ? "#00" : pokemon.id >= 10 && pokemon.id < 100 ? "#0" : "#"}${pokemon.id}</p>
      <img src="${pokemon.sprites.other["official-artwork"].front_shiny}">
      </div>
      `;
  }

  // dialogo.addEventListener("click", () => {
  //   dialogo.close();
  //   console.log("hola");
  // });

  resultado.addEventListener("click", (event) => {
    const tarjeta = event.target.closest(".tarjeta");

    if (!tarjeta) {
      return;
    }

    const titulo = tarjeta.querySelector("h1").textContent;
    const id = titulo.trim().split(" ").pop();

    console.log("ID del Pokémon:", id);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json()) // <- ESTO FALTABA
      .then((response) => {
        // Ahora 'response' sí tiene los datos del Pokémon
        const tipos = response.types.map((tipo) => tipo.type.name).join(" / ");

        // CREAR LA TARJETA
        // 2. Cambiar 'id' por 'data-id' en el div principal
        console.log(response.id);

        resultado.innerHTML += `<dialog id="dialogo" class="modal" open="">
        <img id="dialogo__img" src="" alt="">
      <h2 id="dialogo__nombe">nombre</h2>
      <div id="dialogo__tipo">
        <p>tipo</p>
        <p>tipo</p>
      </div>
      <div id="dialogo__caract">
        <p>altura</p>
        <p>peso</p>
      </div>
      <img id="dialogo__cruz" class="dialogo__cruz" src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png" alt="">
    </dialog>`;
      })
      .catch((error) => {
        console.error("Error al cargar el Pokémon:", error);
      });
  });
}
