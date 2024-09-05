import React, { ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  title: string;
}
const Tab = ({ children }: TabProps) => <div>{children}</div>;

export default Tab;
