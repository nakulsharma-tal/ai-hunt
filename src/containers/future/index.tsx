import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

export function FutureLocation() {
  return (
    <div className='bg-gray-200 p-4 w-96 h-auto'>
      <div className='max-w-md mx-auto'>
        <p className='text-lg font-semibold'>
          Great! You have arrived at the correct location. You are one step closer to proving yourself as the messiah.
        </p>
        <p className='mt-4'>
          You are not seeing anything else here because liberators want to hide themselves from the AI cults. So they
          concealed their presence with a force field around themselves. They exist right here, but they are not visible
          to the eye. You need to alter the force field's source code and make them visible.
        </p>
      </div>
      <HiddenLocation />
    </div>
  );
}
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
      {revealCrossword && <CrosswordIntroduction />}
    </div>
  );
}

export function CrosswordIntroduction() {
  const navigate = useNavigate({ from: '/location' });
  const navigateToCrossWord = useCallback(() => {
    navigate({
      to: '/crossword',
    });
  }, [navigate]);

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
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={navigateToCrossWord}
        >
          Start Puzzle
        </button>
      </div>
    </div>
  );
}
