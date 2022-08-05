import React from "react";
import { HOTELDATA_PER_PAGE } from "../utils/infiniteScroll";
import { getHotelInformation } from "../api/api";
import { BasicHotelDataType, GetDataResultType } from "../types/hotelDataType";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { QueryType } from "../types/queryType";
import useFilter from "../hooks/useFilter";
import Loading from "../components/common/Loading";

//TODO 다른 곳 보고와야 데이터 보이는 현상 해결하기 -> useEffect? 아니면 reservation 넘어오기 전에 미리 쿼리 생성?
const useInfiniteScroll = () => {
  const { filteredQueryString } = useFilter();

  const getPage = async (pageParam: number) => {
    const finalQueryString : QueryType = filteredQueryString.concat(`&_page=${pageParam}&_limit=${HOTELDATA_PER_PAGE}`);
    console.log("쿼리 체크",finalQueryString);
    const hotelDatas: GetDataResultType = await getHotelInformation<
      BasicHotelDataType[]
    >(finalQueryString);
    const nextPage =
      hotelDatas !== undefined && hotelDatas.length >= HOTELDATA_PER_PAGE
        ? pageParam + 1
        : undefined;
    return {
      result: hotelDatas,
      nextPage,
      isLast: !nextPage,
    };
  };

  const { fetchNextPage, isLoading, isFetchingNextPage, hasNextPage, data } =
    useInfiniteQuery(
      [`getTenHotelData`],
      ({ pageParam = 1 }) => getPage(pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const ObservationBox = () : JSX.Element => {
    const [ref, inView] = useInView();

    React.useEffect(() => {
      if (!data) return;
      const lastPageIndex = data?.pages.length - 1;
      const isLastPage = data?.pages[lastPageIndex].isLast;

      if (!isLastPage && inView) setTimeout(fetchNextPage, 500);
    }, [inView]);

    return <div ref={ref}><Loading /></div>;
  };

  return {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    ObservationBox,
  };
};

export default useInfiniteScroll;
