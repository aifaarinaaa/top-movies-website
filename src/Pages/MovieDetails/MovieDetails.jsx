import React, { useEffect, useState } from "react";
import "./MovieDetailsStyles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CastList from "../../components/CastList/CastList";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  const fetchId = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setMovie(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchId();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      <Header />
      <div className="movie">
        <div className="movie__intro">
          <img
            className="movie__backdrop"
            src={`https://image.tmdb.org/t/p/original${
              currentMovieDetail ? currentMovieDetail.backdrop_path : ""
            }`}
            alt="movie details"
          />
        </div>
        <div className="movie__detail">
          <div className="movie__detailLeft">
            <div className="movie__posterBox">
              <img
                className="movie__poster"
                src={`https://image.tmdb.org/t/p/original${
                  currentMovieDetail ? currentMovieDetail.poster_path : ""
                }`}
                alt="movie poster"
              />
            </div>
          </div>
          <div className="movie__detailRight">
            <div className="movie__detailRightTop">
              <div className="movie__name">
                {currentMovieDetail ? currentMovieDetail.original_title : ""}
              </div>
              <div className="movie__tagline">
                {currentMovieDetail ? currentMovieDetail.tagline : ""}
              </div>
              <div className="movie__rating">
                {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
                <i class="fas fa-star" />
                <span className="movie__voteCount">
                  {currentMovieDetail
                    ? "(" + currentMovieDetail.vote_count + ") votes"
                    : ""}
                </span>
              </div>
              <div className="movie__runtime">
                {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
              </div>
              <div className="movie__releaseDate">
                {currentMovieDetail
                  ? "Release date: " + currentMovieDetail.release_date
                  : ""}
              </div>
              <div className="movie__genres">
                {currentMovieDetail && currentMovieDetail.genres
                  ? currentMovieDetail.genres.map((genre) => (
                      <>
                        <span className="movie__genre" id={genre.id}>
                          {genre.name}
                        </span>
                      </>
                    ))
                  : ""}
              </div>
            </div>
            <div className="movie__detailRightBottom">
              <div className="synopsisText">Overview</div>
              <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
            </div>
            <CastList />
          </div>
        </div>
        <div className="movie__links">
          <h1 className="movie__heading">Related Links</h1>
          {currentMovieDetail && currentMovieDetail.homepage && (
            <a
              href={currentMovieDetail.homepage}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </a>
          )}
          {currentMovieDetail && currentMovieDetail.imdb_id && (
            <a
              href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </a>
          )}
        </div>
        <div className="movie__heading">Production companies</div>
        <div className="movie__production">
          {currentMovieDetail &&
            currentMovieDetail.production_companies &&
            currentMovieDetail.production_companies.map((company) => (
              <>
                {company.logo_path && (
                  <span className="productionCompanyImage">
                    <img
                      className="movie__productionComapany"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                      alt="movie production"
                    />
                    <span>{company.name}</span>
                  </span>
                )}
              </>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Movie;
