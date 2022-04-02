import type { GenreResponseProps, MovieProps } from '../App';
import { useEffect, useState } from 'react';

import { Header } from './Header';
import { MovieCard } from './MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';

type ContentProps = {
	selectedGenreId: number;
	selectedGenre: GenreResponseProps;
};

export function Content({ selectedGenreId, selectedGenre }: ContentProps) {
	const [movies, setMovies] = useState<MovieProps[]>([]);

	useEffect(() => {
		api
			.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
			.then((response) => {
				setMovies(response.data);
			});
	}, [selectedGenreId]);

	return (
		<div className="container">
			<Header selectedGenre={selectedGenre} />

			<main>
				<div className="movies-list">
					{movies.map((movie) => (
						<MovieCard
							key={movie.imdbID}
							title={movie.Title}
							poster={movie.Poster}
							runtime={movie.Runtime}
							rating={movie.Ratings[0].Value}
						/>
					))}
				</div>
			</main>
		</div>
	);
}
