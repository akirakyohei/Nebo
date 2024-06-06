import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { Template } from "../../../../types";
import { Box, IconButton } from "@mui/material";
import { stringToColor } from "../../../../utils/stringAvatar";

interface Props {
  active?: number;
  data: Template[];
}

export const DefaultCarouselCarousel = ({ active = 0, data }: Props) => {
  const [activeSlide, setactiveSlide] = useState(active);

  const next = () =>
    activeSlide < data.length - 1 && setactiveSlide(activeSlide + 1);

  const prev = () => activeSlide > 0 && setactiveSlide(activeSlide - 1);

  const getStyles = (index: number) => {
    if (activeSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (activeSlide - 1 === index)
      return {
        opacity: 1,
        transform: "translateX(-240px) translateZ(-400px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (activeSlide + 1 === index)
      return {
        opacity: 1,
        transform: "translateX(240px) translateZ(-400px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (activeSlide - 2 === index)
      return {
        opacity: 1,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (activeSlide + 2 === index)
      return {
        opacity: 1,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < activeSlide - 2)
      return {
        opacity: 0,
        transform: "translateX(-480px) translateZ(-500px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > activeSlide + 2)
      return {
        opacity: 0,
        transform: "translateX(480px) translateZ(-500px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <>
      {/* carousel */}
      <Box
        sx={{
          position: "relative",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          width: "362px",
          height: "272px",
          margin: "0 auto",
        }}
      >
        {data.map((item, i) => (
          <React.Fragment key={item.id}>
            <Box
              sx={{
                background: stringToColor(item.name),
                width: "362px",
                height: "272px",
                transition:
                  "transform 500ms ease 0s, opacity 500ms ease 0s,  visibility m500ms ease 0s",
                position: "absolute",
                top: 0,
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 5px 20px ${stringToColor(item.name)}30`,
                ...getStyles(i),
              }}
            >
              <SliderContent template={item} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "60px",
                bottom: "-60px",
                borderRadius: "12px",
                transition:
                  "transform 500ms ease 0s, opacity 500ms ease 0s, visibility 500ms ease 0s",
                background: `linear-gradient(to bottom, ${stringToColor(item.name)}40, transparent)`,
                ...getStyles(i),
              }}
            />
          </React.Fragment>
        ))}
      </Box>
      {/* carousel */}

      <IconButton onClick={prev}>
        <ChevronLeftOutlined />
      </IconButton>
      <IconButton onClick={next}>
        <ChevronRightOutlined />
      </IconButton>
    </>
  );
};

const SliderContent = ({ template }: { template: Template }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        alignItems: "flex-start",
      }}
    >
      <Box>{template.name}</Box>
    </Box>
  );
};
