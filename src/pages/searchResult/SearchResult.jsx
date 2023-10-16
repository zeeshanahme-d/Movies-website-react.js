import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'
import { FetchDataFromAPI } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCard from '../../components/movieCard/MovieCard'
import Spinner from '../../components/spinner/Spinner'
import noResult from '../../assets/images/no-results.png'
import './searchResult.scss'
import Img from '../../components/lazyLoadImg/Img'


export default function SearchResult() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();

  const fetchData = () => {
    setLoading(true);
    FetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      })
  };

  const fetchDataNextPage = () => {
    FetchDataFromAPI(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data?.results) {
          setData(
            { ...data, results: [...data?.results, ...res?.results] }
          )
        } else {
          setData(res)
        }
        setPageNum((prev) => prev + 1);
      })
  };

  useEffect(() => {
    fetchData();
  }, [query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${data?.total_results > 1 ? "Results" : "Result"} of '${query.slice(1)}'`}</div>
              <InfiniteScroll
                className='content'
                dataLength={data?.results?.length || []}
                next={fetchDataNextPage}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner initial={true} />}
              >
                {data.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) :
            (
              <>  <span className='resultNotFound'>Sorry , Results Not Found!</span>
                <Img src={noResult}/>
                </>
            )
          }
        </ContentWrapper>
      )}
    </div>
  )
}
