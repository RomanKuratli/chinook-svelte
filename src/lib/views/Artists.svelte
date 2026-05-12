<script lang="ts">
  import { onMount } from "svelte";
    import type { RestClient } from "$lib/api/rest_client";
  import { 
    type Track, 
    type Artist, 
    type Album 
} from "$lib/api/types";

  const ARTISTS_URL = "artists"

    interface ArtistsProps {
        client: RestClient
    }

    const { client }: ArtistsProps = $props()
    let artists: Artist[] = $state<Artist[]>([])
    let selectedArtist = $state<number | null>(null)
    let albums = $state<Album[]>([])
    let selectedAlbum = $state<number | null>(null)
    let tracks = $state<Track[]>([])

    onMount(async () => {
        artists = await client.get<Artist[]>(ARTISTS_URL);
        console.log("Artists:", artists);
    })

    async function onSelectArtist(artistId: number) {
        selectedArtist = artistId
        if (!artistId) {
            albums = []
            return
        }
        albums = await client.get<Album[]>(`artists/${artistId}/albums`)
        selectedAlbum = null
    }

    async function onSelectAlbum(albumId: number) {
        selectedAlbum = albumId
        if (!albumId) {
            tracks = []
            return
        }
        tracks = await client.get<Track[]>(`albums/${albumId}/tracks`)
    }

    function formatDuration(ms: number): string {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
</script>

<!--
<div class="dbg">
    <p>selectedArtist: <span class="dbgVal">{selectedArtist}</span></p>
    <p>nof artists: <span class="dbgVal">{artists.length}</span></p>
    <p>selectedAlbum: <span class="dbgVal">{selectedAlbum}</span></p>
    <p>nof albums: <span class="dbgVal">{albums.length}</span></p>
    <p>nof tracks: <span class="dbgVal">{tracks.length}</span></p>
</div>
-->

<h2>Artists</h2>
<div class="cardBox">
    <div id="crdSelectArtist" class="card">
        <h3>Please select an artist:</h3>
        <input id="searchArtist" type="text" placeholder="Search artists..." />
        <hr />
        <div class="scrollable-list">
            <ul>
                {#each artists as artist}
                    <li>
                        <button 
                            class:active={artist.id === selectedArtist}
                            onclick={() => onSelectArtist(artist.id)}
                        >{artist.name}</button>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <div id="crdSelectAlbum" class="card">
        <h3>Please select an album:</h3>
        <hr />
        <div class="scrollable-list">
            <ul>
                {#each albums as album}
                    <li>
                        <button
                            class:active={album.id === selectedAlbum}
                            onclick={() => onSelectAlbum(album.id)}
                        >{album.title}</button>
                    </li>
                {/each}
            </ul>
        </div>
        
    </div>
    <div id="crdSelectTrack" class="card">
        <h3>Tracks</h3>
        <hr />
        <div class="scrollable-list">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Media Type</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {#each tracks as track}
                        <tr>
                            <td>{track.name}</td>
                            <td>{formatDuration(track.milliseconds)}</td>
                            <td>{track.mediatype.name}</td>
                            <td>{track.genre.name}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        
    </div>
</div>



<style>
    #searchArtist {
        grid-column: 1 / span 3; /* Nimmt alle 3 Spalten ein */
        padding: 1rem;
        margin: 1rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        background: #1e1e1e;
        color: white;
        max-height: 50px;
        width: 200px;
    }

    #crdSelectArtist {
        grid-column: 1;
        grid-row:1;
        max-height: 800px;
    }

    #crdSelectAlbum {
        grid-column: 2;
        grid-row:1;
        max-height: 800px;
    }

    #crdSelectTrack {
        grid-column: 3;
        grid-row: 1;
        max-height: 800px;
    }

    button {
        all: unset; /* Entfernt Standard-Button-Styling */
        display: block;
        width: 100%;
        cursor: pointer;
        padding: 0.5rem 0.5rem 0.5rem 2rem;
        text-align: left;
    }
</style>