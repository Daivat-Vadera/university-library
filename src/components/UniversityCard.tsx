"use client";
import { config } from "@/lib/config";
import { IKImage } from "imagekitio-next";
import React from "react";

const UniversityCard = (props: { path: string }) => {
  return (
    <IKImage
      path={props.path}
      loading='lazy'
      className='!relative'
      alt='University Card'
      urlEndpoint={config.env.imageKit.urlEndpoint}
      fill
      lqip={{ active: true }}
    />
  );
};

export default UniversityCard;
