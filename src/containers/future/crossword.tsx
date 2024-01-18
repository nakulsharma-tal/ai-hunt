export function Crossword() {
  return (
    <div className='bg-gray-200 p-4 w-96 h-auto'>
      <img src='crossword-image.png' alt='Crossword' className='' />
      <div className=''>
        <h3 className='text-xl font-bold'>Across</h3>
        <ol className='list-decimal pl-4'>
          <li>Question 1</li>
          <li>Question 2</li>
          <li>Question 3</li>
          <li>Question 4</li>
        </ol>
      </div>

      <div className=''>
        <h3 className='text-xl font-bold'>Down</h3>
        <ol className='list-decimal pl-4'>
          <li>Question 1</li>
          <li>Question 2</li>
          <li>Question 3</li>
          <li>Question 4</li>
        </ol>
      </div>
    </div>
  );
}
