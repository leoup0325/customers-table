import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import states_map from "../utils/states_map";

export const ViewCustomerModal = ({ customer, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal show={!!customer} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t("customer.view_details", { name: customer?.name || "" })}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{`${t("tables.id")}: ${customer?.id}`}</p>
        <p>{`${t("tables.name")}: ${customer?.name}`}</p>
        <p>{`${t("tables.long_location")}: ${
          states_map[customer?.location] || ""
        } (${customer?.location})`}</p>
      </Modal.Body>
    </Modal>
  );
};
