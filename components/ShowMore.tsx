"use client";

import { ShowMoreProps } from "@/types/indext";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";

function ShowMore({
  pageNumber,
  isNext,
  setLimit,
}: ShowMoreProps & {
  setLimit?: (limit: number) => void;
}) {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    // server side rendering
    // const newPathName = updateSearchParams("limit", `${newLimit}`);

    // router.push(newPathName);
    if (setLimit) setLimit(newLimit);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
}

export default ShowMore;
