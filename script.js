document.addEventListener('DOMContentLoaded', () => {
    // Snow Effect
    const canvas = document.getElementById('snow');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const snowflakes = [];
    const count = 100;

    class Snowflake {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 1 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.y > height) {
                this.y = 0;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initSnow() {
        for (let i = 0; i < count; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let flake of snowflakes) {
            flake.update();
            flake.draw();
        }
        requestAnimationFrame(animate);
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    initSnow();
    animate();

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Typing Effect
    const texts = ["Full Stack Developer", "CEO of Avox Hosting", "System Administrator"];
    let textIndex = 0;
    let charIndex = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;

    function type() {
        if (textIndex === texts.length) {
            textIndex = 0;
        }
        currentText = texts[textIndex];

        if (isDeleting) {
            letter = currentText.slice(0, --charIndex);
        } else {
            letter = currentText.slice(0, ++charIndex);
        }

        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
            typingElement.textContent = letter;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && letter.length === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            textIndex++;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});
