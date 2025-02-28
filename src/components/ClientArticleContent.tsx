"use client";

import React from "react";
import ReactPlayer from "react-player";

type Props = {
  content: string;
};

export default function ClientArticleContent({ content }: Props) {
  // Vérifie si le contenu contient un lien YouTube
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;

  const match = content.match(youtubeRegex);
  const youtubeUrl = match ? `https://www.youtube.com/watch?v=${match[2]}` : null;

  return (
    <div
      className="prose max-w-none mb-8 detail-article"
      style={{
        fontSize: 14,
        lineHeight: 1.8,
        color: "#555",
        marginTop: 10,
      }}
    >
      {youtubeUrl ? (
        <div className="flex justify-center">
          <ReactPlayer url={youtubeUrl} controls width="100%" height="400px" />
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}
