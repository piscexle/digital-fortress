'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import React, { useEffect, useMemo, createContext, useCallback } from 'react';
import { notification } from 'antd';
import { deleteToastById } from '@/store/notification/notification.reducer';
import './style.scss';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

// eslint-disable-next-line no-shadow
export enum ErrorCode {
  // 400
  BAD_REQUEST = 'BAD_REQUEST',
  BAD_CONTENT = 'BAD_CONTENT',
  KEY_EXPIRED = 'KEY_EXPIRED',
  KEY_INVALID = 'KEY_INVALID',
  OTP_EXPIRED = 'OTP_EXPIRED',
  OTP_INVALID = 'OTP_INVALID',
  IP_INVALID = 'IP_INVALID',
  UUID_INVALID = 'UUID_INVALID',
  VALUE_UNIQUE = 'VALUE_UNIQUE',

  FORBIDDEN_DELETE = 'FORBIDDEN_DELETE',
  // 401
  AUTH_INCORRECT_PASSWORD = 'AUTH_INCORRECT_PASSWORD',
  AUTH_EMAIL_NOT_FOUND = 'AUTH_EMAIL_NOT_FOUND',

  // 408
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',

  // 409
  CONFLICT = 'Email already exists',
  DUPLICATE = 'DUPLICATE',
  AUTH_EMAIL_EXISTED = 'EMAIL_ALREADY_EXISTS',
}

type ErrorType = {
  [key in ErrorCode]: {
    type: NotificationType;
    defaultMessage: string;
  };
};

export const NotificationContext = createContext({ name: 'Default' });

const secondToast = 1;

const ToasterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { toast } = useAppSelector((state) => state.notificationSlice);
  const [api, contextHolder] = notification.useNotification({ maxCount: 5 });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const errorType: ErrorType = {
    [ErrorCode.BAD_REQUEST]: { type: 'error', defaultMessage: 'Bad Request' },
    [ErrorCode.BAD_CONTENT]: { type: 'error', defaultMessage: 'Bad Content' },
    [ErrorCode.KEY_EXPIRED]: { type: 'error', defaultMessage: 'Key Expired' },
    [ErrorCode.KEY_INVALID]: { type: 'error', defaultMessage: 'Key Invalid' },
    [ErrorCode.OTP_EXPIRED]: { type: 'error', defaultMessage: 'OTP Expired' },
    [ErrorCode.OTP_INVALID]: { type: 'error', defaultMessage: 'OTP Invalid' },
    [ErrorCode.IP_INVALID]: { type: 'error', defaultMessage: 'IP Invalid' },
    [ErrorCode.UUID_INVALID]: { type: 'error', defaultMessage: 'UUID Invalid' },
    [ErrorCode.VALUE_UNIQUE]: { type: 'error', defaultMessage: 'Mã code đã tồn tại' },
    [ErrorCode.FORBIDDEN_DELETE]: { type: 'error', defaultMessage: 'Forbidden delete' },
    [ErrorCode.AUTH_INCORRECT_PASSWORD]: {
      type: 'error',
      defaultMessage: 'Incorrect password!',
    },
    [ErrorCode.AUTH_EMAIL_NOT_FOUND]: { type: 'error', defaultMessage: 'Email không tồn tại' },
    [ErrorCode.REQUEST_TIMEOUT]: { type: 'error', defaultMessage: 'Request Timeout' },
    [ErrorCode.CONFLICT]: { type: 'error', defaultMessage: 'Conflict' },
    [ErrorCode.DUPLICATE]: { type: 'error', defaultMessage: 'Duplicate' },
    [ErrorCode.AUTH_EMAIL_EXISTED]: { type: 'error', defaultMessage: 'Email đã tồn tại' },
  };

  const openNotificationWithIcon = useCallback(
    (typeNotification: NotificationType, message: string, description: string, id: string) => {
      const { defaultMessage } = errorType?.[message as ErrorCode] ?? { defaultMessage: message };

      api[typeNotification]({
        key: id,
        message: defaultMessage || message,
        description,
        onClose: () => {
          notification.destroy(id);
          dispatch(deleteToastById(id));
        },
        className: 'custom-notification',
      });
    },
    [api, errorType, dispatch]
  );

  useEffect(() => {
    if (toast.length > 0) {
      const lastNotification = toast[toast.length - 1];
      openNotificationWithIcon(
        lastNotification.status,
        lastNotification.message,
        lastNotification.description,
        lastNotification.id
      );
      const timeoutId = setTimeout(() => {
        notification.destroy(lastNotification.id);
        dispatch(deleteToastById(lastNotification.id));
      }, secondToast * 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    return () => {};
  }, [toast, openNotificationWithIcon, dispatch]);

  const contextValue = useMemo(() => ({ name: 'Notification' }), []);
  return (
    <NotificationContext.Provider value={contextValue}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default ToasterContextProvider;
