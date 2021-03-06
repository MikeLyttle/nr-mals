import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { startOfToday, add, set } from "date-fns";

import { LICENCE_MODE, REQUEST_STATUS } from "../../utilities/constants";
import {
  LICENCE_TYPE_ID_APIARY,
  LICENCE_TYPE_ID_VETERINARY_DRUG,
} from "../licences/constants";
import {
  formatNumber,
  formatDate,
  formatDateTimeString,
} from "../../utilities/formatting.ts";
import { parseAsInt, parseAsFloat, parseAsDate } from "../../utilities/parsing";

import ErrorMessageRow from "../../components/ErrorMessageRow";
import SectionHeading from "../../components/SectionHeading";
import SubmissionButtons from "../../components/SubmissionButtons";

import { fetchRegions } from "../lookups/regionsSlice";
import { fetchLicenceStatuses } from "../lookups/licenceStatusesSlice";
import {
  updateLicence,
  setCurrentLicenceModeToEdit,
  setCurrentLicenceModeToView,
  renewLicence,
} from "./licencesSlice";
import { getLicenceTypeConfiguration } from "./licenceTypeUtility";

import { validateIrmaNumber, parseIrmaNumber } from "./irmaNumberUtility";

import LicenceDetailsEdit from "./LicenceDetailsEdit";
import LicenceDetailsView from "./LicenceDetailsView";
import { openModal } from "../../app/appSlice";

import { CONFIRMATION } from "../../modals/ConfirmationModal";

