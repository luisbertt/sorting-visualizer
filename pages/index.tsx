import { useEffect, useState } from "react"
import { Button } from "components/Button"
import { ChartContainer, Bar } from "components/Chart"
import {
    Stats,
    Controls,
    TimelineControl,
    AlgorithmsControl,
    AlgorithmCheckbox,
} from "components/Controls"
import Layout from "components/Layout"
import useSortingVisualizer from "hooks/useSortingVisualizer"
import { generateNumberArray } from "utils"
import algorithms from "algorithms"

const Home = () => {
    const [numberArray, setNumberArray] = useState(generateNumberArray(50))
    const [algorithm, setAlgorithm] = useState(() => algorithms.bubbleSort)
    const { displayedArray, done, step, stats, reset, barEffects } =
        useSortingVisualizer(numberArray, algorithm)
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        if (!done && playing) {
            let taskId = window.setInterval(() => {
                step()
            }, 1)
            return () => window.clearInterval(taskId)
        }

        if (done) setPlaying(false)
    }, [done, step, playing, reset])

    return (
        <Layout title="Sorting Visualizer">
            <h1 className="text-4xl font-bold my-2">Sorting Visualizer</h1>
            <Controls>
                <TimelineControl>
                    <Button
                        onClick={() => setNumberArray(generateNumberArray(50))}
                    >
                        Generate Array
                    </Button>
                    <Button onClick={step}>Step</Button>
                    <Button onClick={reset}>Reset</Button>
                    <Button onClick={() => setPlaying((playing) => !playing)}>
                        {playing ? "Pause" : "Play"}
                    </Button>
                </TimelineControl>
            </Controls>
            <div className="flex relative">
                <ChartContainer>
                    {displayedArray.map((n, index) => (
                        <Bar key={n} n={n} barEffects={barEffects[index]} />
                    ))}
                </ChartContainer>
                <AlgorithmsControl>
                    <p className="font-bold">Algorithms:</p>
                    {Object.entries(algorithms).map(([name, generator]) => (
                        <AlgorithmCheckbox
                            key={name}
                            name={name}
                            generator={generator}
                            currentAlgorithm={algorithm}
                            setAlgorithm={setAlgorithm}
                        />
                    ))}
                </AlgorithmsControl>
            </div>
            <Stats stats={stats} />
        </Layout>
    )
}

export default Home
