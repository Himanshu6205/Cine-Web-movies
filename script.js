const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container'); 
const inputBox = document.querySelector('.inputbox');




const showMovieData = (data) => {
        movieContainer.innerHTML = "";
        movieContainer.classList.remove('no-background'); 

    const {Title, imdbRating , Genre , Released , Runtime , Actors , Plot, Poster} = data; 

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenerElement = document.createElement('div');
    movieGenerElement.classList.add('movie-gener');
    
    Genre.split(",").forEach(element => {
        const p= document.createElement('p');
        p.innerText = element;
        movieGenerElement.appendChild(p);
        

    });

    movieElement.appendChild(movieGenerElement);

    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
    <p><strong>Duration: </strong>${Runtime}</p>
    <p><strong>Cast: </strong>${Actors}</p>
    <p><strong>Plot: </strong>${Plot}</p>`;


    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
     moviePosterElement.innerHTML =`<img src="${Poster}"/>`;


      movieContainer.appendChild(moviePosterElement); 
      movieContainer.appendChild(movieElement); 


}


const getMovieInfo = async (movie) => {
   
   try {
        const myApiKey = "a0e7b26a";
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Unable to fetch movie data")
    }

    const data = await response.json();

    showMovieData(data);
} catch(error){
    showErrorMessage("No MOvie Found !!!");
}

}

 const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('no-background'); 
 }



searchForm.addEventListener('submit' , (e) => {
   e.preventDefault();
   const movieName = inputBox.value.trim(); 
   if (movieName !== '') {
    showErrorMessage("Fetching Movie Information....")
    getMovieInfo(movieName);
   }
   else{
    showErrorMessage("Enter movie name to get movie information");
}
});