
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function People() {
  const [people, setPeople] = useState([])
  const nums = new Array(10).fill(1).map((ele, index) => index + 1);
  let mediaType = 'person';

  async function getTrending(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&page=${page}`)
    setPeople(data.results)
  }

  useEffect(() => {
    getTrending(1)
  }, [])

  return <>
    <div className='wow rubberBand my-4'>
      <div className="row gy-3 ">
        {people.map((item, index) =>
          <div key={index} className='col-md-3 '>
            <Link className='text-decoration-none  text-white' to={`/MovieDetails/${item.id}/${mediaType}`}>
              <div className='position-relative  '>
                {item.profile_path ? < img src={'https://image.tmdb.org/t/p/w500' + item.profile_path}
                  alt="imageMovie" className='w-100 rounded-4 ' /> : ""}
                {item.title ? <h3 className='h6 text-center text-white py-1'>{item.title} </h3> : ""}
                {item.name ? <h3 className='h6 text-center text-white py-1'>{item.name} </h3> : ""}
               </div>
            </Link>
          </div>

        )}
      </div>
    </div>
    <nav className='py-5'>
      <ul className='pagination pagination-sm d-flex justify-content-center'>
        {nums.map((page) =>
          <li key={page} onClick={() => getTrending(page)} className='page-item p-1'>
            <Link className='page-link bg-transparent text-white'>{page}</Link>
          </li>
        )}

      </ul>
    </nav>

  </>
}
