export function AudioVisualization({ visualization, nSamples } : { visualization: number[], nSamples: number }) {

  return (
    <div className="rounded-2xl p-5 border-4 border-blue-700 flex gap-4 flex-row items-center justify-between h-20">
      {visualization.slice(0, 0.7 * nSamples).map((v) => {
						return (
							<div
                className="rounded-2xl w-4/5"
								style={{ height: `${100 * v}%`, backgroundColor: "blue" }}
							/>
						);
			})}
    </div>
  );
}
