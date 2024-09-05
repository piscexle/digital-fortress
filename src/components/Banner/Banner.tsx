import Carousel from '@/components/Carousel/Carousel';
import React from 'react';
import './style.scss';

interface Props {
  data: {
    image: string;
    id: string;
    navigateLink?: string;
  }[];
  carouselBannerSettings: any;
  loading: boolean;
}

const Banner = ({ data, loading, carouselBannerSettings }: Props) => (
  <Carousel
    draggable
    className="carousel-banner-page"
    classNameChild="carousel-banner-page-child"
    classNameLoading="carousel-banner-page-loading"
    dataCarousel={data.map((item) => ({
      image: item.image as string,
      id: item.id as string,
      navigateLink: item.navigateLink,
    }))}
    isComponentChild
    loading={loading}
    {...carouselBannerSettings}
  />
);

export default Banner;
