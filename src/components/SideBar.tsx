import { useEffect, useState } from 'react';
import type { GenreResponseProps } from '../App';
import { api } from '../services/api';

import { Button } from './Button';

import '../styles/sidebar.scss';

type SidebarProps = {
	setSelectedGenre: React.Dispatch<React.SetStateAction<GenreResponseProps>>;
	selectedGenreId: number;
	setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
};

export const SideBar = ({
	setSelectedGenre,
	selectedGenreId,
	setSelectedGenreId,
}: SidebarProps) => {
	const [genres, setGenres] = useState<GenreResponseProps[]>([]);

	useEffect(() => {
		api.get<GenreResponseProps[]>('genres').then((response) => {
			setGenres(response.data);
		});
	}, []);

	useEffect(() => {
		api
			.get<GenreResponseProps>(`genres/${selectedGenreId}`)
			.then((response) => {
				setSelectedGenre(response.data);
			});
	}, [selectedGenreId]);

	function handleClickButton(id: number) {
		setSelectedGenreId(id);
	}

	return (
		<nav className="sidebar">
			<span>
				Watch<p>Me</p>
			</span>

			<div className="buttons-container">
				{genres.map((genre: GenreResponseProps) => (
					<Button
						key={String(genre.id)}
						title={genre.title}
						iconName={genre.name}
						onClick={() => handleClickButton(genre.id)}
						selected={selectedGenreId === genre.id}
					/>
				))}
			</div>
		</nav>
	);
};
