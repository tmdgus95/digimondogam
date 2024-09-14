"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchDigimonListWithDetails } from "@/api/digimon";
import React, { useEffect, useRef } from "react";
import DigimonCard from "./DigimonCard";

const DigimonCardList = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["digimonData"],
    queryFn: ({ pageParam = 0 }) => fetchDigimonListWithDetails(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage?.pageable?.currentPage !== undefined) {
        const nextPage = lastPage.pageable.currentPage + 1;
        return nextPage < lastPage.pageable.totalPages ? nextPage : undefined;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched data with details:", data);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error?.message}</div>;

  return (
    <div className="rounded-md p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pages.map((page) =>
          page.content.map((digimon: any) => (
            <DigimonCard
              key={digimon.id}
              digimonId={digimon.id}
              name={digimon.name}
              image={digimon.image}
              attributes={digimon.attributes}
              level={digimon.level}
            />
          )),
        )}
      </div>

      <div ref={loadMoreRef} style={{ height: 20, background: "transparent" }}>
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : (
          !hasNextPage && <p>No more data</p>
        )}
      </div>
    </div>
  );
};

export default DigimonCardList;
