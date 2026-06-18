const JIKAN_URL = 'https://api.jikan.moe/v4/anime';

const animeSelect = document.getElementById('anime-select');
const animeCard = document.getElementById('anime-card');
const animeTitle = document.getElementById('anime-title');
const animePoster = document.getElementById('anime-poster');
const animeScore = document.getElementById('anime-score');
const animeEpisodes = document.getElementById('anime-episodes');
const animeSynopsis = document.getElementById('anime-synopsis');
const errorBox = document.getElementById('error-box');

animeSelect.addEventListener('change', function() {
    const selectedId = animeSelect.value;
    if (selectedId) {
        fetchAnimeData(selectedId);
    }
});

function fetchAnimeData(animeId) {
    const url = `${JIKAN_URL}/${animeId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not fetch data from MyAnimeList.');
            }
            return response.json();
        })
        .then(responseBody => {
            const anime = responseBody.data;

            errorBox.style.display = 'none';

            animeTitle.textContent = anime.title;
            animeScore.textContent = anime.score ? `⭐ ${anime.score} / 10` : '⭐ N/A';
            animeEpisodes.textContent = `Total Episodes: ${anime.episodes || 'Ongoing'}`;
            animeSynopsis.textContent = anime.synopsis || 'No synopsis available for this title.';
            
            animePoster.src = anime.images.jpg.image_url;
            animePoster.alt = anime.title;

            animeCard.style.display = 'block';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            animeCard.style.display = 'none';
            errorBox.textContent = 'Failed to load data. Please wait a second and try again.';
            errorBox.style.display = 'block';
        });
}