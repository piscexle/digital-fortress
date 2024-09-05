import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const convertTimeAgo = (inputTime: string, locale: string) => {
  const now = dayjs();
  const inputDate = dayjs(inputTime);
  // Set locale nếu bạn muốn sử dụng ngôn ngữ khác
  dayjs.locale(locale);

  // Tính khoảng cách thời gian từ thời điểm đầu vào đến thời điểm hiện tại
  const distance = now.to(inputDate);

  return distance;
};
