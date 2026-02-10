import { useEffect, useState } from "react"
import SoftBackdrop from "../components/SoftBackdrop"
import { type IThumbnail } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { ArrowUpRightIcon, DownloadIcon, TrashIcon } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import api from "../configs/api"
import toast from "react-hot-toast"

/**
 * MyGeneration - Gallery page for the user's generated thumbnails.
 * Displays all thumbnails in a responsive masonry layout with options to
 * download, delete, or preview each thumbnail in a YouTube-style view.
 */
const MyGeneration = () => {
    const {isLoggedIn} = useAuth()
    const navigate = useNavigate()

    // Maps aspect ratio values to Tailwind CSS aspect-ratio classes
    const aspectRatioClassMap: Record<string, string> = {
        '16:9': 'aspect-video',
        '1:1': 'aspect-square',
        '9:16': 'aspect-[9/16]'
    }

    // List of user-generated thumbnails and loading flag
    const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    /** Fetch all thumbnails for the logged-in user */
    const fetchThumbnails = async () => {
        try {
            setLoading(true)
            const {data}= await api.get('/api/user/thumbnails')
            setThumbnails(data.thumbnails || [])
        } catch (error:any) {
            console.log(error.message)
            toast.error(error?.response?.data?.message )
        }
        finally{
            setLoading(false)  
        }
    }
 
    /**
     * Trigger a file download by creating a temporary anchor element.
     * Appends `fl_attachment` to the Cloudinary URL to force download.
     */
    const handleDownload = (image_url: string) => {
        const link = document.createElement('a');
         link.href = image_url.replace('/upload','/upload/fl_attachment')
         document.body.appendChild(link);
         link.click();
    }

    /** Delete a thumbnail after user confirmation, then remove it from local state */
    const handleDelete = async (id: string) => {
       try {
        const confirm = window.confirm("Are you sure you want to delete this thumbnail?")
        if(!confirm) return;
        const {data} = await api.delete(`/api/thumbnail/delete/${id}`)
        toast.success(data.message)
        setThumbnails(thumbnails.filter(thumbnail=> thumbnail._id !== id))
       } catch (error:any) {
        console.log(error.message)
        toast.error(error?.response?.data?.message )
       }
    }

    // Fetch thumbnails when the user is logged in
    useEffect(() => {
        if(isLoggedIn) {
        fetchThumbnails()
        }
    }, [isLoggedIn])

    return (
        <>
            <SoftBackdrop />
            <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
                    <p className="text-sm text-zinc-400 mt-1">View and manage all your AI-generated thumbnails</p>
                </div>

                {/* Loading skeleton placeholders */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]" />
                        ))
                        }
                    </div>
                )}

                {/* Empty state when no thumbnails have been generated */}
                {!loading && thumbnails.length === 0 && (
                    <div  className="text-center py-24">
                        <h3 className="text-lg font-semibold text-zinc-200">No thumbnails yet</h3>
                        <p className="text-sm text-zinc-400 mt-2">Start generating some thumbnails to see them here.</p>
                    </div>
                )}

                {/* Masonry grid of thumbnail cards */}
                {!loading && thumbnails.length > 0 && (
                    <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
                        {thumbnails.map((thumbnail) => {
                            const aspectClass = aspectRatioClassMap[thumbnail.aspect_ratio || 'aspect-video' ];
                            return (
                                // Clicking a card navigates to the Generate page for that thumbnail
                                <div key={thumbnail._id} onClick={()=> navigate(`/generate/${thumbnail._id}`)} className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6  border border-white/10 transition shadow-xl break-inside-avoid" >
                                    {/* Thumbnail image with dynamic aspect ratio */}
                                    <div className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                                        {thumbnail.image_url ? (
                                            <img src={thumbnail.image_url} alt={thumbnail.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                                                {thumbnail.isGenerating ? 'Generating...' : 'No Image'}
                                            </div>
                                        )}

                                        {/* Overlay shown while the thumbnail is still being generated */}
                                        {thumbnail.isGenerating && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">Generating...</div>
                                        )}
                                    </div>

                                    {/* Card metadata: title, style, color scheme, aspect ratio, date */}
                                    <div className="p-4 space-y-2">
                                        <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">{thumbnail.title}</h3>
                                        <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                                            <span className="px-2 py-0.5 rounded bg-white/8">{thumbnail.style}</span>
                                            <span className="px-2 py-0.5 rounded bg-white/8">{thumbnail.color_scheme}</span>
                                            <span className="px-2 py-0.5 rounded bg-white/8">{thumbnail.aspect_ratio}</span>
                                        </div>
                                        <p className="text-xs text-zinc-500">{new Date(thumbnail.createdAt!).toLocaleDateString()}</p>
                                    </div>

                                    {/* Action buttons: delete, download, open YouTube preview */}
                                    <div onClick={(e)=> e.stopPropagation()} className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5" >

                                        <TrashIcon onClick={()=> handleDelete(thumbnail._id)} className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />

                                        <DownloadIcon onClick={()=> handleDownload(thumbnail.image_url!)} className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />

                                        <Link to={`/preview?thumbnail_url=${thumbnail.image_url}&title=${thumbnail.title}`} target="_blank" >
                                            <ArrowUpRightIcon className="size-6 bg-black/50 p-1 rounded hover:bg-pink-600 transition-all" />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default MyGeneration