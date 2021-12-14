import { useEffect, useState } from "react"
import { Button } from "components/Button"
import { ChartContainer, Bar } from "components/Chart"
import {
    Stats,
    Controls,
    GenerateArray,
    TimelineControl,
    AlgorithmsControl,
    AlgorithmCheckbox,
} from "components/Controls"
import Layout from "components/Layout"
import useSortingVisualizer from "hooks/useSortingVisualizer"
import { generateNumberArray, scale } from "utils"
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
            <ChartContainer height={`${scale(displayedArray.length, 10)}px`}>
                {displayedArray.map((n, index) => (
                    <Bar key={n} n={n} barEffects={barEffects[index]} />
                ))}
            </ChartContainer>
            <Stats stats={stats} />
            <Controls>
                <GenerateArray setNumberArray={setNumberArray} />
                <TimelineControl>
                    <Button onClick={step}>Step</Button>
                    <Button onClick={reset}>Reset</Button>
                    <Button onClick={() => setPlaying((playing) => !playing)}>
                        {playing ? "Pause" : "Play"}
                    </Button>
                </TimelineControl>
                <AlgorithmsControl>
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
            </Controls>
        </Layout>
    )
}

export default Home
