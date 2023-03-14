import './App.css';

import { useEffect, useState } from 'react';

import { ApiService } from './axios';
import NewsCard from './NewsCard';
import { IStory, StoryType, StoryTypeLabel } from './utils';

export default function App() {
	const [loading, setLoading] = useState(true);
	const [type, setType] = useState<StoryType>("top");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [newsList, setNewsList] = useState([] as IStory[]);
	const storyTypeList = Object.entries(StoryTypeLabel);

	useEffect(() => {
		setCurrentIndex(0);
		getStories(true);
	}, [type]);

	async function getStories(reload = false) {
		setLoading(true);
		const response = await ApiService.getStories(currentIndex, type);

		if (reload) setNewsList(response);
		else setNewsList((prev) => [...prev, ...response]);

		const index = reload ? 0 : currentIndex;
		setCurrentIndex(index + response.length);
		setLoading(false);
	}

	return (
		<div>
			<h4>News: {type}</h4>
			{storyTypeList.map((el) => (
				<input
					type="radio"
					value={el[0]}
					checked={el[0] === type}
					onChange={(e) => setType(e.target.value as StoryType)}
				/>
			))}
			<div className="new_body">
				{newsList.map((el) => (
					<NewsCard key={el.id} {...el} />
				))}
			</div>
			{loading && <p>Loading...</p>}
			<button onClick={() => getStories()}>Load more</button>
		</div>
	);
}
