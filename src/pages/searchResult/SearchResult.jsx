import { useParams } from 'react-router-dom'
import usePaginatedFetch from '../../hook/usePaginatedFetch'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieGrid from '../../components/movieGrid/MovieGrid'
import Spinner from '../../components/spinner/Spinner'
import Img from '../../components/lazyLoadImg/Img'
import noResult from '../../assets/images/no-results.png'
import './searchResult.scss'

function Results({ query }) {
  const { items, totalResults, loading, error, loadMore } = usePaginatedFetch('/search/multi', query);
  // People can't be opened on the details page.
  const titles = items.filter((item) => item.media_type !== "person");

  if (!titles.length) {
    if (loading) return <Spinner initial={true} />;
    return (
      <div className='noResult'>
        <Img src={noResult} className="noResultImage" />
        <span className='resultNotFound'>{error || "Sorry, Results Not Found!"}</span>
      </div>
    );
  }

  return (
    <>
      <div className="pageTitle">{`Search ${totalResults > 1 ? "Results" : "Result"} of '${query}'`}</div>
      <MovieGrid items={titles} loading={loading} loadMore={loadMore} fromSearch={true} />
    </>
  );
}

export default function SearchResult() {
  const { query } = useParams();

  return (
    <div className='searchResultsPage'>
      <ContentWrapper>
        {/* key resets paging for each new search */}
        <Results key={query} query={query} />
      </ContentWrapper>
    </div>
  )
}
