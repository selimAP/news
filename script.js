import API_KEY from './apikey.js';


async function getNews(){

    await fetch(`https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=${API_KEY}`)
    .then(d => d.json())
    .then(response =>{
        console.log(response.results);
        const output = document.getElementById('output');

        for(let i = 0; i < response.results.length; i++){
            const article = response.results[i];
            console.log(article.title);

            try{
                const imageUrl = article.multimedia[0].url; // Anpassung für das Bild
                const imageCaption = article.multimedia[0].caption;

                output.innerHTML += `
                <div class="news-card">
                    <div class="news-card-body">
                        <div class="img-container">
                        <img src="${imageUrl}" alt="${imageCaption}" title="${imageCaption}"/>
                        </div>
                        <h2>${article.title}</h2>
                        <div class="card-text">
                            <p>${article.abstract}</p>
                        </div>
                        <div>
                        <a class="NYT-url" href="https://www.nytimes.com/" target="_blank">© 2023 The New York Times Company</a>
                        </div>
                    </div>
                </div>
                <hr class="line">
                `;
            }
            catch(error){
                console.log(error);
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    getNews();
});




window.addEventListener("scroll", function(){
    let logo = this.document.getElementById("logo");

    if(this.scrollY > 0){
        logo.style.position = 'fixed';
    }
    else{
        logo.style.position = 'sticky'; 
    }

});