import { evolutionStageMap, attributeMap } from "@/utils/digimonHelpers";

export const fetchDigimonListWithDetails = async (page: number) => {
  const response = await fetch(
    `https://digi-api.com/api/v1/digimon?page=${page}&pageSize=16`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Digimon data");
  }

  const data = await response.json();

  const digimonDetails = await Promise.all(
    data.content.map(async (digimon: any) => {
      try {
        const detailResponse = await fetch(digimon.href);
        if (!detailResponse.ok) {
          throw new Error(`Failed to fetch details for ${digimon.name}`);
        }
        const detailData = await detailResponse.json();

        const level =
          detailData.levels?.length > 0
            ? evolutionStageMap[detailData.levels[0].level] ||
              detailData.levels[0].level
            : "측정불가";

        const firstAttribute =
          detailData.attributes?.[0]?.attribute || "측정불가";
        const translatedAttribute =
          attributeMap[firstAttribute] || firstAttribute;

        return {
          id: digimon.id,
          name: digimon.name,
          image: digimon.image,
          href: digimon.href,
          level,
          attributes: translatedAttribute,
        };
      } catch (error) {
        console.error(error);
        return digimon;
      }
    }),
  );

  return {
    pageable: data.pageable,
    content: digimonDetails,
  };
};
