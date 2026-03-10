import type { VideoProps } from "@/types/editor";

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

export default function VideoBlock({ url, autoplay, muted, thumbnailUrl }: VideoProps) {
  if (!url) {
    return (
      <div data-testid="block-video" className="p-4 text-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg mx-4">
        Agrega una URL de video
      </div>
    );
  }

  const embedUrl = getEmbedUrl(url);

  if (embedUrl) {
    return (
      <div data-testid="block-video" className="relative w-full aspect-video">
        <iframe
          src={`${embedUrl}${autoplay ? "&autoplay=1" : ""}${muted ? "&mute=1" : ""}`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          loading="lazy"
          title="Video"
        />
      </div>
    );
  }

  return (
    <div data-testid="block-video" className="w-full">
      <video
        src={url}
        autoPlay={autoplay}
        muted={muted}
        controls
        playsInline
        poster={thumbnailUrl}
        className="w-full h-auto block"
      />
    </div>
  );
}
