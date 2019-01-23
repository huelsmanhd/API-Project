const baseURL = 'https://api.edamam.com/search';
const app_id = 'a82eb3fb';
const app_key = 'b46033fbe6b37fadf7f7309117f9097b';
let url;

// SEARCH
const searchForm = document.querySelector('form');
const search = document.querySelector('.search');

// Diet/Health Restrictions
const diet = document.querySelector('.diet');
const health = document.querySelector('.health');
const excluded = document.querySelector('.excluded');
const calories = document.querySelector('.calories');

const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

const section = document.querySelector('section');

let pageNumber = 0;
console.log('PageNumber:', pageNumber);
let displayNav = 'false';

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
    e.preventDefault();
    console.log(e)
    url = baseURL + '?q=' + search.value + '&app_id=' + app_id + '&app_key=' + app_key;
    console.log('URL:', url);

    if (diet.value !== ''){
        console.log(diet.value);
        url += '&diet=' + diet.value;
    }

    if (health.value !== ''){
        console.log(health.value);
        url += '&health=' + health.value;
    }

    if (excluded.value !== ''){
        console.log(excluded.value)
        url += '&excluded=' + excluded.value;
    }

    if (calories.value <= 10000){
        console.log(calories.value);
        url += '&calories=' + calories.value;
    }
    console.log(url)

fetch(url)
    .then(function(result) {
        console.log(result);
        return result.json();
    }).then(function(json) {
        console.log(json);
        displayResults(json);
    });
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
}
let recipe = json.hits;

if (recipe.length === 0) {
    console.log('No Soup For You!');
} else {
    for (i=0; i < recipe.length; i++) {
        let label = document.createElement('label');
        let heading = document.createElement('h2')
        let url = document.createElement('a');
        let image = document.createElement('img');
        let para  = document.createElement('p');
        let calories = document.createElement('p');
        let ingredientLines = document.createElement('p');
        let dietLabels = document.createElement('p');
        let healthLabels = document.createElement('p');
    
        let popular = recipe[i]
        console.log('Popular: ', popular);

        url.href = popular.recipe.url;
        url.textContent = popular.recipe.label;
        para.textContent = ['Serves: ' + popular.recipe.yield];
        calories.textContent = ['Calories per dish: ' + popular.recipe.calories];
        
        ingredientLines.textContent = 'Ingredients: ';
        for (x = 0; x < popular.recipe.ingredientLines.length; x++) {
            let ul = document.createElement('ul');
            ingredientLines.textContent += popular.recipe.ingredientLines[x] + ' ';
            ingredientLines.appendChild(ul)
        };

        image.src = popular.recipe.image;
        image.alt = popular.recipe.source;

        label.appendChild(heading);
        heading.appendChild(url);
        section.appendChild(image);
        label.appendChild(para);
        label.appendChild(calories);
        label.appendChild(ingredientLines);
        label.appendChild(dietLabels);
        label.appendChild(healthLabels);
        section.appendChild(label);
    }
}
    if (recipe.length === 10) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
};

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
    console.log('Page number: ', pageNumber);
}

function previousPage(e) {
    if(pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log('Page: ', pageNumber);
}