import React from 'react';
import { Modal } from 'antd';
import FormAuth from '../HeaderClient/FormAuth';
import TabsPanel from '../HeaderClient/TabsPanel';
import Tab from '../HeaderClient/Tab';

interface ModalAuthProps {
  visible: boolean;
  onClose: () => void;
}

const ModalAuth: React.FC<ModalAuthProps> = ({ visible, onClose }) => (
  <Modal centered closeIcon={false} open={visible} onCancel={onClose} footer={null}>
    <TabsPanel>
      {[
        <Tab key="login" title="Sign in">
          <FormAuth
            typeForm="login"
            onCancelModal={() => {
              onClose();
            }}
          />
        </Tab>,
        <Tab key="register" title="Sign up">
          <FormAuth
            typeForm="register"
            onCancelModal={() => {
              onClose();
            }}
          />
        </Tab>,
      ]}
    </TabsPanel>
  </Modal>
);

export default ModalAuth;
