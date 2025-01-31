document.addEventListener('DOMContentLoaded', () => {
    // Main Navigation
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    const body = document.querySelector('body');
    const navItems = document.querySelectorAll('.nav__item a');
    const heroLinks = document.querySelectorAll('.hero__links'); // Select all hero links


    // let lastScrollPosition = window.scrollY;
    let lastScrollPosition = 0;
    const header = document.querySelector('.header');

    // Set initial state
    header.classList.add('visible', 'transparent');

    if (hamburger && nav && body) {
        // Toggle the menu when clicked
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open'); // Toggle 'X' animation
            nav.classList.toggle('nav--active'); // Show/hide nav
            body.classList.toggle('no-scroll'); // Prevent body scroll
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);

            // Toggle the active class on hero links
            heroLinks.forEach(link => {
                link.classList.toggle('active');
            });
        });
    }

    const currentPage = window.location.pathname.split('/').pop();
    console.log('Current page:', currentPage); // Debugging line

    // Add 'active' class to the link that matches the current page
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });


    //Adding header scroll
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition < 50) {
            // Ensure header is visible with a transparent background near the top
            header.classList.add('visible', 'transparent');
        } else if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down
            header.classList.remove('visible'); // Hide header
        } else {
            // Scrolling up
            header.classList.add('visible'); // Show header
    
            // Add white background if scrolled past a certain point
            if (currentScrollPosition > 100) {
                header.classList.remove('transparent');
            } else {
                header.classList.add('transparent'); // Make header transparent again
            }
        }
    
        lastScrollPosition = currentScrollPosition;
       
    });

   // Function to set the initial state based on aria-expanded
   const setInitialState = () => {
    const announcements = document.querySelectorAll('.announcements');
    announcements.forEach(announcement => {
        const isExpanded = announcement.getAttribute('aria-expanded') === 'true';
        const details = announcement.querySelector('.announcements__details');
        const closedIcon = announcement.querySelector('.announcements__closed');
        const openIcon = announcement.querySelector('.announcements__open');
        
        details.style.display = isExpanded ? 'block' : 'none';
        closedIcon.style.display = isExpanded ? 'none' : 'flex';
        openIcon.style.display = isExpanded ? 'inline-block' : 'none';
    });
};

// Toggle announcement visibility
const toggleAnnouncement = (event) => {
    const announcement = event.currentTarget.closest('.announcements');
    const isExpanded = announcement.getAttribute('aria-expanded') === 'true';
    
    announcement.setAttribute('aria-expanded', !isExpanded);
    const details = announcement.querySelector('.announcements__details');
    const closedIcon = announcement.querySelector('.announcements__closed');
    const openIcon = announcement.querySelector('.announcements__open');

    details.style.display = isExpanded ? 'none' : 'block';
    closedIcon.style.display = isExpanded ? 'flex' : 'none';
    openIcon.style.display = isExpanded ? 'none' : 'inline-block';
};

// Initialize the state on page load
setInitialState();

// Add click and keypress events for accessibility
const headers = document.querySelectorAll('.announcements__header');
headers.forEach(header => {
    header.addEventListener('click', toggleAnnouncement);
    header.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleAnnouncement(event);
        }
    });
});
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach((accordion) => {
        const header = accordion.querySelector('.accordion__header');

        header.addEventListener('click', () => {
            // Close any open accordion sections
            accordions.forEach((acc) => {
                if (acc !== accordion) {
                    acc.classList.remove('active');
                }
            });

            // Toggle the clicked accordion
            accordion.classList.toggle('active');
        });
    });
    //Slider
    const track = document.querySelector('.image-slider__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.image-slider__control--next');
    const prevButton = document.querySelector('.image-slider__control--prev');
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    //Move to the selcted slide
    const moveToSlide = (index) => {
        track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
        currentIndex = index;
    };

    //Show the next slide
    nextButton.addEventListener('click', () => {
        if (currentIndex === slides.length - 1) {
            moveToSlide(0); //Loop back to start
        } else {
            moveToSlide(currentIndex + 1);
        }
    });

    // Show the prev slide
    prevButton.addEventListener('click', () => {
        if (currentIndex === 0) {
            moveToSlide(slides.length -1);
        }else {
            moveToSlide(currentIndex -1);
        }
    });

    function setupSessionSelector(selectId, sessionContainerId) {
        const sessionSelect = document.getElementById(selectId);
        const sessionContainers = document.querySelectorAll(`#${sessionContainerId} .session-info__dates`);

        sessionSelect.addEventListener('change', (event) => {
            const selectedSession = event.target.value;

            // Hide all session lists
            sessionContainers.forEach(container => {
                container.setAttribute('aria-hidden', 'true');
                container.style.display = 'none';
            });

            // Show the selected session's dates
            if (selectedSession) {
                const selectedDates = document.querySelector(`#${sessionContainerId} [data-session="${selectedSession}"]`);
                if (selectedDates) {
                    selectedDates.setAttribute('aria-hidden', 'false');
                    selectedDates.style.display = 'block';
                }
            }
        });
    }

    setupSessionSelector('session-selection', 'session-dates');
    setupSessionSelector('kids-session-selection', 'session-dates');
});

document.addEventListener('DOMContentLoaded', () => {
    // Fetch weather data
    async function fetchWeatherData() {
     const apiKey = '07d9b4d8-5082-4a41-9f46-e394313327f7';
     const stationId = '162786';
     const apiUrl = `https://swd.weatherflow.com/swd/rest/observations/station/${stationId}?token=${apiKey}`;
 
     try {
         const response = await fetch(apiUrl);
         const data = await response.json();
 
         // Extract temperature and wind speed
         const temperature = data.obs[0].air_temperature; // Temperature in Celsius
         const windSpeed = data.obs[0].wind_avg; // Wind speed in m/s
 
         // Convert temperature to Fahrenheit
         const temperatureF = (temperature * 9) / 5 + 32;
 
         // Convert wind speed to knots
         const windSpeedKnots = (windSpeed * 1.94384).toFixed(1);
 
         // Update the DOM
         document.getElementById('temperature').innerHTML = `${Math.round(temperatureF)}&deg;`;
         document.getElementById('wind-speed').innerHTML = `${windSpeedKnots}KT`;
 
         // Update the weather icon (you can customize this logic)
         const weatherIcon = document.getElementById('weather-icon');
         if (data.obs[0].precip_total > 0) {
             weatherIcon.src = 'imgs/misc/Rain.png';
             weatherIcon.alt = 'Rain icon';
         } else if (data.obs[0].solar_radiation > 800) {
             weatherIcon.src = 'imgs/misc/Sunny.png';
             weatherIcon.alt = 'Sunny icon';
         } else {
             weatherIcon.src = 'imgs/misc/Partly-cloudy.png';
             weatherIcon.alt = 'Partly cloudy icon';
         }
     } catch (error) {
         console.error('Error fetching weather data:', error);
     }
 }
 
 fetchWeatherData();
 
 // Optionally, refresh weather data every 10 minutes
 setInterval(fetchWeatherData, 600000);
 });

 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});