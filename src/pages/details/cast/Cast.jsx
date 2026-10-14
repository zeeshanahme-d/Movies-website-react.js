import "./cast.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImg/Img";
import avatar from "../../../assets/images/avatar.png";
import { imageUrl } from "../../../utils/api";

const SkeletonItem = () => (
    <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
    </div>
);

const Cast = ({ data, loading }) => {
    if (!loading && !data?.length) return null;

    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data.map((item) => (
                            <div className="listItem" key={item.credit_id}>
                                <div className="profileImg">
                                    <Img src={imageUrl(item.profile_path, "w185") || avatar} alt={item.name} />
                                </div>
                                <div className="name">{item.name}</div>
                                <div className="character">{item.character}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {Array.from({ length: 6 }, (_, i) => <SkeletonItem key={i} />)}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
