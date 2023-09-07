import { useEffect } from "react";

import { useSetAtom } from "jotai";

import { searchQueryAtom } from "@/atoms/search";
import { initialFilter, storeFilterAtom } from "@/atoms/storeFilter";
import { CategoryFilters } from "@/components/filter/CategoryFilters";
import { SearchBar } from "@/components/search/SearchBar";
import { StoreFilters } from "@/components/store/StoreFilters";
import { StoreItem } from "@/components/store/StoreItem";

import Category from "../category/[category]";
import { useSearch } from "../queries/search";


export default function Search() {
    const setQuery = useSetAtom(searchQueryAtom);
    const setFilter = useSetAtom(storeFilterAtom);
    const { data } = useSearch();

    useEffect(() => {
        setQuery(undefined);
    }, []);

    useEffect(() => {
       if(!data) setFilter(initialFilter)
    }, [data, setFilter]);

    return <>
        <SearchBar></SearchBar>
        <StoreFilters></StoreFilters>
        {!data?.length ? (
            <CategoryFilters cols={2}></CategoryFilters>
        ): (
            <>
                {data?.map((store) => (
                    <StoreItem key={store._id} store={store}></StoreItem>
                ))}
            </>    
        )}
    </>
}