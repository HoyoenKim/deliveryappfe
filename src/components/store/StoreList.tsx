import { useInfiniteScroll } from "@/lib/useInfiniteScroll";
import { useStores } from "@/pages/queries/store";

import { StoreListUI } from "./StoreListUi"


export const StoreList = () => {
    const { isLoading, error, data, hasNextPage, isFetching, fetchNextPage } = useStores()

    const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage)

    if (isLoading || error || !data) {
        return null;
    }

    return <StoreListUI {...{data, loader, isFetching}}/>
}