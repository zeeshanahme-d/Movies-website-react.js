import React, { useState, useEffect } from 'react'
import './explore.scss'
import { useParams } from 'react-router-dom'
import { FetchDataFromAPI } from '../../utils/api';
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

export default function Explore() {
    const [data, setData] = useState(null);
    console.log("🚀 ~ file: Explore.jsx:8 ~ Explore ~ data:", data)
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const { mediaType } = useParams()

    const initializeData = () => {
        setLoading(true);
        FetchDataFromAPI(`/discover/${mediaType}`)
            .then(res => {
                setData(res);
                setLoading(false);
                setPageNum((prev) => prev + 1);

            })
    };

    const fetchDataNextPage = () => {
        FetchDataFromAPI(`/discover/${mediaType}?page=${pageNum}`)
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
        initializeData();
    }, [mediaType])

    return (
        <div className='explorePage'>
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === 'tv' ? "Explore TV Shows" : "Explore Movies"}
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className='content'
                                next={fetchDataNextPage}
                                dataLength={data?.results?.length || []}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner initial={true} />}
                            >
                                {data?.results?.map((item, index) => {
                                    return (
                                        <MovieCard key={index} data={item} mediaType={mediaType} />
                                    )
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">Sorry, Results not found!</span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    )
}
