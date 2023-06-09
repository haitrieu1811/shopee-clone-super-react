import { Fragment, useRef } from 'react';
import { toast } from 'react-toastify';

interface InputFileProps {
  onChange?: (value?: File) => void;
}

const InputFile = ({ onChange }: InputFileProps) => {
  const fileImageRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileImageRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    if (fileFromLocal && fileFromLocal?.size >= 1048576) {
      toast.error('Dung lượng file tối đa 1 MB');
    } else {
      onChange && onChange(fileFromLocal);
    }
  };

  return (
    <Fragment>
      <label>
        <input
          type='file'
          accept='.jpg,.jpeg,.png'
          ref={fileImageRef}
          onChange={handleFileChange}
          onClick={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e.target as any).value = null;
          }}
          hidden
        />
      </label>
      <button
        type='button'
        onClick={handleUpload}
        className='cursor-pointer rounded-sm border border-gray-300 px-5 py-2 text-sm text-gray-500 hover:bg-[#00000005]'
      >
        Chọn Ảnh
      </button>
    </Fragment>
  );
};

export default InputFile;
