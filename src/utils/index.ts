/*eslint-disable*/
import { toast } from 'react-toastify';
import * as Clipboard from 'clipboard-polyfill';

export const Adapth5 = 820;

export const getInt = (val: any) => {
  return Number(val) > 0 ? val : 0;
};

export const formatStrAddress = (str: string, left: number = 4, right: number = 4) =>
  str.substring(0, left) + new Array(4).join('.') + str.substring(str.length - right, str.length);

export const copyText = async (val: any) => {
  try {
    await Clipboard.writeText(val);
    toast.success('Copy Successfully!', {
      position: toast.POSITION.TOP_CENTER,
    });
  } catch (err: any) {
    console.error('Unable to copy text: ', err);
    toast.error(`Copy Failed! ${err.message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
