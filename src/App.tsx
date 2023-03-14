import './App.css';

import moment from 'moment';
import { useEffect, useState } from 'react';

import { ApiService } from './axios';
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
					<div className="news_container">
						<div style={{ fontWeight: "bold" }}>{el.title}</div>
						<div className="row">
							<p>-by {el.by}</p>
							<p>{moment(el.time).format("MMMM Do YYYY, h:mm:ss a")}</p>
						</div>
                            <p>{el.descendants} comments</p>
					</div>
				))}
			</div>
			{loading && <p>Loading...</p>}
			<button onClick={() => getStories()}>Load more</button>
		</div>
	);
}
