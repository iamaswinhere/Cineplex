import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Home = ({ searchQuery }) => {

    const searchValue = searchQuery;
    useEffect(() => {
        if (searchValue) {
            const fetchSearchedMovies = async () => {
                try {
                    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: '3defdeaf2668fb00e771941a5f0c68b3',
                            query: searchValue,
                        },
                    });
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching searched movies:', error);
                }
            };

            fetchSearchedMovies();
        }
    }, [searchValue]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        api_key: '3defdeaf2668fb00e771941a5f0c68b3',
                    },
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const divStyle = {
        backgroundImage: `url(${movies.length > 0 ? `https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}` : '...'})`,
        backgroundSize: 'cover',
        minHeight: '70vh',
        backgroundPosition: 'center',
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (movies.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                setMovies((prevMovies) => {
                    const newMovies = [...prevMovies];
                    const [firstMovie] = newMovies.splice(randomIndex, 1);
                    newMovies.unshift(firstMovie);
                    return newMovies;
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [movies]);


    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleCardClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    const [topRatedSeries, setTopRatedSeries] = useState([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/tv/top_rated', {
                    params: {
                        api_key: '3defdeaf2668fb00e771941a5f0c68b3',
                    },
                });
                setTopRatedSeries(response.data.results);
            } catch (error) {
                console.error('Error fetching series:', error);
            }
        };

        fetchSeries();
    }, []);

    return (
        <>
            <div style={{ backgroundColor: 'black' }}>
                <div className="home-section" style={divStyle}>
                    <div className="overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)' }}>

                        {/* Hero Section */}
                        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
                            <Row>
                                <Col md={6}>
                                    <h1 className="home-title text-white text-center">
                                        {movies.length > 0 ? movies[0].title : 'Welcome to Cineflix'}
                                    </h1>
                                    <p className="home-description text-white text-center">
                                        {movies.length > 0 ? movies[0].overview : 'Discover the latest movies and enjoy your time with Cineflix.'}
                                    </p>
                                </Col>
                                <Col md={6} className="d-none d-md-block">
                                    <Card className="movie-card mx-auto" style={{ backgroundColor: 'black', maxWidth: '45vh', maxHeight: '55vh', margin: '0 auto', animation: 'fadeIn 1s' }}>
                                        <Card.Img variant="top" src={movies.length > 0 ? `https://image.tmdb.org/t/p/w500${movies[0].backdrop_path}` : 'https://ideogram.ai/assets/progressive-image/balanced/response/3fGoHE9SSa-tgMYJNytoAg'} style={{ height: '50vh', width: '40vh' }} />
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <br />

            <Container fluid>
                <h4 className='mx-5 text-white'>Searched Movies</h4>
                <Row className="flex-nowrap overflow-auto">
                    {movies.map((movie) => (
                        <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
                            <Card className="movie-card" style={{ backgroundColor: 'black', animation: 'fadeIn 1s' }} onClick={() => handleCardClick(movie)}>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                <Card.Body>
                                    <Card.Title className="text-white">{movie.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

                {!searchValue && (
                    <>
                        <h4 className='mx-5 text-white'>Popular Movies</h4>
                        <Row className="flex-nowrap overflow-auto">
                            {movies.map((movie) => (
                                <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
                                    <Card className="movie-card" style={{ backgroundColor: 'black', animation: 'fadeIn 1s' }} onClick={() => handleCardClick(movie)}>
                                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                        <Card.Body>
                                            <Card.Title className="text-white">{movie.title}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}

                <br />
                <h4 className='mx-5 text-white'>Top Rated Series</h4>
                <Row className="flex-nowrap overflow-auto">
                    {topRatedSeries.map((series) => (
                        <Col key={series.id} xs={6} md={4} lg={3} className="mb-4">
                            <Card className="series-card" style={{ backgroundColor: 'black', animation: 'fadeIn 1s' }} onClick={() => handleCardClick(series)}>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} />
                                <Card.Body>
                                    <Card.Title className="text-white">{series.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <br />

                <h4 className='mx-5 text-white'>Korean Language Movies and Series</h4>
                <Row className="flex-nowrap overflow-auto">
                    {movies
                        .filter((movie) => movie.original_language === 'ko')
                        .map((movie) => (
                            <Col key={movie.id} xs={6} md={4} lg={3} className="mb-4">
                                <Card className="movie-card" style={{ backgroundColor: 'black', animation: 'fadeIn 1s' }} onClick={() => handleCardClick(movie)}>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                                    <Card.Body>
                                        <Card.Title className="text-white">{movie.title}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    {topRatedSeries
                        .filter((series) => series.original_language === 'ko')
                        .map((series) => (
                            <Col key={series.id} xs={6} md={4} lg={3} className="mb-4">
                                <Card className="series-card" style={{ backgroundColor: 'black', animation: 'fadeIn 1s' }} onClick={() => handleCardClick(series)}>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} />
                                    <Card.Body>
                                        <Card.Title className="text-white">{series.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>

                {selectedMovie && (
                    <div className="modal " style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content bg-dark">
                                <div className="modal-header">
                                    <h5 className="modal-title text-white text-center">{selectedMovie.title}</h5>
                                    <button type="button" className="close bg-dark text-white" onClick={handleCloseModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} style={{ width: '100%' }} />
                                    <p className='text-white text-center my-4'>{selectedMovie.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>



        </>
    );
};

Home.propTypes = {
    searchQuery: PropTypes.string.isRequired, // Ensure searchQuery is a string and required
};

export default Home;