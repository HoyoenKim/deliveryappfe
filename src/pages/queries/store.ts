import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useAtomValue } from "jotai";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

import { storeFilterAtom } from "@/atoms/storeFilter";
import { API_PATH } from "@/constants/api";
import { removeEmpty } from "@/lib/objectUtils";

import { Store } from "../types/store";

const STORE_PER_PAGE = 3;

export const useStores = () => {
    const params = useAtomValue(storeFilterAtom)

    return useInfiniteQuery<Store[]>({
        queryKey: ['STORES', params],
        queryFn: async ({pageParam = 1})  => {
            const response = await fetch(
                `${API_PATH}/store?` + new URLSearchParams(removeEmpty({
                    sort: params.sort,
                    maxDeliveryPrice: String(params.maxDeliveryPrice),
                    minOrderPrice: String(params.minOrderPrice),
                    page: String(pageParam),
                    limit: String(STORE_PER_PAGE)
                }))
            )
            return response.json();
        },
        getNextPageParam: (lastPage, allPages) => {
            if( lastPage.length === STORE_PER_PAGE) {
                return allPages.length + 1;
            }
        }
    });
}

export const useStore = (storeId?: string) => {
    return useQuery<Store>({
      queryKey: ['STORE', storeId],
      queryFn: async () => {
        if (!storeId) {
          return null
        }
        const response = await fetch(`${API_PATH}/store/${storeId}`)
        return response.json()
      },
    })
  }
  