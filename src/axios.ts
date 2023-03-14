import axios from 'axios';

import { IStory, StoryType } from './utils';

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return error;
	}
);

export const ApiService = {
    getStories: async (start: number, type: StoryType) => {
        return (await axios.get<IStory[]>(`https://localhost:7123/api/v1/news/stories/${type}/${start}`)).data
    }
}