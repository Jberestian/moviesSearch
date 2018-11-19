$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
e.preventDefault();
});
});

function getMovies(searchText) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=eed4f1d8aea9e26327c4f8a358313952&query=Jack+Reacher\n'+searchText)

        // axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=480777bb')
        .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                <div class="well text-centr">
                <img src="movie.poster_path" alt="poster imgage">
                <h5>${movie.title}</h5>
                <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Detail</a>
</div>
</div>
                `;
            });
            $('#movies').html(output)
    })
    .catch(() => {
        console.log(error);
    })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'index.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    axios.get('https://api.themoviedb.org/3/movie/343611?api_key=eed4f1d8aea9e26327c4f8a358313952\n')
        .then((response) => {
       console.log(response);
       let movie = response.data;


       let output = `
       <div class="row">
       <div class="col-md-4">
       <img src="${movie.poster_path}" alt="poster image" class="thumbnail">
</div>
<div class="col-md-8">
<h2>${movie.title}</h2>
<ul class="list-group">
<li list-group-item>Genre: ${movie.genre_ids}</li>
<li list-group-item>Popularity: ${movie.popularity}</li>
<li list-group-item>Release Date: ${movie.release_date}</li>
<li list-group-item>Vote Average: ${movie.vote_average}</li>
<li list-group-item>Vote Count: ${movie.vote_count}</li>
</ul>

<h2>${movie.title}</h2>
</div>
</div> 
       `;

       $('#movie').html(output);
    })
    .catch(() => {
            console.log(error);
    });
}