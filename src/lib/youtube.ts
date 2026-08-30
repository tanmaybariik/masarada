export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  isLive: boolean;
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function fetchLatestYouTubeVideos(maxResults: number = 5): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    console.warn("YouTube API Key or Channel ID missing. Returning mock data.");
    return getMockVideos();
  }

  try {
    // 1. Check for live streams first
    const liveRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
    );
    const liveData = await liveRes.json();
    
    let videos: YouTubeVideo[] = [];

    if (liveData.items && liveData.items.length > 0) {
      videos = liveData.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
        isLive: true,
      }));
    }

    // 2. Fetch latest videos
    const latestRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );
    const latestData = await latestRes.json();

    if (latestData.items) {
      const latestVideos = latestData.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
        isLive: false,
      }));
      
      // Merge live and latest, avoiding duplicates
      const allVideos = [...videos, ...latestVideos];
      const uniqueVideos = Array.from(new Map(allVideos.map(v => [v.id, v])).values());
      
      return uniqueVideos.slice(0, maxResults);
    }

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return getMockVideos();
  }
}

function getMockVideos(): YouTubeVideo[] {
  return [
    {
      id: "mock1",
      title: "শ্রীশ্রীমায়ের জন্মতিথি উৎসব - লাইভ দর্শন",
      thumbnail: "https://placehold.co/600x400/D94A2F/FFFDF9?text=Live+Darshan",
      publishedAt: new Date().toISOString(),
      isLive: true,
    },
    {
      id: "mock2",
      title: "সান্ধ্য আরতি ও ভজন",
      thumbnail: "https://placehold.co/600x400/E8A375/FFFDF9?text=Aarati",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      isLive: false,
    }
  ];
}
