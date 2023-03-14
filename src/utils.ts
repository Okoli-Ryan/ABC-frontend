export type StoryType = "top" | "ask" | "show" | "job" | "new";

export interface IStory {
	id: number;
	descendants: number;
	by: string;
	kids: number[];
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}

export const StoryTypeLabel: Record<StoryType, string> = {
    new: "New Stories",
    top: "Top Stories",
    ask: "Ask Stories",
    job: "Job Stories",
    show: "Show HN Stories",
}