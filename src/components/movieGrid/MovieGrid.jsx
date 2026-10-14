import { VirtuosoGrid } from "react-virtuoso";

import "./movieGrid.scss";
import MovieCard from "../movieCard/MovieCard";
import Spinner from "../spinner/Spinner";

const Footer = ({ context }) => context.loading && <Spinner initial={true} />;

// Only the cards near the viewport are mounted, so long infinite-scroll lists stay fast.
const MovieGrid = ({ items, loading, loadMore, fromSearch, mediaType }) => (
    <VirtuosoGrid
        useWindowScroll
        data={items}
        context={{ loading }}
        // Not `endReached`: in VirtuosoGrid it never fires if the first scroll jumps straight to the last row.
        rangeChanged={({ endIndex }) => endIndex >= items.length - 1 && loadMore()}
        increaseViewportBy={600}
        listClassName="movieGrid"
        itemClassName="movieGridItem"
        computeItemKey={(_, item) => `${item.media_type || mediaType}-${item.id}`}
        itemContent={(_, item) => <MovieCard data={item} fromSearch={fromSearch} mediaType={mediaType} />}
        components={{ Footer }}
    />
);

export default MovieGrid;
