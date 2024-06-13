
function createPlaylistCards(playlists){
  const container = document.getElementById("playlist-cards");

  container.innerHTML = "";

  playlists.forEach(playlist => {
    const card = document.createElement('div');
    card.className = 'playlist-card';

    const art = document.createElement('img');
    art.src = playlist.playlist_art.replace('<','').replace('>','');
    art.alt = 'cover art for ${playlist.playlist_name}';

    const title = document.createElement('h3');
    title.textContent = playlist.playlist_name;

    const creator = document.createElement('p');
    creator.textContent = `${playlist.playlist_creator}`;

    //create like icon
    const likeIcon = document.createElement('i');
    likeIcon.className = 'fa fa-heart';

      //create like count text
    const likeCount = document.createElement('span');
    likeCount.className = 'like-count';
    likeCount.textContent = playlist.likeCount;

    const likeContainer = document.createElement('div');
    likeContainer.className = 'like-container';
    likeContainer.appendChild(likeIcon);
    likeContainer.appendChild(likeCount);

    likeIcon.addEventListener('click', function(event){
      event.stopPropagation();
      playlist.likeCount =(playlist.likeCount === 0) ? 1 : 0;
      likeCount.textContent = playlist.likeCount;
      if (playlist.likeCount === 1){
        this.classList.add('active');
      } else{
        this.classList.remove('active');
      }
    });

    card.appendChild(art);
    card.appendChild(title);
    card.appendChild(creator);
    card.appendChild(likeContainer);
 
    container.appendChild(card);

    card.addEventListener('click', () => createModal(playlist));
  });
}
//this calls the function createPlaylisCards 
createPlaylistCards(data.playlists)




//this is the modal 
function createModal(playlist){
  const modal = document.getElementById('myModal');
  const modalHeader = document.getElementById('modalHeader');
  const songList = document.getElementById('songList');

  modalHeader.innerHTML = '';

  songList.innerHTML = '';

//for the playlist image 
  const art = document.createElement('img');
  art.src = playlist.playlist_art.replace('<', '').replace('>', '');
  art.alt = `Cover art for ${playlist.playlist_name}`;
  art.className = 'playlist-cover-art'; // Add a class for styling if needed
  modalHeader.appendChild(art);

//for the creator name and playlist 
  const headerInfo = document.createElement('div');
  headerInfo.className = 'header-info';

//for the playlist title
  const headerText = document.createElement('h2');
  headerText.textContent = playlist.playlist_name;
  headerInfo.appendChild(headerText);

//for the playlist creator name
  const headerCreator = document.createElement('h3');
  headerCreator.textContent = playlist.playlist_creator;
  headerInfo.appendChild(headerCreator);

  modalHeader.appendChild(headerInfo);

  //for having songs be added to the modal 
  playlist.songs.forEach(song => {
    const songItem = document.createElement('li');
    songItem.className = 'song-item';

    songItem.innerHTML = `
    <img src="${song.cover_art.replace('<', '').replace('>', '')}" alt="Cover art for ${song.title}" class="song-cover-art">
    <div class="song-details">
    <h3>${song.title}</h3>
    <p>Artist: ${song.artist}</p>
    <p>Album: ${song.album}</p>
    <p>Duration: ${song.duration}</p>
    </div>
    `;
    songList.appendChild(songItem);
  });
  modal.style.display = 'block';
}

document.querySelector('.close').onclick = function(){
  document.getElementById('myModal').style.display ='none';

};


document.getElementById('shuffleButton').addEventListener('click', function() {
  const songList = document.getElementById('songList');
  for(let i = songList.children.length; i>=0; i--){
    songList.appendChild(songList.children[Math.random()*i | 0])
  }
});


const search = document.getElementById("search");
search.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredPlaylists = data.playlists.filter((playlist) => 
      playlist.playlist_name.toLowerCase().includes(value) ||
      playlist.playlist_creator.toLowerCase().includes(value)
  );
  createPlaylistCards(filteredPlaylists);
});





























