import {  useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddComment = (props) => {
  // state = {
  //   commentObject: {
  //     comment: '',
  //     rate: '1',
  //     elementId: this.props.bookId,
  //   },
  // }
  const [commentObject, setCommentObject] = useState ({
    comment: '',
    rate: '1',
    elementId:props.bookId,
  })

  const sendNewReview = async (e) => {
    e.preventDefault()
    try {
      const updatedCommentObject = { ...commentObject, elementId: props.bookId };
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(updatedCommentObject),
          headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNGE0ZmY2ZTNkZDAwMTQ5NWU0MzEiLCJpYXQiOjE2OTgzMTg5MjcsImV4cCI6MTY5OTUyODUyN30._xwcUTOVgkxDD63eq3PHcJQTanHrTR3UTMSpOr2S6Fs",
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.ok) {
        // il commento è stato inviato!
        alert('commento salvato!')
           setCommentObject({
          comment: '',
          rate: '1',
          elementId: props.bookId,
        });
      } else {
        throw new Error('errore nel salvataggio del commento')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  
    return (
      <Form onSubmit={sendNewReview}>
        <Form.Group className="mb-1 mt-4">
          <Form.Label>Commento</Form.Label>
          <Form.Control
            type="text"
            value={commentObject.comment}
            onChange={(e) => 
              setCommentObject({
                ...commentObject, comment: e.target.value
              })
            }
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select
            aria-label="comment rating"
            value={commentObject.rate}
            onChange={(e) => setCommentObject({...commentObject, rate: e.target.value})
             }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    )
  
}

export default AddComment
