let getAlbum = document.getElementById("getAlbumButton");
let createAlbum = document.getElementById("createAlbumButton");
let updateAlbum = document.getElementById("updateAlbumButton");
let deleteAlbum = document.getElementById("deleteAlbumButton");


let albumID = document.getElementById("album-id");
let albumTitle = document.getElementById("album-title");
let albumArtist = document.getElementById("artist");
let albumYear = document.getElementById("year");


getAlbum.addEventListener('click', async event => {

    //Send get request to receive book data, print the book data to the console.
    const response = await fetch('http://127.0.0.1:3000/',{
    method: 'GET',
    headers: {'content-type':'application/json'},
    });
    const responseData = await response.json();

    document.getElementById("showBooks").innerHTML = responseData.map(b => b.name).join('<br/>')
    console.log(responseData);

  
    
});