import { Button, Upload, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '@/store';
import { postUploadImageAction } from '@/store/upload/upload.action';
import { encryptCloudMediaKey } from '@/utils/encryptCloudMediaKey';
import { v4 as uuidv4 } from 'uuid';
import { createToast } from '@/store/notification/notification.reducer';
import { NotificationTypeEnum } from '@/config/constant';

interface Props {
  title: string;
  imageUrl: UploadFile[];
  setImageUrl: Dispatch<SetStateAction<any | null>>;
}

const UploadSingleImage = ({ title = 'Upload hình ảnh', imageUrl, setImageUrl }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const propsImageUploadImage: UploadProps = {
    accept: 'image/*',
    maxCount: 1,
    async customRequest({ file, onSuccess, onError }) {
      setLoading(true);
      try {
        const res = await dispatch(
          postUploadImageAction({
            key: encryptCloudMediaKey(),
            file: file as File,
          })
        );
        if (res && res.payload && res.payload.data && onSuccess) {
          setImageUrl([
            {
              uid: uuidv4() as string,
              name: uuidv4() as string,
              status: 'done',
              url: res.payload.data.result,
              thumbUrl: res.payload.data.result,
            },
          ]);
          setLoading(false);
          onSuccess(null, res.payload.data);
        } else {
          setLoading(false);
          dispatch(
            createToast({
              id: uuidv4(),
              status: NotificationTypeEnum.error,
              message: 'Upload ảnh thất bại',
              description: '',
            })
          );
        }
      } catch (error: any) {
        setLoading(false);
        if (onError) {
          const uploadError: any = {
            status: 'error',
            response: error.message,
          };
          onError(uploadError, error);
        }
      }
    },
    listType: 'picture',
    onChange: (info) => {
      const { status } = info.file;
      if (status === 'done') {
        setImageUrl([
          {
            uid: uuidv4() as string,
            name: info.fileList[0].xhr.originalname,
            status: 'done',
            url: info.fileList[0].xhr.result,
            thumbUrl: info.fileList[0].xhr.result,
          },
        ]);
      } else {
        setImageUrl([
          {
            uid: '',
            name: '',
            status: undefined,
            url: '',
            thumbUrl: '',
          },
        ]);
      }
    },
    onRemove: () => {
      setImageUrl([
        {
          uid: '',
          name: '',
          status: undefined,
          url: '',
          thumbUrl: '',
        },
      ]);
    },
    showUploadList: true,
    multiple: false,
    disabled: loading,
    fileList: imageUrl?.[0].url ? imageUrl : [],
  };

  return (
    <Upload {...propsImageUploadImage}>
      <Button icon={<UploadOutlined />} loading={loading}>
        {title}
      </Button>
    </Upload>
  );
};

export default UploadSingleImage;
