import React from "react";
import { CardContent } from "@material-ui/core";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Movie } from "../../type";
import { img_300, unavailable } from "../../Utilities/config";
import "./MoviesStyles.css";
import Footer from "../../components/Footer/Footer";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { Link } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Movies = () => {
  const [content, setContent] = useState<Movie[]>([]);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [totalPages, setTotalPages] = useState(0);
  const fetchTopRated = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    // window.scroll(0, 0);
    fetchTopRated();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="movies-container">
      <Header />
      <Container maxWidth="xl">
        <div className="movies-grid">
          {content.length > 0 && (
            <Box
              width="300px"
              sx={{
                display: "flex",
                flexDirection: "row",

                width: "100%",
                flexGrow: 1,
                alignContent: "flex-start",
              }}
            >
              <Grid2
                container
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="center"
              >
                {content.map((c) => (
                  <Card
                    sx={{ width: 200, height: 350, mx: 5, my: 3 }}
                    onClick={handleOpen}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/moviedetails/${c.id}`}
                    >
                      <CardMedia
                        component="img"
                        image={
                          c.poster_path
                            ? `${img_300}/${c.poster_path}`
                            : unavailable
                        }
                        alt={c.title}
                      />
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="secondary"
                          gutterBottom
                          onClick={handleOpen}
                          textAlign="center"
                        >
                          {c.title}
                        </Typography>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </Grid2>
            </Box>
          )}
        </div>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <CustomPagination setPage={setPage} totalPages={totalPages} />
      <Footer />
    </div>
  );
};

export default Movies;
