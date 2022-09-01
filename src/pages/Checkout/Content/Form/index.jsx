import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.scss";
import useFirestoreProducts from "../../../../hooks/useFirestoreProducts";
import { AuthContext } from "../../../../contexts/AuthContext";
import { setIsAtCheckout } from "../../../../reducers/headerSlice";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PrimaryButton from "../../../../components/PrimaryButton";
import FormField from "../../../../components/FormField";
import FormSelect from "../../../../components/FormSelect";
import CheckoutLoading from "../../Loading";
import ToastMessage from "../../../../components/ToastMessage";
import { moveToTop } from "../../../../components/ScrollButton";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .matches(/^[a-zA-Z]*$/g, "Must be only text")
    .min(2, "Maximum of 2 characters")
    .max(20, "Maximum of 20 characters"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .matches(/^[a-zA-Z]*$/g, "Must be only text")
    .min(2, "Maximum of 2 characters")
    .max(20, "Maximum of 20 characters"),
  address: yup
    .string()
    .required("Please enter your adress")
    .min(5, "Maximum of 5 characters"),
  country: yup.object().nullable(true).required("A country is required"),
  phone: yup
    .string()
    .required("A phone number is required")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Phone number is not valid"),
});

const CheckoutForm = (props) => {
  const { setIsCheckoutSuccess, setIsPurchased } = props;
  const [isShowLoading, setIsShowLoading] = useState(false);
  const cartProducts = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  const { removeAllFromFirestore } = useFirestoreProducts();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = () => {
    if (cartProducts.length <= 0) {
      ToastMessage("warning");
      return;
    }

    reset({
      firstName: "",
      lastName: "",
      address: "",
      country: "",
      phone: "",
    });
    setIsCheckoutSuccess(true);
    setIsShowLoading(true);
    removeAllFromFirestore(user.uid);

    // remove loading when form is submitted
    setTimeout(() => {
      setIsCheckoutSuccess(false);
      setIsShowLoading(false);
      setIsPurchased(true);
    }, 1000);
  };

  const returnToShop = () => {
    const action = setIsAtCheckout(false);
    dispatch(action);
    history.push("/shop/our-foods");
    moveToTop();
  };

  // if empty cart then reset progress to false
  useEffect(() => {
    cartProducts.length <= 0 ?? setIsCheckoutSuccess(false);
  }, [cartProducts, setIsCheckoutSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="form">
        <h2 className="form__title">Confirm information</h2>
        <div className="form__field">
          <div className="form__field-row">
            <FormField
              label="First name"
              errors={errors}
              register={register}
              name="firstName"
            />

            <FormField
              label="Last name"
              errors={errors}
              register={register}
              name="lastName"
            />
          </div>

          <FormField
            label="Address"
            errors={errors}
            register={register}
            name="address"
          />

          <div className="form__field-row">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormSelect errors={errors} field={field} />
              )}
            />

            <FormField
              label="Phone"
              errors={errors}
              register={register}
              name="phone"
            />
          </div>
        </div>

        <div className="form__bottom">
          <div onClick={returnToShop} className="form__bottom-return">
            <ChevronLeftIcon />
            <span>Return to shop</span>
          </div>
          <button type="submit">
            <PrimaryButton subClass="red">Checkout</PrimaryButton>
          </button>
        </div>
      </form>
      {isShowLoading && <CheckoutLoading />}
    </>
  );
};

export default CheckoutForm;
