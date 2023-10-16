import { useParams } from "react-router-dom";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hook/useFetch";

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <>
        {data?.results?.length > 0 ? (
            <Carousel data={data?.results} loading={loading} title={"Recommendations"} endPoint={mediaType} />
        ) : (
            <div style={{ width: 100 }}></div>
        )}
        </>
    )
}

export default Similar;