export default function LicenceDetailsViewEdit({ licence }) {
  const { status, error, mode } = licence;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRegions());
    dispatch(fetchLicenceStatuses());
  }, [dispatch]);

  const form = useForm({
    reValidateMode: "onBlur",
  });
  const { register, handleSubmit, clearErrors, setError, setValue } = form;

  useEffect(() => {
    register("applicationDate");
    register("issuedOnDate", { required: true });
    register("expiryDate");
  }, [register]);

  const initialFormValues = {
    applicationDate: parseAsDate(licence.data.applicationDate),
    region: formatNumber(licence.data.regionId),
    issuedOnDate: parseAsDate(licence.data.issuedOnDate),
    regionalDistrict: formatNumber(licence.data.regionalDistrictId),
    expiryDate: parseAsDate(licence.data.expiryDate),
    licenceStatus: licence.data.licenceStatusId,
    paymentReceived: licence.data.paymentReceived,
    feePaidAmount: licence.data.feePaidAmount,
    actionRequired: licence.data.actionRequired,
    printLicence: licence.data.printLicence,
    renewalNotice: licence.data.renewalNotice,
    irmaNumber: licence.data.irmaNumber,
    totalHives: licence.data.totalHives,
    hivesPerApiary: licence.data.hivesPerApiary,
    addresses: licence.data.addresses,
    phoneNumbers: licence.data.phoneNumbers,
  };

  useEffect(() => {
    setValue("applicationDate", parseAsDate(licence.data.applicationDate));
    setValue("region", formatNumber(licence.data.regionId));
    setValue("issuedOnDate", parseAsDate(licence.data.issuedOnDate));
    setValue("regionalDistrict", formatNumber(licence.data.regionalDistrictId));
    setValue("expiryDate", parseAsDate(licence.data.expiryDate));
    setValue("licenceStatus", licence.data.licenceStatusId);
    setValue("paymentReceived", licence.data.paymentReceived);
    setValue("feePaidAmount", licence.data.feePaidAmount);
    setValue("actionRequired", licence.data.actionRequired);
    setValue("printLicence", licence.data.printLicence);
    setValue("renewalNotice", licence.data.renewalNotice);
    setValue("irmaNumber", licence.data.irmaNumber);
    setValue("totalHives", licence.data.totalHives);
    setValue("hivesPerApiary", licence.data.hivesPerApiary);
  }, [
    setValue,
    licence.data.applicationDate,
    licence.data.regionId,
    licence.data.issuedOnDate,
    licence.data.regionalDistrictId,
    licence.data.expiryDate,
    licence.data.licenceStatusId,
    licence.data.paymentReceived,
    licence.data.feePaidAmount,
    licence.data.actionRequired,
    licence.data.printLicence,
    licence.data.renewalNotice,
    licence.data.irmaNumber,
    licence.data.totalHives,
    licence.data.hivesPerApiary,
    mode,
  ]);

  const submitting = status === REQUEST_STATUS.PENDING;

  let errorMessage = null;
  if (status === REQUEST_STATUS.REJECTED) {
    errorMessage = `${error.code}: ${error.description}`;
  }

  const config = getLicenceTypeConfiguration(licence.data.licenceTypeId);

  const getRenewLicenceDates = () => {
    const today = startOfToday();
    let expiryDate = null;
    if (config.expiryInTwoYears) {
      expiryDate = add(today, { years: 2 });
    } else if (config.expiryMonth) {
      expiryDate = set(today, { date: 31, month: config.expiryMonth - 1 }); // months are indexed at 0
      if (expiryDate < today) {
        expiryDate = add(expiryDate, { years: 1 });
      }
      if (config.yearsAddedToExpiryDate) {
        expiryDate = add(expiryDate, { years: config.yearsAddedToExpiryDate });
      }
    } else if (config.replaceExpiryDateWithIrmaNumber) {
      expiryDate = undefined;
    }

    return { issueDate: today, expiryDate: expiryDate };
  };

  const onRenew = () => {
    const dates = getRenewLicenceDates();
    dispatch(
      openModal(
        CONFIRMATION,
        onRenewCallback,
        {
          data: dates,
          modalContent: (
            <>
              <Row>
                <div className="justify-content-center">
                  The Issued On date will be updated to today's date, and the
                  Expiry Date for Licence Number {licence.data.id} will be
                  updated to {formatDate(dates.expiryDate)}
                </div>
              </Row>
              <br />
              <Row>
                <div className="justify-content-center">
                  Do you wish to proceed?
                </div>
              </Row>
            </>
          ),
        },
        "md"
      )
    );
  };

  const onRenewCallback = (data) => {
    const dates = data;
    dispatch(renewLicence({ data: dates, id: licence.data.id }));
  };

  if (mode === LICENCE_MODE.VIEW) {
    const onEdit = () => {
      dispatch(setCurrentLicenceModeToEdit());
    };
    return (
      <section>
        <SectionHeading onEdit={onEdit} showEditButton>
          License Details
        </SectionHeading>
        <Container className="mt-3 mb-4">
          <LicenceDetailsView licence={licence.data} />
          <Form.Row className="mt-3 mb-3">
            <Col sm={2}>
              <Button
                type="button"
                onClick={onRenew}
                disabled={submitting}
                variant="secondary"
                block
              >
                Renew Licence
              </Button>
            </Col>
          </Form.Row>
          <ErrorMessageRow errorMessage={errorMessage} />
        </Container>
      </section>
    );
  }

  const submissionLabel = submitting ? "Saving..." : "Save";

  const onSubmit = async (data) => {
    clearErrors("irmaNumber");

    let validationResult = validateIrmaNumber(data.irmaNumber);
    if (validationResult === false) {
      setError("irmaNumber", {
        type: "invalid",
      });

      return;
    }

    const payload = {
      ...data,
      feePaidAmount: data.paymentReceived
        ? parseAsFloat(data.feePaidAmount)
        : null,
      licenceStatus: parseAsInt(data.licenceStatus),
      region: parseAsInt(data.region),
      regionalDistrict: parseAsInt(data.regionalDistrict),
      originalRegion: licence.data.regionId,
      originalRegionalDistrict: licence.data.regionalDistrictId,
      irmaNumber: parseIrmaNumber(data.irmaNumber),
    };

    dispatch(updateLicence({ licence: payload, id: licence.data.id }));
  };

  const onCancel = () => {
    dispatch(setCurrentLicenceModeToView());
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <section>
        <SectionHeading>License Details</SectionHeading>
        <Container className="mt-3 mb-4">
          <LicenceDetailsEdit
            form={form}
            initialValues={initialFormValues}
            licenceTypeId={licence.data.licenceTypeId}
            mode={LICENCE_MODE.EDIT}
          />
          <SubmissionButtons
            submitButtonLabel={submissionLabel}
            submitButtonDisabled={submitting}
            cancelButtonVisible
            cancelButtonOnClick={onCancel}
          />
          <ErrorMessageRow errorMessage={errorMessage} />
        </Container>
      </section>
    </Form>
  );
}

LicenceDetailsViewEdit.propTypes = {
  licence: PropTypes.object.isRequired,
};
