import React, { useEffect, useState } from 'react'
import '../pages/admin.css'
import { addmovieApi } from '../services/allApi';

function Admin() {

    const [movies, setmovies] = useState({
        title: "",
        year: "",
        Image: ""
    })

    const [token, settoken] = useState('')

    useEffect(() => {
        settoken(sessionStorage.getItem("token"))
    }, [])


    //=====================================================================

    const handleadd = async (e) => {
        e.preventDefault();
        console.log('===get movies==')
        const { title, year, Image } = movies;
        if (!title || !year || !Image) {
            alert("please fill the form compleately")
        }
        else {
            const reqBody = new FormData();
            reqBody.append("title", title)
            reqBody.append("year", year)
            reqBody.append("Image", Image)

            const reqHeader = {
                "Content-Type": "multipart/formdata",
                "Authorization": `Bearer ${token}`
            }
            const result = await addmovieApi(reqBody, reqHeader)
            if (result.satus === 200) {
                alert("project added successfully")
            } else if (result.status === 406) {
                alert("Movie already exists.");
            } else {
                alert("Failed to add movie: ");
            }
        }
        console.log(setmovies)
    }


    //=====================================================================


    return (
        <>

            <div className="m-2">
                <div class="mt-5 d-flex justify-content-around">
                    <div style={{ width: "50%" }}>
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr className='text-center'>
                                    <th>Name</th>
                                    <th >Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center'>
                                    <td>Manjumal boys</td>
                                    <td><button style={{ backgroundColor: "transparent", color: "red" }}>Delete</button></td>
                                </tr>
                                <tr>
                                    <td>boys</td>
                                    <td>delete</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className='tt p-5 m-2'>
                        <div>
                            <h2>Add Movie</h2>
                            <div>
                                <input value={movies.title} onChange={((e) => setmovies({ ...movies, title: e.target.value }))} className='in mb-2' type="text" placeholder='Movie name' /><br></br>
                                <input value={movies.year} onChange={((e) => setmovies({ ...movies, year: e.target.value }))} className='in mb-2' type="number" placeholder='Year' /><br></br>
                                <input onChange={(e) => setmovies({ ...movies, Image: e.target.files[0] })} className='int mt-1' type="file" />
                            </div>
                            <button className='bt mt-3' onClick={handleadd}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Admin