import requests from "./requests";

export const getServerSideProps = async () => {
  const [topRated] = await Promise.all([
    fetch(requests.fetchTopRated).then((res) => res.json()),
  ]);

  return {
    props: {
      topRated: topRated.results,
    },
  };
};
