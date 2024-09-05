'use client';

import React, { useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { UploadBeforeHandler, UploadBeforeReturn } from 'suneditor-react/dist/types/upload';

import { useAppDispatch } from '@/store';
import { encryptCloudMediaKey } from '@/utils/encryptCloudMediaKey';
import { postUploadImageAction } from '@/store/upload/upload.action';
import 'suneditor/dist/css/suneditor.min.css';
import './style.scss';
import { setIsFullScreenEditor } from '@/store/setting-app/setting-app.reducer';
import { createToast } from '@/store/notification/notification.reducer';
import { NotificationTypeEnum } from '@/config/constant';
import { v4 as uuidv4 } from 'uuid';
import { colorList, toolbar } from './toolbar';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

type Props = {
  contentEditor: string;
  onChangeContentEditor?: (newContent: string) => void;
};

const defaultFonts = [
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Impact',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Verdana',
];

const sortedFontOptions = [
  'Logical',
  'Salesforce Sans',
  'Garamond',
  'Sans-Serif',
  'Serif',
  'Times New Roman',
  'Helvetica',
  'Montserrat',
  ...defaultFonts,
].sort();

function Editor({ contentEditor, onChangeContentEditor }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleButtonClick = () => {
      document.body.style.overflow = 'hidden';
    };

    const button = document.querySelector('.se-btn');
    button?.addEventListener('click', handleButtonClick);

    return () => {
      button?.removeEventListener('click', handleButtonClick);
    };
  }, []);

  const handleImageUploadBefore = (
    files: File[],
    _: object,
    uploadHandler: UploadBeforeHandler
  ): UploadBeforeReturn => {
    let result: UploadBeforeReturn | any;

    (async () => {
      try {
        const res: any = await dispatch(
          postUploadImageAction({
            key: encryptCloudMediaKey(),
            file: files[0],
          })
        );

        // eslint-disable-next-line no-shadow
        if (res.payload.error) {
          const toast = {
            id: uuidv4(),
            status: NotificationTypeEnum.error,
            message: 'Upload ảnh thất bại',
            description: '',
          };
          dispatch(createToast(toast));
          uploadHandler({
            errorMessage: 'Error uploading image',
            result: [],
          });
        } else {
          result = [
            {
              url: res.payload.data?.result,
              name: res.payload.data?.originalname,
              size: 100,
            },
          ];
          uploadHandler({ result });
        }
      } catch (error) {
        uploadHandler({
          errorMessage: 'Error uploading image',
          result: [],
        });
      }
    })();

    return result;
  };

  const toggleFullScreen = (isFullScreen: boolean) => {
    dispatch(setIsFullScreenEditor(isFullScreen));
  };

  const handleOnChangeContent = useCallback(
    (cleanData: string) => {
      if (onChangeContentEditor) {
        onChangeContentEditor(cleanData);
      }
    },
    [onChangeContentEditor]
  );

  return (
    <SunEditor
      name="content"
      setContents={contentEditor || ''}
      onChange={handleOnChangeContent}
      setOptions={{
        height: '500',
        buttonList: toolbar,
        defaultTag: 'div',
        showPathLabel: false,
        font: sortedFontOptions,
        colorList,
      }}
      onImageUploadBefore={handleImageUploadBefore}
      // onVideoUploadBefore={() => {}}
      toggleFullScreen={toggleFullScreen}
      onPaste={(_, cleanData) => {
        handleOnChangeContent(cleanData);
      }}
    />
  );
}

export default Editor;
