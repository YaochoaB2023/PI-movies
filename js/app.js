let pagina = 1;

const anterior = document.getElementById('anterior');
const siguiente = document.getElementById('siguiente');

siguiente.addEventListener('click', () =>{
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
})

anterior.addEventListener('click', () =>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
})


const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch (`https://api.themoviedb.org/3/movie/popular?api_key=299f277cfaf376bd5f14b7929a886417&page=${pagina}`)
        console.log(respuesta);

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <div class="imagen">
                            <img src ="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"> 
                        </div>
                        <div class ="title">${pelicula.title}</div>
                        <div class ="title">${pelicula.popularity}</div>
                        <div class ="title fecha">${pelicula.release_date}</div>
                    </div>
                `
                document.getElementById('contenedor').innerHTML = peliculas;
            })
        }else if(respuesta.status === 401){
            console.log("error de la api key");
        }else{
            console.log('error de capa 8 404');
        }
    } catch (error) {
        console.log(error)
    }
}
cargarPeliculas();