'use client';

import { Carousel as CarouselAnt } from 'antd';
import Skeleton from 'react-loading-skeleton';

import './style.scss';
import { checkTypeFile } from '@/utils/string.helper';
import { FileTypeEnum } from '@/config/constant';
import React from 'react';
import Image from 'next/image';
import { createRGBDataURL } from '@/utils/createRGBDataURL';
import { useRouter } from 'next/navigation';

type Props = {
  dataCarousel: {
    image: string;
    id: string;
    navigateLink?: string;
  }[];
  className?: string;
  classNameChild?: string;
  classNameLoading?: string;
  isComponentChild?: boolean;
  loading: boolean;
};

const Carousel: React.FC<Props> = ({
  className,
  classNameChild,
  classNameLoading,
  dataCarousel,
  isComponentChild,
  loading,
  ...rest
}: Props) => {
  const router = useRouter();
  return (
    <CarouselAnt className={className} {...rest}>
      {dataCarousel.length === 0 && loading ? (
        <Skeleton className={classNameLoading} />
      ) : (
        dataCarousel?.map((imageSlide) => {
          // check type file
          const typeFile = checkTypeFile(imageSlide.image);
          return typeFile !== FileTypeEnum.video ? (
            <div 
              className={classNameChild} 
              key={imageSlide.id}
            >
              <Image
                src={imageSlide.image}
                alt=""
                fill
                placeholder="blur"
                blurDataURL={createRGBDataURL(199, 199, 199)}
                sizes="100%"
                priority
                onClick={() => {
                  if (imageSlide.navigateLink) {
                    router.push(imageSlide.navigateLink);
                  }
                }}
              />
            </div>
          ) : (
            <div 
              className={classNameChild} 
              key={imageSlide.id}
            >
              <video src={imageSlide.image} playsInline autoPlay muted loop />
            </div>
          );
        })
      )}
    </CarouselAnt>
  );
};

export default Carousel;
