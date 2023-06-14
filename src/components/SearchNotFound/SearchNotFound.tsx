import SearchNotFoundImage from 'src/assets/images/not-found.png';

const SearchNotFound = () => {
  return (
    <div className='my-[50px] flex flex-col items-center justify-center md:mb-[120px] md:mt-[100px]'>
      <img src={SearchNotFoundImage} alt='Không tìm thấy' className='h-[134px] w-[134px]' />
      <p className='mb-[10px] mt-[15px] text-center text-lg'>Không tìm thấy kết quả nào</p>
      <p className='text-center text-lg text-[#00000089]'>Hãy thử sử dụng các từ khóa chung chung hơn</p>
    </div>
  );
};

export default SearchNotFound;
