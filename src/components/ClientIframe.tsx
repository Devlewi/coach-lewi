"use client";

import React from "react";

type IframeProps = {
  src: string;
  width: number;
  height: number;
};

const ClientIframe = ({ src, width, height }: IframeProps) => {
  return (
    <iframe
      title="YouTube video player"
      src={src}
      width={width}
      height={height}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default ClientIframe;
