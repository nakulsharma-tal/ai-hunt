import { HiddenLocation } from './crossword';

export function FutureLocation() {
  return (
    <div className='bg-gray-200 p-4 w-96 h-auto'>
      <div className='max-w-md mx-auto'>
        <p className='text-lg font-semibold'>
          Great! You have arrived at the correct location. You are one step closer to proving yourself as the messiah.
        </p>
        <p className='mt-4'>
          You are not seeing anything here because liberators want to hide themselves from the AI cults. So they
          concealed their presence. They exist right here, but they are not visible to the eye. They hid themselves with
          a field around themselves. You need to alter the field's source code and make them visible.
        </p>
      </div>
      <HiddenLocation />
    </div>
  );
}
