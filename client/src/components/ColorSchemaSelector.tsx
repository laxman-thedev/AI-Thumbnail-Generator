import { colorSchemes } from "../assets/assets"

/**
 * ColorSchemaSelector - Grid of color scheme swatches for thumbnail generation.
 * Each swatch displays the scheme's colors side by side. The selected scheme
 * is highlighted with a pink ring. Shows the selected scheme name below.
 *
 * Props:
 * - value: the currently selected color scheme ID
 * - onChange: callback when a different scheme is selected
 */
const ColorSchemaSelector = ({ value, onChange }: { value: string, onChange: (color: string) => void }) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-200">Color Scheme</label>

            {/* 6-column grid of color swatches */}
            <div className="grid grid-cols-6 gap-3">
                {colorSchemes.map((scheme) => (
                    <button key={scheme.id} type="button" onClick={() => onChange(scheme.id)}
                    className={`relative rounded-lg transition-all ${value === scheme.id && 'ring-2 ring-pink-500'}`} title={scheme.name}>
                        {/* Render each color in the scheme as a horizontal bar */}
                        <div className="flex h-10 rounded-lg overflow-hidden">
                            {scheme.colors.map((color, index) => (
                                <div key={index} className="flex-1" style={{ backgroundColor: color }} />
                            ))}
                        </div>
                    </button>
                ))}
            </div>
            {/* Display the name of the currently selected color scheme */}
            <p className="text-xs text-zinc-400">Selected: {colorSchemes.find((s)=> s.id === value)?.name}</p>
        </div>
    )
}

export default ColorSchemaSelector