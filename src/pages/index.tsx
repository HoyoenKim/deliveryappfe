import { CategoryFilters } from "@/components/filter/CategoryFilters";
import { MainSearchBar } from "@/components/search/MainSearchBar";
import { StoreList } from "@/components/store/StoreList";

export default function Home() {
  return <>
    <MainSearchBar/>
    <CategoryFilters cols={4}/>
    <StoreList/>
  </>
}