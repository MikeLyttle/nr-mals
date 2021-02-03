import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

import { selectRegions } from "../lookups/regionsSlice";

import LicenceStatuses from "../lookups/LicenceStatuses";
import Regions from "../lookups/Regions";
import RegionalDistricts from "../lookups/RegionalDistricts";
import SectionHeading from "../../components/SectionHeading";

import { parseAsInt } from "../../utilities/parsing";

import {
  LICENCE_TYPE_ID_GAME_FARM,
} from "../licences/constants"


export default function SiteDetailsEdit({
  form,
  initialValues,
  licenceTypeId,
  mode,
}) {
  const { watch, setValue, register, errors } = form;
  const dispatch = useDispatch();
  const regions = useSelector(selectRegions);

  const watchRegion = watch("region", null);
  const parsedRegion = parseAsInt(watchRegion);

  return (
    <>
      <Row className="mt-3">
        <Col lg={4}>
          <LicenceStatuses
            ref={register({ required: true })}
            isInvalid={errors.licenceStatus}
            defaultValue={initialValues.status}
          />
        </Col>
        <Col lg={4}>
          <Regions
            regions={regions}
            ref={register}
            defaultValue={initialValues.region}
            isInvalid={errors.region}
          />
        </Col>
        <Col lg={4}>
          <RegionalDistricts
            regions={regions}
            selectedRegion={parsedRegion}
            ref={register}
            defaultValue={initialValues.district}
            isInvalid={errors.regionalDistrict}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={4}>
          <Form.Group controlId="addressLine1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control
              type="text"
              name="addressLine1"
              defaultValue={initialValues.addressLine1}
              ref={register({ required: true })}
              isInvalid={errors.addressLine1}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid address line.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={4}>
          <Form.Group controlId="addressLine2">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control
              type="text"
              name="addressLine2"
              defaultValue={initialValues.addressLine2}
              ref={register}
            />
          </Form.Group>
        </Col>
        <Col lg={4}></Col>
        <Col lg={4}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              defaultValue={initialValues.city}
              ref={register}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={2}>
          <Form.Group controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Control
              as="select"
              name="province"
              ref={register({ required: true })}
              defaultValue={initialValues.province ?? "BC"}
              isInvalid={errors.province}
            >
              <option value="AB">AB</option>
              <option value="BC">BC</option>
              <option value="MB">MB</option>
              <option value="NB">NB</option>
              <option value="NL">NL</option>
              <option value="NT">NT</option>
              <option value="NS">NS</option>
              <option value="NU">NU</option>
              <option value="ON">ON</option>
              <option value="PE">PE</option>
              <option value="QC">QC</option>
              <option value="SK">SK</option>
              <option value="YT">YT</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please enter a valid province.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col lg={2}>
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              defaultValue={initialValues.postalCode}
              ref={register}
            />
          </Form.Group>
        </Col>
        <Col lg={2}>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              defaultValue={initialValues.country}
              ref={register}
            />
          </Form.Group>
        </Col>
        <Col lg={2}></Col>
        <Col lg={2}>
          <Form.Group controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              name="latitude"
              defaultValue={initialValues.latitude}
              ref={register}
            />
          </Form.Group>
        </Col>
        <Col lg={2}>
          <Form.Group controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              name="longitude"
              defaultValue={initialValues.longitude}
              ref={register}
            />
          </Form.Group>
        </Col>
      </Row>
      <SectionHeading>Site Contact Details</SectionHeading>
      <Row className="mt-3">
        <Col lg={4}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              defaultValue={initialValues.firstName}
              ref={register}
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              defaultValue={initialValues.lastName}
              ref={register}
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="primaryPhone">
            <Form.Label>Primary Number</Form.Label>
            <Controller
              as={NumberFormat}
              name="primaryPhone"
              control={form.control}
              defaultValue={initialValues.primaryPhone ?? null}
              format="(###) ###-####"
              mask="_"
              customInput={Form.Control}
              isInvalid={errors.number}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={4}>
          <Form.Group controlId="secondaryPhone">
            <Form.Label>Secondary Number</Form.Label>
            <Controller
              as={NumberFormat}
              name="secondaryPhone"
              control={form.control}
              defaultValue={initialValues.secondaryPhone ?? null}
              format="(###) ###-####"
              mask="_"
              customInput={Form.Control}
              isInvalid={errors.number}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid phone number.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              defaultValue={initialValues.email}
              ref={register}
            />
          </Form.Group>
        </Col>
      </Row>
      { licenceTypeId === LICENCE_TYPE_ID_GAME_FARM ?
      <Row className="mt-3">
        <Col>
          <Form.Group controlId="legalDescription">
            <Form.Label>Legal Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="legalDescriptionText"
              ref={register}
              maxLength={4000}
              className="mb-1"
            />
          </Form.Group>
        </Col>
      </Row>
      : null }
    </>
  );
}

SiteDetailsEdit.propTypes = {
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  licenceTypeId: PropTypes.number,
  mode: PropTypes.string.isRequired,
};

SiteDetailsEdit.defaultProps = {
  licenceTypeId: undefined,
};
