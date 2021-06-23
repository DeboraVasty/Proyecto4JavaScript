//variables
const formulario=document.querySelector('#formulario');
const listaTweets=document.querySelector('#lista-tweets');
let tweets=[];




//Event Listeners
eventListeners();



function eventListeners(){
    //cuando el usuario agrega nuevo tweet
    formulario.addEventListener('submit',agregarTweet);
    //cuando el documento está listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets=JSON.parse(localStorage.getItem('tweets'))||[];
        console.log(tweets);

        crearHTML();
    });
}




//funciones
function agregarTweet(e){
    e.preventDefault();
    
    //text donde el usuario escribe
    const tweet=document.querySelector('#tweet').value;
    const titulo=document.querySelector('#titulo').value;
    //validación
    if(tweet=== ''|| titulo===''){
        mostrarError('Los campos no puede estar vacios');
        return;// evita que se ejecuten mas lineas d codigo
    }

    const tweetObj={
        id: Date.now(),
        titulo,
        //texto:tweet es lo mismo que tweet
        tweet

    }
    tweets=[...tweets,  tweetObj];
    //agregado se crea el html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}


function mostrarError(error){
    const mensajeError=document.createElement('p');
    mensajeError.textContent=error;
    mensajeError.classList.add('error');
    //insertar en contenido
    const contenido=document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    //elimina la alerta despues de 3 segundos
    setTimeout(()=>{
        mensajeError.remove();
    },3000);
}

//muestra un listado de tweets
function crearHTML(){
    limpiarHTML();
    if (tweets.length> 0){
        tweets.forEach(tweet =>{
            //agregar boton de eliminar
            const btnEliminar=document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText='X';

            //añadir funcion eliminar
            btnEliminar.onclick=()=>{
                borrarTweet(tweet.id);
            }



            //crear html
            const li2= document.createElement('h4');
            const li= document.createElement('h6');
           
            //añadir el texto
            li2.innerText=tweet.titulo;
            li.innerText=tweet.tweet;
           
            //asignar el boton 
            li.appendChild(btnEliminar);
           
            //insertarlo en el html
            li2.appendChild(li);
            listaTweets.appendChild(li2);
            
        });

    }
    sincronizarStorage();
}
// agrega los tweets actuales al localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
//borrar tweet
function borrarTweet(id){
    tweets=tweets.filter(tweet=> tweet.id !== id);
    crearHTML();
}

//limpiar
function limpiarHTML(){
    //mientras haya elementos
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}