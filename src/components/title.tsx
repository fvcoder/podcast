import { loadFont } from '@remotion/google-fonts/OpenSans'

const { fontFamily } = loadFont()

export function Title({ text }: { text: string }) {
  return (
    <header className='mb-4'>
      <h1 className="text-5xl font-bold text-[#1f1f1f]" style={{fontFamily}}>
        Lo Intente
      </h1>
      <h2 className="text-2xl mt-4 font-semibold text-[#1f1f1f]" style={{fontFamily}}>
        {text}
      </h2>
    </header>
  );
}