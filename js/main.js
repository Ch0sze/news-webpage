//TIME
function displayTime() {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('session');

    if (hrs >= 12) {
        session.innerHTML = 'PM';
    }
    else {
        session.innerHTML = 'AM';
    }

    if (hrs < 10) {
        hrs = '0' + hrs;
    }

    if (min < 10) {
        min = '0' + min;
    }

    if (sec < 10) {
        sec = '0' + sec;
    }

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    document.getElementById('seconds').innerHTML = sec;
}
setInterval(displayTime, 10);

/*
function displayDate() {
    var today = new Date();
    var dateBox = document.getElementById("date-box");
    dateBox.innerHTML = today.toDateString();
  }
  
  window.onload = function() {
    displayDate();
}
*/

//NEWS
function displayNews(targetElementId) {
    const targetElement = document.getElementById(targetElementId);

    if (!targetElement) {
        console.error(`Element with id '${targetElementId}' not found.`);
        return;
    }

    getNews().then(containerElement => {
        targetElement.appendChild(containerElement);
    }).catch(error => {
        console.error(error);
    });
}

function getNews() {
    // Set up the NewsAPI URL and API key
    const newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=60d429226c03407c8d66e21e44320161';

    // Make a GET request to the NewsAPI to fetch the latest news
    return fetch(newsApiUrl)
        .then(response => response.json())
        .then(data => {
            // Pick a random article from the response
            const randomIndex = Math.floor(Math.random() * data.articles.length);
            const article = data.articles[randomIndex];

            // Extract the title and content of the article
            const title = article.title;
            const content = article.content;
            const link = article.url;
            const imageUrl = article.urlToImage;

            console.log(link)
            // Create the title and content elements and set their styles
            const titleElement = document.createElement('h1');
            titleElement.style.margin = '20px'
            titleElement.textContent = title;

            const contentElement = document.createElement('p');
            contentElement.style.margin = '0 20px'
            contentElement.textContent = content;

            const imageElement = document.createElement('img');
            imageElement.classList.add('imgBox');
            imageElement.src = imageUrl;
            imageElement.alt = title;

            // Create a container element and set its style to center the contents
            const containerElement = document.createElement('div');
            containerElement.id = 'box';
            containerElement.classList.add('newsBox');


            containerElement.addEventListener('click', function () {
                // Open the desired webpage in a new tab or window
                window.open(link);
            });

            // Add the title and content elements to the container element
            containerElement.appendChild(titleElement);
            containerElement.appendChild(contentElement);
            containerElement.appendChild(imageElement);

            return containerElement;
        });
}

function callNews() {
    for (var i = 0; i < 2; i++) {
        if (i % 2 == 1) {
            displayNews("boxLeft");
        } else {
            displayNews("boxRight");
        }
    }

    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        if (Math.ceil(scrolled) === scrollable) {
            callNews();
        }
    });

}
callNews();

//WEATHER
function getWeather() {
    const apiKey = "9854a027c8469c859b0a7f822d6ff6fc";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=Prague";

    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather() {
        const response = await fetch(apiUrl + `&appid=${apiKey}`);
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
    }
    checkWeather();
}
getWeather();

//MOBILE
window.addEventListener('resize', function () {
    var screenWidth = window.innerWidth;
    if (screenWidth < 1250) {
        console.log("Screen width is under 1250px.");
    } else {
        console.log("Screen width is over 1250px.");
    }
});

/* document.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector('.container');
    var col1 = container.querySelector("colm1");
    var col2 = container.querySelector("colm2");
    var boxes = container.querySelectorAll("box");
  
    function rearrangeBoxes() {
      if (window.innerWidth < 1250) {
        boxes.forEach(function(box, index) {
          if (index % 2 == 0) {
            col1.appendChild(box);
          } else {
            col2.appendChild(box);
          }
        });
      } else {
        boxes.forEach(function(box, index) {
          if (index < 3) {
            col1.appendChild(box);
          } else {
            col2.appendChild(box);
          }
        });
      }
    }
  
    window.addEventListener('resize', function() {
      rearrangeBoxes();
    });
  
    rearrangeBoxes();
  });
   */