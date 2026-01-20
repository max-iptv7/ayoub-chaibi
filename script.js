document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
        setTimeout(() => {
            follower.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
        }, 50);
    });

    const interactiveElements = document.querySelectorAll('a, button, .bento-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '80px';
            follower.style.height = '80px';
            follower.style.background = 'rgba(255, 51, 68, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.background = 'transparent';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Earth Scroll Interaction
    const earth = document.querySelector('.earth-container');
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const yMove = scrollPercent * 150 - 75; // Subtle Y movement
        const rotation = scrollPercent * 3.6; // Slight rotation shift

        if (earth) {
            earth.style.transform = `translateY(calc(-50% + ${yMove}px)) rotate(${rotation}deg)`;
        }
    });

    // Rocket & Boom Logic
    function launchRocket() {
        const rocket = document.getElementById('rocket');
        const boom = document.getElementById('boom');

        rocket.style.display = 'block';
        rocket.style.transition = 'none';

        // Starting Position: TOP LEFT
        rocket.style.top = '-20%';
        rocket.style.left = '-20%';
        rocket.style.transform = 'rotate(135deg) scale(1.5)';
        rocket.style.opacity = '1';

        // Trigger flight
        setTimeout(() => {
            rocket.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
            // Target Planet center
            rocket.style.top = '50%';
            rocket.style.left = '50%';
            rocket.style.transform = 'rotate(135deg) scale(0.2)';
            rocket.style.opacity = '0.5';
        }, 100);

        // Trigger Boom Impact
        setTimeout(() => {
            boom.classList.add('boom-animate');
            const planet = document.querySelector('.planet');
            planet.style.animation = 'none';
            void planet.offsetWidth;
            planet.style.animation = 'shake 0.8s ease-in-out';

            setTimeout(() => {
                boom.classList.remove('boom-animate');
                rocket.style.display = 'none';
                planet.style.animation = 'rotateEarth 60s linear infinite';
            }, 1000);
        }, 2100);
    }

    // Launch every 15 seconds
    setInterval(launchRocket, 15000);
    // Initial launch delay
    setTimeout(launchRocket, 5000);

    // Support Notification Logic
    const supportNotif = document.getElementById('supportNotif');
    const closeNotif = document.getElementById('closeNotif');

    setTimeout(() => {
        supportNotif.classList.add('active');
    }, 2000); // 2 second delay

    closeNotif.addEventListener('click', () => {
        supportNotif.classList.remove('active');
    });

    // Parallax logic for background blobs
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 30;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});
