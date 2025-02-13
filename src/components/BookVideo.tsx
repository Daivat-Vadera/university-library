"use client";
import { config } from "@/lib/config";
import { IKVideo, ImageKitProvider } from "imagekitio-next";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <ImageKitProvider
      publicKey={config.env.imageKit.publicKey}
      urlEndpoint={config.env.imageKit.urlEndpoint}
    >
      <IKVideo path={videoUrl} className="w-full rounded-xl" controls={true} />
    </ImageKitProvider>
  );
};

export default BookVideo;
