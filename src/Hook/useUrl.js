import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
    const [searchParams, setSearchParams] = useSearchParams();
    let lat = searchParams.get('lat');
    if(!lat) lat = searchParams.get('lan')
    const lng = searchParams.get('lng');

    return [lat,lng];
}