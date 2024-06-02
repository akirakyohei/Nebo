import * as React from "react";
import { mdiMenuDown } from "@mdi/js";
import { TraitsResultProps } from "@grapesjs/react";
import TraitPropertyField from "./TraitPropertyField";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Icon from "@mdi/react";
const accordionIcon = <Icon path={mdiMenuDown} size={0.7} />;
export default function TraitManager({
  traits,
}: Omit<TraitsResultProps, "Container">) {
  if (traits.length > 0)
    return (
      <Accordion key={"properties"} disableGutters>
        <AccordionSummary
          className="!bg-slate-800"
          expandIcon={accordionIcon}
          sx={{
            boxShadow: `rgba(33, 35, 38, 0.3) 0px 10px 10px -10px;`,
          }}
        >
          Trait
        </AccordionSummary>
        <AccordionDetails
          className={` flex flex-wrap`}
          sx={{ background: "var(--gis-second-background)" }}
        >
          {traits.map((trait) => (
            <TraitPropertyField key={trait.getId()} trait={trait} />
          ))}
        </AccordionDetails>
      </Accordion>
    );

  return <></>;
}
