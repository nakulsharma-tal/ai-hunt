import { HiddenLocation } from "./hidden-location";

export function FutureLocation() {
  return (
    <div className="bg-gray-200 p-4 w-96 h-auto">
      <div className="max-w-md mx-auto">
        <p className="text-lg font-semibold">
          Great! You have arrived at the correct location. You are one step closer to proving yourself as the messiah.
        </p>
        <p className="mt-4">
          You are not seeing anything else here because liberators want to hide themselves from the AI cults. So they concealed
          their presence with a force field around themselves. They exist right here, but they are not visible to the eye. You
          need to alter the force field's source code and make them visible.
        </p>
      </div>

      <HiddenLocation />
    </div>
  );
}
