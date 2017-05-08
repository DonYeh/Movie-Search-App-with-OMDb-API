$(document).ready(function(){

	$('input').keyup(function(){

		var movieTitle =$("#search").val().toLowerCase();
		var movieYear=$("#year").val().toLowerCase();
		var movieHTML = "";

		$.ajax({
			url: "http://www.omdbapi.com/?s=" + movieTitle + "&y=" + movieYear + "&r=json",
			method: "GET",
			dataType: "json",
			success: function(data){ 
				if (data.Response === "True"){ // If movie is found, create HTML with list items of movies
					$.each(data.Search, function(i,movie){
						movieHTML += "<li id='" + movie.imdbID + "'><a href='#'><div class='poster-wrap'>";
							if (movie.Poster !== 'N/A') { // Display a movie poster if it is available
								movieHTML += "<img class='movie-poster' src=" + movie.Poster + ">";
							} else { //Display a placeholder icon when the API does not return poster data
								movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
							}
						movieHTML += "</a></div>";
	          			movieHTML += "<span class='movie-title'>" + movie.Title + "</span>";     // Display movie title
	          			movieHTML += "<span class='movie-year'>" + movie.Year + "</span></li>";  // Display movie year of release
						}); // End each method
				} else if (data.Response === "False") { // If movie is not found, display message
					movieHTML += "<li class='no-movies'>";
					movieHTML += "<i class='material-icons icon-help'>help outline</i>No movies found that match: " + movieTitle + "</li>";
				} //end elseif

				$('#movies').html(movieHTML); // insert search results data inside the #movies <ul>
			} //end success: function(data)
		});// end .ajax

	}); // end input.keyup

}); // end of document.ready

