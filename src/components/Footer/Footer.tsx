'use client';

import React from 'react';
import { Button, Col, Image, Row, Space } from 'antd';
import './footer.scss';
// import { sacramentoFont } from '@/config/font';
import Link from 'next/link';
import TiktokColorIcon from '../Icons/TiktokColorIcon';
import FacebookColorIcon from '../Icons/FacebookColorIcon';
import ZaloIcon from '../Icons/ZaloIcon';

function FooterClient() {
  const getBusinessInfo = {
    data: {
      logo: '/images/icon-auth.png',
      address: '123, Lô 1, đường Hai Bà Trưng, Quận 1, TP HCM',
      hotline: '(+84) 905 617 321',
      email: 'info@digital-fortress.com',
      zalo: 'digital-fortress.com',
      tiktok: 'digital-fortress.com',
      facebook: 'digital-fortress.com',
    },
  };
  return (
    <footer className="wrapper-footer">
      <div className="wrapper-footer-bottom">
        <div className="container">
          <Row gutter={[12, 12]}>
            <Col
              xs={{ span: 24, order: 4 }}
              sm={{ span: 24, order: 4 }}
              md={{ span: 12, order: 1 }}
              lg={{ span: 9, order: 1 }}
              xl={{ span: 8, order: 1 }}
            >
              <Image src="/images/icon-auth.png" alt="digital-fortress" sizes="100%" />
            </Col>
            <Col
              xs={{ span: 12, order: 2 }}
              sm={{ span: 8, order: 2 }}
              md={{ span: 5, order: 2 }}
              lg={{ span: 4, order: 2 }}
              xl={{ span: 8, order: 2 }}
            >
              <div className="wrapper-footer-bottom-item">
                <ul>
                  <li>
                    <Link href="/">
                      <span style={{ color: '#000000' }}>-</span> Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/news">
                      <span style={{ color: '#000000' }}>-</span> About us
                    </Link>
                  </li>
                  <li>
                    <Link href="/huong-dan-mua-hang">
                      <span style={{ color: '#000000' }}>-</span> Feature
                    </Link>
                  </li>

                  <li>
                    <Link href="/canh-bao-gia-mao">
                      <span style={{ color: '#000000' }}>-</span> Service
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              xs={{ span: 12, order: 3 }}
              sm={{ span: 8, order: 3 }}
              md={{ span: 7, order: 3 }}
              lg={{ span: 5, order: 3 }}
              xl={{ span: 8, order: 3 }}
            >
              <div className="wrapper-footer-bottom-item-contact">
                <h3 className="wrapper-footer-bottom-item-title">Contact Info</h3>
                <ul>
                  <li>
                    <Image src="/images/phone.png" width={16} /> {getBusinessInfo.data?.hotline}
                  </li>
                  <li>
                    <Image src="/images/gmail.png" width={16} /> {getBusinessInfo.data?.email}
                  </li>
                  <li>
                    <Image src="/images/address.png" width={16} /> {getBusinessInfo.data?.address}
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              xs={{ span: 24, order: 5 }}
              sm={{ span: 7, order: 3 }}
              md={{ span: 12, order: 4 }}
              lg={{ span: 6, order: 4 }}
              xl={{ span: 8, order: 4 }}
            />
            <Col
              xs={{ span: 24, order: 5 }}
              sm={{ span: 7, order: 3 }}
              md={{ span: 6, order: 4 }}
              lg={{ span: 6, order: 4 }}
              xl={{ span: 8, order: 4 }}
            >
              <div className="wrapper-footer-bottom-item">
                <h3 className="wrapper-footer-bottom-item-title">Page Links</h3>
                <Space wrap className="wrapper-footer-bottom-item-social">
                  <Button
                    type="link"
                    aria-label="Facebook"
                    icon={<FacebookColorIcon />}
                    onClick={() => {
                      const facebookURL = getBusinessInfo.data?.facebook;
                      window.open(facebookURL, '_blank');
                    }}
                  />
                  <Button
                    type="link"
                    aria-label="Tiktok"
                    icon={<TiktokColorIcon />}
                    onClick={() => {
                      const tiktokURL = getBusinessInfo.data?.tiktok;
                      window.open(tiktokURL, '_blank');
                    }}
                  />
                  <Button
                    type="link"
                    aria-label="Pinterest"
                    icon={<ZaloIcon />}
                    onClick={() => {
                      const zaloLink = `${getBusinessInfo.data?.zalo}`;
                      window.open(`https://zalo.me/${zaloLink?.replaceAll(' ', '')}`, '_blank');
                    }}
                  />
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="wrapper-footer-all-right">
        <p>
          Copyright @2024 digital-fortress - All right reserved. Designed and developed by Lê Trâm
          ltd.
        </p>
      </div>
    </footer>
  );
}

export default FooterClient;
