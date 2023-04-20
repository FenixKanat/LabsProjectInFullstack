let getAlbum = document.getElementById("getAlbumButton");
let getOneAlbum = document.getElementById("getOneAlbumButton");
let createAlbum = document.getElementById("createAlbumButton");
let updateAlbum = document.getElementById("updateAlbumButton");
let deleteAlbum = document.getElementById("deleteAlbumButton");

let albumID = document.getElementById("album-id");
let albumTitle = document.getElementById("album-title");
let albumArtist = document.getElementById("artist");
let albumYear = document.getElementById("year");

getAlbum.addEventListener('click', async event => {

    const response = await fetch('http://127.0.0.1:3000/api/albums',{
    method: 'GET',
    headers: {'content-type':'application/json'},
    });
    const responseData = await response.json();

    document.getElementById("Albums").innerHTML = responseData.map(a => a.AlbumTitle).join('<br/>')
    console.log(responseData);
});

getOneAlbum.addEventListener('click', async event => {

    const albumid = albumID.value;
 
    const response = await fetch(`http://127.0.0.1:3000/api/albums/${albumid}`,{
    method: 'GET',
    headers: {'content-type':'application/json'},
    });
    const responseData = await response.json();

    document.getElementById("Albums").innerHTML = responseData.AlbumTitle;
    console.log(responseData);
});


createAlbum.addEventListener('click', async event => {

    const albumid = albumID.value
    var albumtitle = albumTitle.value
    var albumartist = albumArtist.value
    var albumyear = albumYear.value
 
    const AlbumInfo = {
        AlbumID: albumid,
        AlbumTitle: albumtitle,
        Artist: albumartist,
        Year: albumyear
    }  
    
    console.log(JSON.stringify(AlbumInfo))
    try {
        const response = await fetch('http://127.0.0.1:3000/api/albums', 
        {
          method: 'POST',
          headers: {'content-type':'application/json'}, 
          body: JSON.stringify(AlbumInfo)
        });
   
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
      console.log(albumid,albumtitle,albumartist,albumyear)

});

updateAlbum.addEventListener('click', async event => {

    const albumid = albumID.value
    var albumtitle = albumTitle.value
    var albumartist = albumArtist.value
    var albumyear = albumYear.value
 
    const AlbumInfo = {
        AlbumID: albumid,
        AlbumTitle: albumtitle,
        Artist: albumartist,
        Year: albumyear
    }  
    
    console.log(JSON.stringify(AlbumInfo))
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/albums/${albumid}`, 
        {
          method: 'PUT',
          headers: {'content-type':'application/json'}, 
          body: JSON.stringify(AlbumInfo)
        });
   
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    
    console.log(albumid,albumtitle,albumartist,albumyear)

});

deleteAlbum.addEventListener('click', async event => {
   
    const albumid = albumID.value
 
    const response = await fetch(`http://127.0.0.1:3000/api/albums/${albumid}`, 
    {
        method: 'DELETE',
        headers: {'content-type':'application/json'}, 
    });
    const responseData = await response.json();
    console.log(responseData);
});
