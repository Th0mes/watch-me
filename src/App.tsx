import { useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export interface GenreResponseProps {
	id: number;
	name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
	title: string;
}
export interface MovieProps {
	imdbID: string;
	Title: string;
	Poster: string;
	Ratings: Array<{
		Source: string;
		Value: string;
	}>;
	Runtime: string;
}

export function App() {
	const [selectedGenreId, setSelectedGenreId] = useState(1);

	const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
		{} as GenreResponseProps
	);

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<SideBar
				setSelectedGenre={setSelectedGenre}
				selectedGenreId={selectedGenreId}
				setSelectedGenreId={setSelectedGenreId}
			/>

			<Content
				selectedGenreId={selectedGenreId}
				selectedGenre={selectedGenre}
			/>
		</div>
	);
}
