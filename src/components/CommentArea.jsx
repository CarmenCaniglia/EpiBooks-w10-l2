import { useEffect, useState } from 'react'
import CommentsList from './CommentsList'
import AddComment from './AddComment'

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  // }
  const [comments, setComments] = useState([])

  // lo commento perchè all'avvio non ci sarà mai più bisogno di invocare getComments!
  // lo devo fare ora OGNI VOLTA che cambio il libro selezionato...
  // componentDidMount = () => {
  //   // viene eseguito una volta sola, all'avvio del componente!
  //   // ora faremo la fetch per recuperare i commenti
  //   if (this.props.bookId) {
  //     this.getComments()
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // dobbiamo riconoscere ogni cambio di asin selezionato
  //   if (prevProps.bookId !== this.props.bookId) {
  //     // è cambiato il bookId, quindi il libro selezionato!
  //     // qua facciamo la fetch
  //     this.getComments()
  //   }
  // }

  useEffect(()=>{
    if (props.bookId){
      getComments()
    }
  },[props.bookId]);

  const getComments = () => {
    fetch(
      'https://striveschool-api.herokuapp.com/api/comments/' +
        props.bookId,
      {
        headers: {
          Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNGE0ZmY2ZTNkZDAwMTQ5NWU0MzEiLCJpYXQiOjE2OTgzMTg5MjcsImV4cCI6MTY5OTUyODUyN30._xwcUTOVgkxDD63eq3PHcJQTanHrTR3UTMSpOr2S6Fs",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('errore nel recupero dei commenti')
        }
      })
      .then((arrayOfComments) => {
        console.log(arrayOfComments);
        setComments(arrayOfComments)
      })
      .catch((err) => {
        console.log('error', err)
      })
      
  }

  
    return (
      <div>
        <div>
          <CommentsList reviews={comments} />
        </div>
        <div>
          <AddComment bookId={props.bookId} />
        </div>
      </div>
    )
  
}

export default CommentArea
