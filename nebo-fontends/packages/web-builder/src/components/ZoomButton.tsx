import { useEffect, useState, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

interface Props {
  value?: number;
  getZoom?: () => number;
  onZoom: (value: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ZoomButton = ({
  value: valueData = 0,
  getZoom,
  onZoom,
  onZoomIn,
  onZoomOut,
}: Props) => {
  const [value, setValue] = useState(valueData);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (valueData !== value) {
      setValue(valueData);
    }
  }, [valueData]);
  // useEffect(() => {
  //   const refreshZoom = setInterval(() => {
  //     const _value = getZoom?.() || defaultValue;
  //     if (_value !== value && ref.current?.id !== document.activeElement?.id) {
  //       setValue(_value);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(refreshZoom);
  //   };
  // }, []);
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
            id="dlksdksdlkmsd"
            ref={ref}
            value={value}
            onChange={(_value) => {
              const _num = Number(_value.target.value) || 0;
              if (!isNaN(_num) && _num >= 0 && _num <= 300) setValue(_num);
            }}
            onBlur={() => {
              onZoom(value > 1 ? value : 100);
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
