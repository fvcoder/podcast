import {Composition, continueRender, delayRender, staticFile} from 'remotion';
import { getAudioData } from "@remotion/media-utils";

import {MyComposition} from './Composition';
import './style.css';
import { useEffect, useState } from 'react';

export const RemotionRoot: React.FC = () => {
  const [handle] = useState(() => delayRender());
  const [duration, setDuration] = useState(1);
 
  useEffect(() => {
    getAudioData(staticFile('audio.mp3'))
      .then(({ durationInSeconds }) => {
        setDuration(Math.round(durationInSeconds * 30));
        continueRender(handle);
      })
      .catch((err) => {
        console.log(`Error fetching metadata: ${err}`);
      });
  }, [handle]);

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={duration}
				fps={30}
				width={2048}
				height={1080}
				defaultProps={{
					title: "T01E01 - La forma en la cual estudio",
					description: "Un camino no inicia con un primer paso, inicia con una idea suficientemente loca como para cambiar la realidad.",
				}}
			/>
		</>
	);
};
