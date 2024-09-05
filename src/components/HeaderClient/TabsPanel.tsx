import React, { ReactElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface TabPanelProps {
  selected?: number;
  children: ReactElement<{ subtitle?: React.ReactNode }>[];
}

const TabsPanel = ({ selected: initialSelected = 0, children }: TabPanelProps) => {
  const [selected, setSelected] = useState(initialSelected);

  const renderTab = (index: number) => {
    setSelected(index);
  };

  const renderMenu = () =>
    React.Children.map(children, (elem, index) => {
      const selectedStyle = index === selected ? ' selected' : '';
      const { icon, hide, title } = (elem as React.ReactElement<any>).props;
      const display = hide || false;

      return display ? null : (
        <li
          aria-hidden
          key={uuidv4()}
          className={`wrapper-auth-tabs-item${selectedStyle}`}
          onClick={() => renderTab(index)}
        >
          <span> {title}</span>
          {icon ? <i className={`${icon} wrapper-auth-tabs-item-icon`} /> : null}
        </li>
      );
    });

  const getSubtitle = () => {
    const selectedChild = children?.[selected];

    if (React.isValidElement<{ subtitle?: React.ReactNode }>(selectedChild)) {
      const { subtitle } = selectedChild.props;
      return subtitle ? <h2 className="subtitle">{subtitle}</h2> : null;
    }

    return null;
  };

  return (
    <div>
      <ul className="wrapper-auth-tabs">{renderMenu()}</ul>
      <div className="tab__content">
        {getSubtitle()}
        {children?.[selected]}
      </div>
    </div>
  );
};

export default TabsPanel;
