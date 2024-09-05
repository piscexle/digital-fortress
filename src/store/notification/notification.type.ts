import { NotificationTypeEnum } from '@/config/constant';

export type NotificationState = {
  toast: {
    id: string;
    status: NotificationTypeEnum;
    message: string;
    description: string;
  }[];
};

export type ToastPayloadAction = {
  id: string;
  status: NotificationTypeEnum;
  message: string;
  description: string;
};
