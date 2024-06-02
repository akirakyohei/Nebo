import * as React from "react";
import { StylesResultProps } from "@grapesjs/react";
import { mdiMenuDown } from "@mdi/js";
import Icon from "@mdi/react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import StylePropertyField from "./StylePropertyField";

const accordionIcon = <Icon path={mdiMenuDown} size={0.7} />;

export default function StyleManager({
  sectors,
}: Omit<StylesResultProps, "Container">) {
  return (
    <>
      {sectors.map((sector) => (
        <Accordion key={sector.getId()} disableGutters>
          <AccordionSummary
            className="!bg-slate-800"
            expandIcon={accordionIcon}
            sx={{
              boxShadow: `rgba(33, 35, 38, 0.3) 0px 10px 10px -10px;`,
            }}
          >
            {sector.getName()}
          </AccordionSummary>
          <AccordionDetails
            className={` flex flex-wrap`}
            sx={{ background: "var(--gis-second-background)" }}
          >
            {sector.getProperties().map((prop, index) => (
              <StylePropertyField key={index} prop={prop} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
