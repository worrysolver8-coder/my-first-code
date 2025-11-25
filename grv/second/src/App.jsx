import React, { useEffect, useState } from 'react';

function App() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="app-container">
            <nav className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
                <div className="logo">A.D.</div>
                <div className="links">
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            <header className="hero">
                <div className="hero-content">
                    <h1 className="fade-in" style={{ animationDelay: '0.2s' }}>
                        Designing <br />
                        <span className="highlight">Emotions</span>
                    </h1>
                    <p className="fade-in" style={{ animationDelay: '0.4s' }}>
                        Crafting digital experiences that resonate.
                    </p>
                </div>
                <div className="hero-background"></div>
            </header>

            <section id="work" className="section work">
                <h2 className="section-title">Selected Works</h2>
                <div className="gallery">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="gallery-item glass">
                            <div className="item-image-placeholder"></div>
                            <div className="item-info">
                                <h3>Project {item}</h3>
                                <p>Digital Art / Web Design</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="about" className="section about">
                <div className="about-content glass">
                    <h2>About Me</h2>
                    <p>
                        I am a creative director focused on emotional design.
                        I believe that every pixel should tell a story.
                    </p>
                </div>
            </section>

            <footer id="contact" className="footer">
                <h2>Let's Create Together</h2>
                <p>hello@example.com</p>
            </footer>
        </div>
    );
}

export default App;
