import { useState } from 'react';

export function HiddenLocation() {
  const [revealCrossword, setRevealCrossword] = useState<boolean>(false);

  return (
    <div className='hidden mt-4'>
      <p className='text-lg font-semibold'>
        Great job on finding and altering the source code to expose the reality under the force field!
      </p>
      <p className='text-lg font-semibold'>Welcome to the League of Liberators!</p>
      <p className='text-lg font-semibold'>Now, it's time for training!!!</p>
      {!revealCrossword && (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => setRevealCrossword(true)}
        >
          Start training
        </button>
      )}
      {revealCrossword && <CrossWord />}
    </div>
  );
}

export function CrossWord() {
  const [startPuzzle, setStartPuzzle] = useState<boolean>(false);
  return (
    <div className=''>
      <div>
        <p className='m-4'>
          This training is a crossword puzzle designed over 40 years ago by the original Liberators (who are no longer
          alive) who knew JavaScript and know how AI is originally designed, so, one or two tricks in the puzzle could
          come in handy in the future!
        </p>
        <p className='font-bold'>Oh no! But wait!</p>
        <p className='m-4'>
          You exposed the hidden location by exposing the source code but forgot to close it after entering the
          location! Now, even the AI cults can see the location! Looks like the cults came in and messed with the
          crossword puzzle before LOL fought them away!
        </p>
        <p>
          These cults were started by once product managers, so, they possess special confusing powers! Looks like they
          have added some extra statements to the crossword puzzle to confuse you!
        </p>
        <p>
          None or more statements of each clue could be wrong and misleading. But the majority of the statements should
          be pointing to the correct answer. Fight through this confusing darkness and be the lightning that you are!
        </p>
        {!startPuzzle && (
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => setStartPuzzle(true)}
          >
            Start Puzzle
          </button>
        )}
      </div>
      {startPuzzle && (
        <div>
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
      )}
    </div>
  );
}
