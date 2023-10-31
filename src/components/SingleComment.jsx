import { Button, ListGroupItem } from "react-bootstrap";

const SingleComment = (props) => {
  const handleDelete = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/comments/" +
        props.singleReview._id,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNGE0ZmY2ZTNkZDAwMTQ5NWU0MzEiLCJpYXQiOjE2OTgzMTg5MjcsImV4cCI6MTY5OTUyODUyN30._xwcUTOVgkxDD63eq3PHcJQTanHrTR3UTMSpOr2S6Fs",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("commento eliminato");
          props.getComments();
        } else {
          throw new Error("problema durante la cancellazione");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div>
        {props.singleReview.rate} | {props.singleReview.comment}
      </div>
      <Button variant="danger" onClick={handleDelete}>
        Elimina
      </Button>
    </ListGroupItem>
  );
};

export default SingleComment;
