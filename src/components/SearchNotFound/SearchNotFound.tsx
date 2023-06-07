import SearchNotFoundImage from 'src/assets/images/not-found.png';

const SearchNotFound = () => {
  return (
    <div className='mb-[120px] mt-[100px] flex flex-col items-center justify-center'>
      <img src={SearchNotFoundImage} alt='Không tìm thấy' className='h-[134px] w-[134px]' />
      <p className='mb-[10px] mt-[15px] text-lg'>Không tìm thấy kết quả nào</p>
      <p className='text-lg text-[#00000089]'>Hãy thử sử dụng các từ khóa chung chung hơn</p>
    </div>
  );
};

export default SearchNotFound;
