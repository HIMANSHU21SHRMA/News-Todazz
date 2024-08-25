const apiKey = 'pub_51648486486e376f6b0e3018fc06fada8084d';
const newCont = document.querySelector('#rightsec');
const countrySelect = document.querySelector('#country');
const languageSelect = document.querySelector('#lang');
const search = document.querySelector('#search');
const searchBar = document.querySelector('.searchbar');
const leftsec = document.querySelector('#leftsec')
const home = document.querySelector('#home')
const close = document.querySelector('#close');
// top three
const three = document.querySelector('#week')
// top five
const five = document.querySelector('#today');

const categories = document.querySelectorAll('.btn')

const hideShow = document.querySelector('#image')

if (window.innerWidth <= 780) {
    leftsec.classList.add('hide')
    // hideShow.addEventListener('click', () => {

    // })
}
hideShow.addEventListener('click',() => {
        leftsec.classList.remove('hide')
    leftsec.style.display = 'flex' 
   
})
close.addEventListener('click',() => {
    leftsec.style.display = 'none' 

})
// for category

categories.forEach((button) => {
    button.addEventListener('click', async() => {
const category = button.value.toLowerCase();
const article = await fetchNews(category);
displayNews(article)

})
})
let pageSize = 10;

five.addEventListener('click', () => {
pageSize = 5
updateNews()
})
home.addEventListener('click', () => {
pageSize = 10
updateNews()
})
three.addEventListener('click', () => {
pageSize = 3
updateNews()
})


// fetching....

const fetchNews = async(category = 'top ') => {
const country = countrySelect.value;
const language = languageSelect.value;

// try, catch

try {
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=${country}&language=${language}&category=${category}&size=${pageSize}&`


    const responce = await fetch(apiUrl);
    const data = await responce.json();
    console.log(data);
    // console.log(data.results.length);
    
    
        // Handle errors in the API response

        if (data.status === 'error') {
            console.error(`API Error: ${data.results.message}`);
            return [];
        }
        return data.results || [];
    
} catch (error) {
    console.log("error in fetching news",error);
    return [];
}

}
// function for display
const displayNews = (articles) => {
    newCont.innerHTML = '';
    if (!Array.isArray(articles) || articles.length === 0) {
        newCont.innerHTML = '<h2>No article Found.</h2>';
        return;
    }

    articles.forEach((article) => {

        // console.log(article.pubDate);
        
        // creating container
        const  newsHTML = `
        <div class='news-cont'>
           <div id="img-id">
           <img id='img' src="${article.image_url ? article.image_url : 'placeholder.png'}"
            alt="News IMage">
           </div>
           <div class="news-detcont">
           <h3 id="news-title">${article.title}</h3>
           <p id="news=details">${article.description ? article.description : "no description available"}</p>
           </div>
           </div>
        `;

        newCont.innerHTML += newsHTML; //append news..
    })
}

// Function to fetch and display news
const updateNews = async () => {
    const articles = await fetchNews();
    displayNews(articles);
};
    


// for all country, and langs
countrySelect.addEventListener('change',updateNews);
languageSelect.addEventListener('change',updateNews);



// initial load;

updateNews();