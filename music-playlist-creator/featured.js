

// Function to select a random playlist
function selectRandomPlaylist(playlists) {
    const randomIndex = Math.floor(Math.random() * playlists.length);
    return playlists[randomIndex];
    }
    
    // Function to populate the Featured page with the selected playlist
    function populateFeaturedPage(playlist) {
    // Update the playlist name
    const featuredPlaylistName = document.getElementById('featured-playlist-name');
    featuredPlaylistName.textContent = playlist.playlist_name;

    // Update the playlist image
    const featuredImage = document.getElementById('featured-img');
    featuredImage.src = playlist.playlist_art.replace('<', '').replace('>', '');
    
    // Update the list of songs
    const featuredSongsList = document.getElementById('featured-songs-list');
    featuredSongsList.innerHTML = ''; // Clear existing songs
    
    playlist.songs.forEach(song => {
    const songItem = document.createElement('li');
    const songImage = document.createElement('img');
    songImage.src = song.cover_art.replace('<', '').replace('>', '');
    songImage.alt = `Cover art for ${song.title}`;
    songImage.className = 'song-cover-art';
    const songText = document.createElement('span');
    songText.className = 'song-text';
    // songItem.textContent = `${song.title} by ${song.artist}`;
    songText.textContent = `${song.title} by ${song. artist}`;

    songItem.appendChild(songImage);
    songItem.appendChild(songText);

    featuredSongsList.appendChild(songItem);
    });
    }
    
    // When the DOM is fully loaded, select a random playlist and populate the Featured page
    document.addEventListener('DOMContentLoaded', () => {
    const randomPlaylist = selectRandomPlaylist(data.playlists);
    populateFeaturedPage(randomPlaylist);
    });


   