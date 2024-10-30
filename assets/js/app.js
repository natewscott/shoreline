document.addEventListener('DOMContentLoaded', () => {
    // Main Navigation
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    const body = document.querySelector('body');
    const navItems = document.querySelectorAll('.nav__item a');

    let lastScrollPosition = window.scrollY;
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

        // Check scroll direction
        if (currentScrollPosition > lastScrollPosition) {
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
});
