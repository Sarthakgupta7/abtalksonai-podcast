import test from 'node:test';
import assert from 'node:assert/strict';
import {getCache} from '@vercel/functions';
import {CHANNEL_ID,CHANNEL_URL,parseChannelPage,parseFeedDates,enrichFromWatch,loadChannelEpisodes} from '../server/youtube.ts';
import {mergeEpisodes,validAutoEpisode} from '../src/episode-merge.ts';
import handler from '../api/episodes.ts';

const id='newEpisode1';
const video=(videoId:string,title='A full AI conversation',duration='41:00',style='THUMBNAIL_OVERLAY_BADGE_STYLE_DEFAULT')=>({lockupViewModel:{contentId:videoId,contentType:'LOCKUP_CONTENT_TYPE_VIDEO',metadata:{lockupMetadataViewModel:{title:{content:title}}},contentImage:{thumbnailViewModel:{overlays:[{thumbnailBottomOverlayViewModel:{badges:[{thumbnailBadgeViewModel:{text:duration,badgeStyle:style}}]}}]}}}});
const page=(videos:any[],channelId=CHANNEL_ID)=>`<script>var ytInitialData = ${JSON.stringify({metadata:{channelMetadataRenderer:{externalId:channelId}},contents:{twoColumnBrowseResultsRenderer:{tabs:[{tabRenderer:{selected:true,content:{richGridRenderer:{contents:videos}}}}]}}})};</script>`;
const fresh=()=>parseChannelPage(page([video(id)]))[0];
const cacheKey='abtalksonai-podcast:youtube-full-episodes:v1';
const request=async(method='GET')=>{let body='';const headers:Record<string,string>={};const response:any={statusCode:200,setHeader:(name:string,value:string)=>headers[name]=value,end:(text='')=>{body=text}};await handler({method} as any,response);return {body,headers,status:response.statusCode}};

test('only released, full-length uploads enter the catalogue',()=>{
 const parsed=parseChannelPage(page([video(id,'A title with a quoted "}" brace'),video('shortVideo1','A clip','0:58'),video('trailer0001','Episode trailer','12:00'),video('premiere001','Premiere','40:00','THUMBNAIL_OVERLAY_BADGE_STYLE_UPCOMING'),video('livestream1','Live','40:00','THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE')]));
 assert.deepEqual(parsed.map(e=>e.id),[id]);assert.equal(parsed[0].seconds,2460);assert.equal(validAutoEpisode(parsed[0]),true);
});
test('legacy videoRenderer metadata is supported',()=>{
 const html=page([{videoRenderer:{videoId:id,title:{runs:[{text:'An older full conversation'}]},lengthText:{simpleText:'1:02:00'}}}]);
 assert.equal(parseChannelPage(html)[0].seconds,3720);
});
test('a different channel or broken metadata fails closed',()=>{
 assert.throws(()=>parseChannelPage(page([video(id)],'another-channel')));
 assert.throws(()=>parseChannelPage('<html>Unavailable</html>'));
 assert.throws(()=>parseChannelPage(page([video(id,'Trailer','0:20')])));
});
test('publication dates come from the official source and future premieres are excluded',()=>{
 const dates=parseFeedDates(`<feed><entry><yt:videoId>${id}</yt:videoId><published>2026-10-28T12:15:11Z</published></entry></feed>`);
 assert.equal(dates.get(id),'2026-10-28T12:15:11Z');
 const html=`var ytInitialPlayerResponse = ${JSON.stringify({playabilityStatus:{status:'OK'},videoDetails:{videoId:id,channelId:CHANNEL_ID,lengthSeconds:'2460'},microformat:{playerMicroformatRenderer:{publishDate:'2099-01-01'}}})};`;
 assert.equal(enrichFromWatch(fresh(),html),null);
});
test('new releases become first while curated guest facts and every archived entry survive',()=>{
 const known={...fresh(),guest:'Verified Guest',topic:'Startups',title:'Reviewed title',portrait:'verified'};
 const older={...known,id:'oldEpisode1'};
 const newer={...fresh(),id:'nextVideo01',thumbnailUrl:'https://i.ytimg.com/vi/nextVideo01/hq720.jpg',sourceUrl:'https://www.youtube.com/watch?v=nextVideo01'};
 const merged=mergeEpisodes([known,older],[newer,fresh(),fresh()]);
 assert.deepEqual(merged.map(e=>e.id),['nextVideo01',id,'oldEpisode1']);assert.equal(merged[1].guest,'Verified Guest');assert.equal(merged[1].portrait,'verified');assert.equal(merged[1].title,'Reviewed title');
 assert.equal(validAutoEpisode({...newer,thumbnailUrl:'https://untrusted.example/image.jpg'}),false);
});
test('successful source refresh, fresh cache, and outage recovery use the same endpoint',async(t)=>{
 await getCache().delete(cacheKey);
 t.mock.method(globalThis,'fetch',async(url:any)=>new Response(String(url).includes('/feeds/')?`<feed><entry><yt:videoId>${id}</yt:videoId><published>2026-10-28T12:15:11Z</published></entry></feed>`:page([video(id)]),{status:200}));
 const result=await request();assert.equal(JSON.parse(result.body).episodes[0].id,id);assert.equal(result.headers['X-Episode-Sync'],'fresh');
 t.mock.restoreAll();t.mock.method(globalThis,'fetch',async()=>{throw new Error('Offline')});
 const cached=await request();assert.equal(JSON.parse(cached.body).episodes[0].id,id);
 const payload=JSON.parse(result.body);payload.checkedAt='2020-01-01T00:00:00Z';await getCache().set(cacheKey,payload);
 const stale=await request();assert.equal(stale.headers['X-Episode-Sync'],'stale');assert.equal(JSON.parse(stale.body).episodes[0].id,id);
 await getCache().delete(cacheKey);const fallback=await request();assert.equal(fallback.headers['X-Episode-Sync'],'fallback');assert.ok(JSON.parse(fallback.body).episodes.length>0);
});
test('write requests are rejected',async()=>{assert.equal((await request('POST')).status,405)});
