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

    // Announcements Modal
    const announcement = document.querySelector('.announcements');

    if (announcement) {
        const header = announcement.querySelector('.announcements__header');
        const details = announcement.querySelector('.announcements__details');
        const closedIcon = header.querySelector('.announcements__closed');
        const openIcon = header.querySelector('.announcements__open');

        // Function to set the initial state based on aria-expanded
        function setInitialState() {
            const isExpanded = announcement.getAttribute('aria-expanded') === 'true';
            details.style.display = isExpanded ? 'block' : 'none';
            closedIcon.style.display = isExpanded ? 'none' : 'flex';
            openIcon.style.display = isExpanded ? 'inline-block' : 'none';
        }

        // Toggle announcement visibility
        function toggleAnnouncement() {
            const isExpanded = announcement.getAttribute('aria-expanded') === 'true';
            announcement.setAttribute('aria-expanded', !isExpanded);

            details.style.display = isExpanded ? 'none' : 'block';
            closedIcon.style.display = isExpanded ? 'flex' : 'none';
            openIcon.style.display = isExpanded ? 'none' : 'inline-block';
        }

        // Initialize the state on page load
        setInitialState();

        // Add click and keypress events for accessibility
        header.addEventListener('click', toggleAnnouncement);
        header.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent scrolling on space press
                toggleAnnouncement();
            }
        });
    }
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

    //Drop Down menu for session info
    const sessionSelection = document.getElementById('session-selection');
    const dateLists = document.querySelectorAll('.session-info__dates');

    sessionSelection.addEventListener('change', () => {
        const selectedSession = sessionSelection.value;

        // Hide all date lists
        dateLists.forEach(list => {
            list.style.display = 'none';
            list.setAttribute('aria-hidden', 'true');
        });

        // Show the relevant date list if a session is selected
        if (selectedSession) {
            const selectedList = document.querySelector(`.session-info__dates[data-session="${selectedSession}"]`);
            if (selectedList) {
                selectedList.style.display = 'block';
                selectedList.setAttribute('aria-hidden', 'false');
            }
        }
    });
});