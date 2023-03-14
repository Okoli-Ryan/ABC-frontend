import moment from 'moment';
import React, { useState } from 'react';

import { ApiService } from './axios';
import { IStory } from './utils';

interface INewsCard extends IStory {}

export default function NewsCard({ by, title, time, descendants, kids }: INewsCard) {
	const [loading, setLoading] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState<IStory[]>([]);

	async function viewComments() {

        if(showComments) {
            setShowComments(false)
            return
        }
		setLoading(true);

		if (comments.length === 0) {
			const response = await ApiService.getComments(kids);

            console.log(response)
			setComments(response);
		}
		setShowComments(true);
		setLoading(false);
	}

	return (
		<div className="news_container">
			<div style={{ fontWeight: "bold" }}>{title}</div>
			<div className="row">
				<p>-by {by}</p>
				<p>{moment(time).format("MMMM Do YYYY, h:mm:ss a")}</p>
			</div>
			{loading ? <p>Loading...</p> : <p className="view_comments" onClick={viewComments}>
				view {kids.length} comments
			</p>}
			{showComments && (
				<div className="comment_container">
					{comments.map((el) => (
						<>
							{el.title && <p>{el.title}</p>}
							<p>comment by {el.by}</p>
						</>
					))}
				</div>
			)}
		</div>
	);
}
