import './explore.scss'
import { useParams } from 'react-router-dom'
import usePaginatedFetch from '../../hook/usePaginatedFetch';
import Spinner from '../../components/spinner/Spinner';
import MovieGrid from '../../components/movieGrid/MovieGrid';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

function ExploreResults({ mediaType }) {
    const { items, loading, error, loadMore } = usePaginatedFetch(`/discover/${mediaType}`);

    if (!items.length) {
        if (loading) return <Spinner initial={true} />;
        return <span className="resultNotFound">{error || "Sorry, Results not found!"}</span>;
    }

    return <MovieGrid items={items} loading={loading} loadMore={loadMore} mediaType={mediaType} />;
}

export default function Explore() {
    const { mediaType } = useParams();

    return (
        <div className='explorePage'>
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === 'tvshows' ? "Explore TV Shows" : "Explore Movies"}
                    </div>
                </div>
                {/* key resets paging when switching between movies and TV */}
                <ExploreResults key={mediaType} mediaType={mediaType === 'tvshows' ? 'tv' : 'movie'} />
            </ContentWrapper>
        </div>
    )
}
