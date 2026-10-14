import './details.scss'
import useFetch from '../../hook/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videoSec/VideoSection'
import Carousel from '../../components/carousel/Carousel'

function Details() {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
    const similar = useFetch(`/${mediaType}/${id}/similar`)
    const recommendations = useFetch(`/${mediaType}/${id}/recommendations`)

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Carousel
                title={mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"}
                data={similar.data?.results}
                loading={similar.loading}
                endPoint={mediaType}
            />
            <Carousel
                title="Recommendations"
                data={recommendations.data?.results}
                loading={recommendations.loading}
                endPoint={mediaType}
            />
        </div>
    )
}

export default Details
