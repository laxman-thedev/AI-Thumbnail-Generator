import { DownloadIcon, ImageIcon, Loader2Icon } from "lucide-react"
import type { AspectRatio, IThumbnail } from "../assets/assets"

/**
 * PreviewPanel - Displays the generated thumbnail preview with three states:
 * 1. Loading: spinner with progress message
 * 2. Image ready: thumbnail with hover-to-download overlay
 * 3. Empty: placeholder prompting the user to generate a thumbnail
 *
 * Props:
 * - thumbnail: the generated thumbnail data (or null)
 * - isLoading: whether generation is in progress
 * - aspectRatio: current aspect ratio selection for sizing the preview container
 */
const PreviewPanel = ({thumbnail, isLoading, aspectRatio}: {thumbnail: IThumbnail | null, isLoading: boolean, aspectRatio: AspectRatio}) => {

    // Map aspect ratio values to Tailwind CSS aspect-ratio utility classes
    const aspectClasses = {
        '16:9': 'aspect-video',
        '1:1': 'aspect-square',
        '9:16': 'aspect-[9/16]'
    } as Record<AspectRatio, string>

    /**
     * Triggers a file download by appending Cloudinary's fl_attachment
     * transformation to the image URL and programmatically clicking a link.
     */
    const onDownload = ()=> {
        if (!thumbnail?.image_url) return;
       const link = document.createElement('a');
         link.href = thumbnail?.image_url.replace('/upload','/upload/fl_attachment')
         document.body.appendChild(link);
         link.click();
         link.remove(); 
        
    }

    return (
        <div className="relative mx-auto w-full max-w-2xl">
            {/* Container with dynamic aspect ratio class */}
            <div className={`relative w-full mx-auto max-w-2xl ${aspectClasses[aspectRatio]}`}>
                {/* Loading state - shown while AI is generating the thumbnail */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25">
                        <Loader2Icon className="size-8 animate-spin text-zinc-400" />
                        <div className="text-center">
                            <p className="text-sm font-medium text-zinc-200">AI is creating your thumbnail...</p>
                            <p className="text-sm text-zinc-400">This may take 10-20 seconds</p>
                        </div>
                    </div>
                )}

                {/* Image preview - shown when thumbnail has been generated */}
                {!isLoading && thumbnail?.image_url && (
                    <div className="group relative h-full w-full">
                        <img src={thumbnail?.image_url} alt={thumbnail?.title} className="h-full w-full object-cover" />

                        {/* Download overlay appears on hover */}
                        <div className="absolute inset-0 flex items-end justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                            <button onClick={onDownload} type="button" className="mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/40 backdrop-blur hover:scale-105 active:scale-95" >
                                <DownloadIcon className="size-4" />
                                Download Thumbnail
                            </button>
                        </div>
                    </div>
                ) }

                {/* Empty state - shown when no thumbnail exists yet */}
                {!isLoading && !thumbnail?.image_url && (
                    <div className="absolute inset-0 m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25">
                        <div className="max-sm:hidden flex size-20 items-center justify-center rounded-full bg-white/10">
                            <ImageIcon className="size-10 text-white opacity-50" />
                        </div>

                        <div className="px-4 text-center">
                            <p className="font text-zinc-200">Generate your first thumbnail</p>
                            <p className="mt-1 text-xs text-zinc-400">Fill out the form and click Generate</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default PreviewPanel