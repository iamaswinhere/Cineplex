import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Home = () => {
    const movieBackgrounds = [
        'https://ideogram.ai/assets/image/lossless/response/PcdhGrmaTfOK1sW6BDKrwg',
        'https://ideogram.ai/assets/image/lossless/response/PcdhGrmaTfOK1sW6BDKrwg',
        'https://ideogram.ai/assets/image/lossless/response/PcdhGrmaTfOK1sW6BDKrwg'
    ];

    const [background, setBackground] = useState(movieBackgrounds[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBackground(prevBackground => {
                const currentIndex = movieBackgrounds.indexOf(prevBackground);
                const nextIndex = (currentIndex + 1) % movieBackgrounds.length;
                return movieBackgrounds[nextIndex];
            });
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    const divStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        minHeight: '70vh',
        backgroundPosition: 'center',
    };
    return (
        <div className="home-section" style={divStyle}>
            <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
                <Row className="align-items-center justify-content-center text-center">
                    <Col md={6}>
                        <h1 className="home-title text-white">Welcome to Cineflix</h1>
                        <p className="home-description text-white">Discover the latest movies and enjoy your time with Cineflix.</p>
                        <Button variant="primary" className="home-button">Get Started</Button>
                    </Col>
                    <Col md={6} className="d-none d-md-block">
                        <Card className="movie-card" style={{ backgroundColor: 'black', maxWidth: '40vh', maxHeight: '50vh', margin: '0 auto' }}>
                            <Card.Img variant="top" src="https://ideogram.ai/assets/progressive-image/balanced/response/3fGoHE9SSa-tgMYJNytoAg" style={{ height: '50vh', width: '40vh' }} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;