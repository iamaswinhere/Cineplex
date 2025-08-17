import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Card as BootstrapCard, Modal, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Home = ({ searchQuery }) => {
    const [movies, setMovies] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);

    useEffect(() => {
        const fetchContent = async (endpoint, setter, isHero = false) => {
            try {
                const params = { api_key: '3defdeaf2668fb00e771941a5f0c68b3', ...(searchQuery && { query: searchQuery }) };
                const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, { params });
                const results = response.data.results.filter(m => m.backdrop_path && m.poster_path);
                setter(results);
                if (isHero && results.length > 0) {
                    setHeroMovie(results[0]);
                }
            } catch (error) {
                console.error(`Error fetching ${endpoint} data:`, error);
            }
        };

        const searchEndpoint = searchQuery ? 'search/multi' : 'movie/popular';
        fetchContent(searchEndpoint, setMovies, !searchQuery);
        if (!searchQuery) {
            fetchContent('tv/top_rated', setTopRatedSeries);
            fetchContent('trending/movie/week', setTrendingMovies);
            fetchContent('movie/upcoming', setUpcomingMovies);
            fetchContent('discover/movie?with_genres=28', setActionMovies); // Genre ID for Action
            fetchContent('discover/movie?with_genres=35', setComedyMovies); // Genre ID for Comedy
        } else {
             setTopRatedSeries([]);
             setTrendingMovies([]);
             setUpcomingMovies([]);
             setActionMovies([]);
             setComedyMovies([]);
        }
    }, [searchQuery]);
    
    const handleCardClick = (item) => setSelectedItem(item);
    const handleCloseModal = () => setSelectedItem(null);

    const divStyle = heroMovie ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})` } : { backgroundColor: '#111' };

    return (
        <>
            {!searchQuery && heroMovie && (
                <div className="home-section" style={divStyle}>
                    <div className="overlay"></div>
                    <div className="hero-content">
                        <motion.h1 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                          className="home-title text-white">
                            {heroMovie.title || heroMovie.name}
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="home-description text-white">
                            {heroMovie.overview}
                        </motion.p>
                    </div>
                </div>
            )}

            <div className={`movie-grid-container ${searchQuery ? 'search-active' : ''}`}>
                {searchQuery ? (
                    <>
                        <h3 className="section-title">Search Results</h3>
                        <div className="movie-row horizontal-scroll">
                            {movies.map((item) => (
                                <div key={item.id} className="movie-col">
                                    <BootstrapCard className="card" onClick={() => handleCardClick(item)}>
                                        <BootstrapCard.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} />
                                        <div className="card-info">
                                            <h5 className="card-title">{item.title || item.name}</h5>
                                        </div>
                                    </BootstrapCard>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="section-title">Popular Movies</h3>
                        <div className="movie-row horizontal-scroll">
                            {movies.map((item) => (
                                <div key={item.id} className="movie-col">
                                    <BootstrapCard className="card" onClick={() => handleCardClick(item)}>
                                        <BootstrapCard.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} />
                                        <div className="card-info">
                                            <h5 className="card-title">{item.title || item.name}</h5>
                                        </div>
                                    </BootstrapCard>
                                </div>
                            ))}
                        </div>

                        {trendingMovies.length > 0 && (
                            <>
                                <h3 className="section-title mt-5">Trending This Week</h3>
                                <div className="movie-row horizontal-scroll">
                                    {trendingMovies.map((item) => (
                                        <div key={item.id} className="movie-col">
                                            <BootstrapCard className="card" onClick={() => handleCardClick(item)}>
                                                <BootstrapCard.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} />
                                                <div className="card-info">
                                                    <h5 className="card-title">{item.title || item.name}</h5>
                                                </div>
                                            </BootstrapCard>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {upcomingMovies.length > 0 && (
                            <>
                                <h3 className="section-title mt-5">Upcoming Movies</h3>
                                <div className="movie-row horizontal-scroll">
                                    {upcomingMovies.map((item) => (
                                        <div key={item.id} className="movie-col">
                                            <BootstrapCard className="card" onClick={() => handleCardClick(item)}>
                                                <BootstrapCard.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} />
                                                <div className="card-info">
                                                    <h5 className="card-title">{item.title || item.name}</h5>
                                                </div>
                                            </BootstrapCard>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {actionMovies.length > 0 && (
                            <>
                                <h3 className="section-title mt-5">Action Movies</h3>
                                <div className="movie-row horizontal-scroll">
                                    {actionMovies.map((item) => (
                                        <div key={item.id} className="movie-col">
                                            <BootstrapCard className="card" onClick={() => handleCardClick(item)}>
                                                <BootstrapCard.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} />
                                                <div className="card-info">
                                                    <h5 className="card-title">{item.title || item.name}</h5>
                                                </div>
                                            </BootstrapCard>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {comedyMovies.length > 0 && (
                            <>
                                <h3 className="section-title mt-5">Comedy Movies</h3>
                                <div className="movie-row horizontal-scroll">
                                    {comedyMovies.map((item) => (
                                        <div key={item.id} className="movie-col">
                                            <BootstrapCard className="card" onClick={() => handleCardClick(item)}>
                                                <BootstrapCard.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} />
                                                <div className="card-info">
                                                    <h5 className="card-title">{item.title || item.name}</h5>
                                                </div>
                                            </BootstrapCard>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {topRatedSeries.length > 0 && (
                            <>
                                <h3 className="section-title mt-5">Top Rated Series</h3>
                                <div className="movie-row horizontal-scroll">
                                    {topRatedSeries.map((item) => (
                                        <div key={item.id} className="movie-col">
                                            <BootstrapCard className="card" onClick={() => handleCardClick(item)}>
                                                <BootstrapCard.Img variant="top" src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`} />
                                                <div className="card-info">
                                                    <h5 className="card-title">{item.title || item.name}</h5>
                                                </div>
                                            </BootstrapCard>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>

            {selectedItem && (
                <Modal show={!!selectedItem} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedItem.title || selectedItem.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={4}>
                                <img src={`https://image.tmdb.org/t/p/w500${selectedItem.poster_path || selectedItem.backdrop_path}`} alt={selectedItem.title || selectedItem.name} className="img-fluid" />
                            </Col>
                            <Col md={8}>
                                <p>{selectedItem.overview}</p>
                                <p><strong>Release Date:</strong> {selectedItem.release_date || selectedItem.first_air_date}</p>
                                <p><strong>Rating:</strong> {selectedItem.vote_average ? selectedItem.vote_average.toFixed(1) : 'N/A'} / 10</p>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

Home.propTypes = {
    searchQuery: PropTypes.string.isRequired,
};

export default Home;