import {AbsoluteFill, staticFile, Audio, useCurrentFrame, useVideoConfig, Img} from 'remotion';
import { Title } from './components/title';
import { useAudioData } from "@remotion/media-utils";
import { Progress } from '@nextui-org/react';

const music = staticFile("audio.mp3");

export type MyCompositionProps = {
	title: string
	description: string
}

export const MyComposition: React.FC<MyCompositionProps> = ({ title, description }) => {
	const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const audioData = useAudioData(music);
 
  if (!audioData) {
    return null;
  }


	return (
		<AbsoluteFill className="bg-white relative !grid grid-cols-2 grid-rows-1 gap-4 p-32">
			<section className='flex flex-col justify-between'>
				<header className="mb-5 text-transparent">
					hla
				</header>
				<main className='mb-4'>
					<Img src={staticFile('logo.png')} alt="" className='aspect-square rounded-2xl w-1/5 shadow border mb-4' />
					<Title text={title} />
					<p className='text-[#444746] text-2xl'>
						{description}
					</p>
				</main>
				<footer className='flex items-center gap-4'>
					<Img src={staticFile('brand/spotify.webp')} alt="" className='w-auto h-20' />
					<Img src={staticFile('brand/youtube.png')} alt="" className='w-auto h-20' />
				</footer>
			</section>
			<section className='flex items-center justify-center'>
				<Audio src={music} />
				<div className='border-4 max-w-lg h-auto mx-auto rounded-xl p-4 bg-white shadow'>
					<header>
						<Img src={staticFile('cover.png')} alt="" className='aspect-square w-full mx-auto rounded-xl' />
					</header>
					<main className='pb-10 pt-5'>
						<Progress aria-label="progress..." value={(frame * 100) / durationInFrames} className="max-w-md"/>
					</main>
					<footer className="grid grid-cols-3 gap-4 pb-4">
						<div className='flex justify-end'>
							<Img src={staticFile('icons/next.svg')} alt="" className='w-10 aspect-square rotate-180' />
						</div>
						<div className='flex justify-center'>
							<Img src={staticFile('icons/play.svg')} alt="" className='w-10 aspect-square' />
						</div>
						<div className='flex justify-start'>
							<Img src={staticFile('icons/next.svg')} alt="" className='w-10 aspect-square' />
						</div>
					</footer>
				</div>
			</section>
		</AbsoluteFill>
	);
};
