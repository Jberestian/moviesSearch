$(document).ready(() => {
    $('#searchform').on('submit', (e) => {
    let searchtext = $('#searchtext').val();
    getmovies(searchtext);
e.preventdefault();
});
});

function getMovies(searchtext) {
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=eed4f1d8aea9e26327c4f8a358313952&query='+searchtext)
        .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
           <div class="col-md-3">
             <div class="well text-centr">
               <img src=${'https://image.tmdb.org/t/p/w500/'+movie.poster_path}>
                 <h5>${movie.title}</h5>    
                   <a onclick="movieselected('${movie.id}')" class="btn btn-primary" href="#">movie detail</a>
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

function movieselected(id) {
    sessionstorage.setitem('movieid', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieid = sessionstorage.getitem('movieid');
    axios.get('https://api.themoviedb.org/3/find/{external_id}?api_key=eed4f1d8aea9e26327c4f8a358313952&language=en-us&external_source=imdb_id')
        .then((response) => {
       console.log(response);
       let movie = response.data;


       let output = `
       <div class="row">
       <div class="col-md-4">
       <img src=${'https://image.tmdb.org/t/p/w500/'+movie.poster_path} class="thumbnail">
</div>
<div class="col-md-8">
<h2>${movie.title}</h2>
<ul class="list-group">
<li list-group-item>genre: ${movie.genre_ids}</li>
<li list-group-item>popularity: ${movie.popularity}</li>
<li list-group-item>release date: ${movie.release_date}</li>
<li list-group-item>vote average: ${movie.vote_average}</li>
<li list-group-item>vote count: ${movie.vote_count}</li>
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