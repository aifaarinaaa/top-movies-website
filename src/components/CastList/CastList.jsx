import { useState, useEffect } from "react";
import axios from "axios";
import { img_300, unavailable } from "../../Utilities/config";
import "./CastList.Styles.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const CastList = (props) => {
  const [casts, setCasts] = useState([]);
  const fetchCasts = async () => {
    const { data } = await axios.get(
      `
      https://api.themoviedb.org/3/credit/{credit_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCasts(data.media);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchCasts();
    // eslint-disable-next-line
  }, [casts]);

  //   useEffect(() => {
  //     const getCredits = async () => {
  //       const res = await tmdbApi.credits(category, props.id);
  //       setCasts(res.cast.slice(0, 5));
  //     };
  //     getCredits();
  //   }, [category, props.id]);
  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts__item">
          <div
            className="casts__item__img"

            // style={{
            //     backgroundImage={
            //         item.poster_path
            //         ? `${img_300}/${c.poster_path}`
            //         : unavailable
            //       }
            //       alt={item.title}
            //     }}
          >
            <Card sx={{ width: 200, height: 350, mx: 5, my: 3 }}>
              {" "}
              <CardMedia
                component="img"
                image={
                  item.poster_path
                    ? `${img_300}/${item.poster_path}`
                    : unavailable
                }
                alt={item.title}
              />
            </Card>
          </div>

          <p className="casts__item__name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
