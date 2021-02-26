import React from "react";
import { LoadingContainer, LoadingProps } from "./style";
export const Loading: React.FC<LoadingProps> = ({
  wholePage,
  isVisible = true,
}) => {
  return (
    <LoadingContainer wholePage={wholePage} isVisible={isVisible}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </LoadingContainer>
  );
};
