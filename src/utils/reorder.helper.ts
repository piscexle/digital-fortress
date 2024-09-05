export const handleReorderHelper = (
  activeIndex: number,
  overIndex: number,
  originalArrayData: any[]
): {
  resultId: string;
  resultIndex: number;
  resultData: any[];
} => {
  const newArrayData = [...originalArrayData]; // Create a shallow copy of the array

  let newIndex = 1;

  if (overIndex === 0) {
    // ON FIRST ITEM IN ARRAY
    newIndex = newArrayData[0].index + 1;
    newArrayData[activeIndex] = { ...newArrayData[activeIndex], index: newIndex };
  } else if (overIndex >= newArrayData.length - 1) {
    // ON LAST ITEM IN ARRAY
    newIndex = newArrayData[overIndex].index / 2;
    newArrayData[activeIndex] = { ...newArrayData[activeIndex], index: newIndex };
  } else if (activeIndex > overIndex) {
    // ON MOVE UP
    newIndex = (newArrayData[overIndex - 1].index + newArrayData[overIndex].index) / 2;
    newArrayData[activeIndex] = { ...newArrayData[activeIndex], index: newIndex };
  } else {
    // ON MOVE DOWN
    newIndex = (newArrayData[overIndex + 1].index + newArrayData[overIndex].index) / 2;
    newArrayData[activeIndex] = { ...newArrayData[activeIndex], index: newIndex };
  }

  return {
    resultId: newArrayData[activeIndex].id,
    resultIndex: parseFloat(newIndex.toFixed(9)),
    resultData: newArrayData,
  };
};
