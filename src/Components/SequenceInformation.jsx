import { ContextBar } from "./StyledContainer";

const SequenceInformation = ({ ManufacturingOrderUid, Product, Program, Station, Side }) => (
  <ContextBar
    items={[
      { label: "Ordre de fabrication", value: ManufacturingOrderUid },
      { label: "Produit", value: Product },
      { label: "Face", value: Side },
      { label: "Programme", value: Program },
      { label: "Poste", value: Station },
    ]}
  />
);

export default SequenceInformation;
