export type AutoEpisode={id:string;guest:string;title:string;topic:string;duration:string;summary:string;terms:string;publishedAt?:string;thumbnailUrl:string;sourceUrl:string;seconds:number};
export type EpisodeFeed={version:1;checkedAt:string;source:string;status:'fresh'|'stale'|'fallback';episodes:AutoEpisode[]};
