import { RectangleHorizontal, RectangleVertical, Square } from "lucide-react"
import { aspectRatios, type AspectRatio } from "../assets/assets"
import type React from "react"

/**
 * AspectRatioSelector - Button group for choosing the thumbnail aspect ratio.
 * Renders a horizontal list of selectable buttons (16:9, 1:1, 9:16) with
 * corresponding icons. The selected ratio is visually highlighted.
 *
 * Props:
 * - value: the currently selected AspectRatio
 * - onChange: callback when a different ratio is selected
 */
const AspectRatioSelector = ({value, onChange}: {value: AspectRatio, onChange: (ratio: AspectRatio) => void}) => {

    // Map each aspect ratio to its representative Lucide icon
    const iconMap = {
        '16:9': <RectangleHorizontal className="size-6" />,
        '1:1': <Square className="size-6" />,
        '9:16': <RectangleVertical className="size-6" />
    } as Record<AspectRatio, React.ReactNode>

    return (
        <div className="space-y-3 dark">
            <label className="block text-sm font-medium">Aspect Ratio</label>

            {/* Render a button for each available aspect ratio */}
            <div className="flex flex-wrap gap-2">
                {aspectRatios.map((ratio) => {
                    const selected = value === ratio;
                    return(
                        <button key={ratio} type="button" onClick={() => onChange(ratio)} className={`flex items-center gap-2 px-5 py-2.5 rounded-md border text-sm transition border-white/10 ${selected ? 'bg-white/10' : 'hover:bg-white/6'}`}>
                            {iconMap[ratio]}
                            <span className="tracking-widest">{ratio}</span>
                        </button>
                    )
                } )}
            </div>
        </div>
    )
}

export default AspectRatioSelector