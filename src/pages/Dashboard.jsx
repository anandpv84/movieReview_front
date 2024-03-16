import React, { useEffect, useState } from 'react'
import '../pages/dash.css'
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Button, Form, Card } from 'react-bootstrap';
import { allmovieApi, dashboardApi } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';


function Dashboard() {

    const navigate = useNavigate()

    //---------------------------------------------------------------=
    const [allmovies, setallmovies] = useState([])

    const getallmovies = async () => {
        const result = await allmovieApi();
        console.log(result)
        setallmovies(result.data)
    }
    useEffect(() => {
        getallmovies();
    }, [])


    //-------------------------------------------------------------------------------------

    useEffect(() => {
        if (sessionStorage.getItem("existinguser")) {
            const existinguserdata = JSON.parse(sessionStorage.getItem("existinguser"))
            console.log(existinguserdata)
            setusername(existinguserdata.username)
            //================================================

        }
    }, [])

    //-------------------------------------------------------------------------------------

    const [username, setusername] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("existinguser")) {
            const existinguserdata = JSON.parse(sessionStorage.getItem("existinguser"))
            console.log(existinguserdata)
            setusername(existinguserdata.username)

        }
    }, [])

    //-------------------------------------------------------------------------------------

    const handlelogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("existinguser");
        console.log("===logout===")
        navigate('/')
    }

    //-------------------------------------------------------------------------------------

    const [clicked, setclicked] = useState(false)
    const [starts, setstars] = useState(1)
    const [review, setreview] = useState("")
    const [reviewss, setreviewss] = useState([])

    const onMouseOver = (rating) => {
        if (clicked) return;
        [...Array(rating)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace('far', 'fas')
        })
    }
    const onMouseOut = (rating) => {
        if (clicked) return;
        [...Array(rating)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace('fas', 'far')
        })
    }
    const onClick = (rating) => {
        setclicked(true)
        setstars(rating);

        //reset stars
        [...Array(5)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace('fas', 'far')
        });
        //highlight stars
        [...Array(rating)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace('far', 'fas')
        })

    }
    const resetForm = (e) => {
        e.preventDefault();
        //reset stars
        [...Array(5)].map((x, i) => {
            document.querySelector(`#star-${i + 1}`).classList.replace('fas', 'far')
        });
        //reset states
        setstars(1)
        setreview('')
        setclicked(false)
    }


    const submitReview = (e) => {
        e.preventDefault();

        const newreview = {
            rating: starts,
            description: review
        }

        setreviewss([...reviewss, newreview])

        resetForm(e);
    }


    const deletereview = (e, index) => {
        e.preventDefault();

        const clone = [...reviewss];
        const newState = clone.filter((x, i) => index !== i)
        setreviewss(newState)
    }



    return (
        <>

            <div className='p-5 pt-1 bgc'>
                <div className='m-2 d-flex justify-content-between'>
                    <div>
                        <Link to={'/adminlogin'} style={{ textDecoration: "none", color: "black" }}><h4>LETAST MOVIES</h4></Link>
                    </div>
                    <div>
                        <button onClick={handlelogout} className='log'>
                            <span>LOGOUT</span>
                            <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0" />
                            </svg>
                        </button>

                    </div>
                </div>



                <div class="row">
                    {
                        allmovies?.length > 0 ?
                            allmovies.map((item) => (


                                <div class="col mb-4">
                                    <div class="card" style={{ width: "20rem" }}>
                                        <img height={'150px'} src={`${BASE_URL}/uploads/${item.Image}`} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <p class="card-text">{item.title}<span className=''>{item.year}</span></p>
                                        </div>

                                        <Container class=" justify-content-start align-items-start d-flex">
                                            <Col>
                                                <Row>
                                                    <Col className='mb-2'>
                                                        {[...Array(5)].map((s, i) => {
                                                            return (<i key={i} class='me-2 far fa-star'
                                                                onMouseOver={(e) => onMouseOver(i + 1)}
                                                                onMouseOut={(e) => onMouseOut(i + 1)}
                                                                onClick={e => onClick(i + 1)}
                                                                id={`star-${i + 1}`} style={{ cursor: "pointer" }} />
                                                            )
                                                        })

                                                        }
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col className='mb-2'>
                                                        <Form.Group>
                                                            <Form.Control as="textarea" rows={3} value={review}
                                                                onChange={e => setreview(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col className='mb-2'>
                                                        <Button className='typ' onClick={e => resetForm(e)} variant='warning'>Reset</Button>{" "}
                                                        <Button className='typ' onClick={e => submitReview(e)} disabled={review === ""} variant='success'>Submit</Button>
                                                    </Col>
                                                </Row>



                                            </Col>
                                        </Container>


                                        <div class="card-body overflow-auto">
                                            <div className="comment-section">
                                                <Row>
                                                    <Col className='mb-2'>
                                                        {reviewss.map((r, rindex) => {
                                                            return (<Card className='mb-2' key={rindex}>
                                                                <Card.Body className='p-1'>
                                                                    <p className='p-0 m-0'>{username} :  {[...Array(r.rating)].map((s, sindex) => {
                                                                        return <i key={sindex} className='me-1 fas fa-star text-warning'></i>
                                                                    })}</p>

                                                                    <p className='m-0 p-0'>{r.description}</p>
                                                                </Card.Body>
                                                                <Card.Footer className='p-0 pe-2 d-flex justify-content-end' style={{ backgroundColor: "white", border: "none" }}>
                                                                    <button onClick={e => deletereview(e, rindex)} className='boton'>Delete</button>
                                                                </Card.Footer>
                                                            </Card>);

                                                        })}
                                                    </Col>
                                                </Row>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )) :
                            <p>No movies available</p>
                    }

                </div>





            </div>


        </>
    )
}

export default Dashboard