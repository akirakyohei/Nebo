import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

interface Props {
  defaultValue?: number;
  getZoom?: () => number;
  onZoom: (value: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ZoomButton = ({
  defaultValue = 100,
  getZoom,
  onZoom,
  onZoomIn,
  onZoomOut,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    // setInterval(() => {
    //   const _value = getZoom?.() || defaultValue;
    //   if (_value !== value) {
    //     setValue(_value);
    //   }
    // }, 1000);
  }, []);
  return (
    <InputGroup>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="zoom-out">Thu nhỏ</Tooltip>}
      >
        <Button
          variant="outline-secondary"
          onClick={onZoomOut}
          className="nebo-border-btn"
        >
          <i className="fa fa-minus"></i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="reset">Tỉ lệ</Tooltip>}
      >
        <>
          <Form.Control
            value={value}
            onChange={(_value) => {
              const _num = Number(_value.target.value);
              if (!isNaN(_num) && _num >= 1 && _num <= 300) onZoom(_num);
            }}
            style={{ width: "5rem" }}
          ></Form.Control>
          <InputGroup.Text className="">%</InputGroup.Text>
        </>
      </OverlayTrigger>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="zoom-in">Phóng to</Tooltip>}
      >
        <Button
          variant="outline-secondary"
          onClick={onZoomIn}
          className="nebo-border-btn"
        >
          <i className="fa fa-plus"></i>
        </Button>
      </OverlayTrigger>
    </InputGroup>
  );
};
