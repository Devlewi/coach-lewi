"use client";

type Props = {
  content: string;
};

export default function ClientArticleContent({ content }: Props) {
  return (
    <div
      className="prose max-w-none mb-8 detail-article"
      style={{
        fontSize: 14,
        lineHeight: 1.8,
        color: "#555",
        marginTop: 10,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
