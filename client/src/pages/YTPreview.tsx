import { useSearchParams } from "react-router-dom"
import { yt_html } from "../assets/assets"

/**
 * YTPreview - YouTube preview simulation page.
 * Reads `thumbnail_url` and `title` from URL query params, injects them
 * into a YouTube-like HTML template, and renders it in a fullscreen iframe.
 */
const YTPreview = () => {

    // Extract query parameters for the thumbnail image URL and video title
    const [searchParams] = useSearchParams()

    const thumbnail_url = searchParams.get('thumbnail_url')
    const title = searchParams.get('title')

    // Replace placeholder tokens in the HTML template with actual values
    const new_html = yt_html.replace("%%THUMBNAIL_URL%%", thumbnail_url!).replace("%%TITLE%%", title!)

    return (
        // Fullscreen overlay that renders the YouTube preview via srcdoc iframe
        <div className="fixed inset-0 z-100 bg-black">
            <iframe srcDoc={new_html} width="100%" height="100%" allowFullScreen ></iframe>
        </div>
    )
}

export default YTPreview