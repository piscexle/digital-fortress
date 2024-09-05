import React from 'react';
import './styles.scss';

interface Props {
  title: string;
}

const SectionHead = ({ title }: Props) => (
    <div className="wrapper-section-head">
      <div className="section-head-title">
        <h1>{title}</h1>
      </div>
    </div>
  );

export default SectionHead;
