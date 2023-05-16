import React from 'react';
import { Link } from 'react-router-dom';

export default function MediaItem({ item }) {
	return (
		< >

			<div className='col-md-3 col-sm-6 col-lg-2 '>
				<Link className='text-decoration-none  text-white' to={`/MovieDetails/${item.id}/${item.media_type}`}>
					<div className='position-relative  '>
						{item.poster_path ?
							<img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} alt="imageMovie" className='w-100 rounded-4 ' />
							:
							<img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} alt="imageMovie" className='w-100 rounded-4 ' />
						}
						<h3 className='h6 text-center text-white  py-1'>{item.title} {item.name}</h3>
						{item.vote_average ? <div className='vote position-absolute top-0 end-0 p-1 opacity-75 '>{item.vote_average.toFixed(1)}</div> : " "}
					</div>
				</Link>
			</div>

		</>
	)
}
