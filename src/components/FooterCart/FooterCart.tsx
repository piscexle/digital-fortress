import React from 'react';
import Image from 'next/image';
import './FooterCart.scss';

interface Props {
  step: number;
}

function FooterCart({ step }: Props) {
  return (
    <div className="wrapper-footer-cart">
      <div className="wrapper-footer-cart-item">
        <div className={`wrapper-footer-cart-item-icon  ${step === 1 ? 'active' : ''}`}>
          <Image src="/images/Cart.png" alt="cart" width={40} height={40} />
        </div>
        GIỎ HÀNG
      </div>
      <div className="wrapper-footer-cart-item">
        <div className={`wrapper-footer-cart-item-icon  ${step === 2 ? 'active' : ''}`}>
          <Image src="/images/checked.png" alt="cart" width={40} height={40} />
        </div>
        XÁC NHẬN
      </div>
      <div className="wrapper-footer-cart-item">
        <div className={`wrapper-footer-cart-item-icon  ${step === 3 ? 'active' : ''}`}>
          <Image src="/images/coin.png" alt="cart" width={40} height={40} />
        </div>
        THANH TOÁN
      </div>
      <div className="wrapper-footer-cart-item last-item">
        <div className={`wrapper-footer-cart-item-icon  ${step === 4 ? 'active' : ''}`}>
          <Image src="/images/box.png" alt="cart" width={40} height={40} />
        </div>
        HOÀN TẤT
      </div>
    </div>
  );
}
export default FooterCart;
