import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
  let { id, mediaType } = useParams();
  const [details, setDetails] = useState({})

  async function getTrending(id, mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f597813c136fdbe4ff8e3e2976da14ad`)
    setDetails(data)
  }

  useEffect(() => {
    getTrending(id, mediaType)

  }, [])

  return <>
    <div className='wow  fadeInDown'>
      <div className="row shadow-lg mt-5 text-center ">
        <div className="col-md-3">
          {details.poster_path ?
            <img src={'https://image.tmdb.org/t/p/w500' + details.poster_path} alt="imageMovie" className='w-100 rounded-4 ' />
            :
            <img src={'https://image.tmdb.org/t/p/w500' + details.profile_path} alt="imageMovie" className='w-100 rounded-4 ' />
          }
        </div>
        <div className="col-md-9 px-5 py-5">
          <h2 className=' text-center m-auto mb-4'>{details.title} {details.name}</h2>
          <p className='text-muted'>{details.overview} </p>
          {details?.place_of_birth ? <p className='text-muted'>Place Of Birth : {details.place_of_birth} </p> : ""}
          {details?.vote_average ?
            <h4 className='text-muted'>Vote Average : {details.vote_average.toFixed(1)}
              <i className='ms-2 fas fa fa-star text-warning'></i>
            </h4> : ""}

          {details.vote_count ? <h4 className='text-muted'>Vote Count : {details.vote_count} </h4> : ""}
          {details.birthday ? <p className='text-muted'>Birthday : {details.birthday} </p> : ""}
          {details.popularity ? <p className='text-muted'>Popularity : {details.popularity.toFixed(1)} </p> : ""}
        </div>
      </div>
    </div>
  </>
}
