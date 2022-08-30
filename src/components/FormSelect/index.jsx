import React from "react";
import countries from "../../utils/countries";
import PRIMARY_RED_COLOR, { PRIMARY_WHITE_COLOR } from "../../constants";

// styled component
import styled from "styled-components";

// react select
import Select from "react-select";

function CheckoutFormSelect(props) {
  const { errors, field } = props;

  return (
    <CheckoutFormSelectWrapper>
      <Select
        {...field}
        placeholder="Select a country"
        styles={customStyles}
        options={countries}
      />
      <span className="checkout-form-field__error">
        {errors.country?.message}
      </span>
    </CheckoutFormSelectWrapper>
  );
}

const CheckoutFormSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & > *:first-child {
    margin-bottom: 5px;
  }
`;

const customStyles = {
  container: (base) => ({
    ...base,
    flex: 1,
  }),
  control: (base) => ({
    ...base,
    fontSize: "1.6rem",
    borderColor: "rgba(0, 0, 0, 0.15)",
    boxShadow: "none",
    cursor: "pointer",
    padding: "4px",

    "&:hover": {
      border: "1px solid inherite",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }),
  option: (base, state) => ({
    ...base,
    padding: "12px",
    fontSize: "1.4rem",
    color: state.isSelected ? PRIMARY_WHITE_COLOR : "#333",
    backgroundColor: state.isSelected ? PRIMARY_RED_COLOR : PRIMARY_WHITE_COLOR,
    cursor: "pointer",

    "&:active": {
      backgroundColor: state.isSelected && PRIMARY_RED_COLOR,
    },

    "&:hover": {
      backgroundColor: !state.isSelected && "rgba(0, 0, 0, 0.03)",
    },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    fontSize: "1.3rem",
  }),
  menuList: (base) => ({
    ...base,
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "rgba(0, 0, 0, 0.6)",
  }),
};

export default CheckoutFormSelect;
