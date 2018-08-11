// TypeScript Version: 2.9

import { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type AccountHolderType = 'company' | 'individual';
export type LiveMode = 0 | 1;
export type CardBrand =
  | 'JCB'
  | 'American Express'
  | 'Visa'
  | 'Discover'
  | 'Diners Club'
  | 'MasterCard'
  | 'Unknown';

export type StripeSourceType =
  | 'bancontact'
  | 'card'
  | 'griopay'
  | 'ideal'
  | 'sepaDebit'
  | 'sofort'
  | 'threeDSecure'
  | 'alipay'
  | 'unknown';

export type StripeSourceUsage = 'reusable' | 'single' | 'unknown';

export type CardFunding = 'debit' | 'credit' | 'prepaid' | 'unknown';

export interface StripeCard {
  /**
   * The Stripe ID for the card
   */
  cardId: string;
  /**
   * The card's brand.
   */
  brand: CardBrand;
  /**
   * The card's funding.
   * @platform ios
   */
  funding: CardFunding;
  /**
   * The last 4 digits of the card
   */
  last4: string;
  /**
   * For cards made with Apple Pay, this refers to the last 4 digits of the Device Account Number for the tokenized card
   * @platform ios
   */
  dynamicLast4: string;
  /**
   * Whether or not the card originated from Apple Pay
   * @platform ios
   */
  isApplePayCard: boolean;
  expMonth: number;
  expYear: number;
  country: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressCountry: string;
  addressZip: string;
}

export interface StripeOptions {
  publishableKey: string;
  merchantId?: string;
  androidPayMode?: 'test' | 'production';
}

export interface StripeBankAccount {
  bankName: string;
  accountHolderType: AccountHolderType;
  last4: string;
  accountHolderName: string;
  currency: string;
  fingerprint: string;
  countryCode: string;
  accountNumber: string;
  routingNumber: string;
}
export interface StripeToken {
  /**
   * The value of the token. You can store this value on your server and use it to make charges and customers
   */
  tokenId: string;

  /**
   * When the token was created
   */
  created: number;

  /**
   * Whether or not this token was created in livemode.
   * ~Will be 1 if you used your Live Publishable Key, and 0 if you used your Test Publishable Key~ DOCs seem different from implementation
   */
  livemode: boolean;
  card?: StripeCard;
  bankAccount?: StripeBankAccount;
  extra?: string;
}

export interface SepaDebitDetails {
  /**
   * 	The last 4 digits of the account number
   */
  last4: string;
  /**
   * 	The account's bank code
   */
  bankCode: string;
  /**
   * 	Two-letter ISO code representing the country of the bank account
   */
  country: string;
  /**
   * 	The account's fingerprint
   */
  fingerprint: string;
  /**
   * 	The reference of the mandate accepted by your customer
   */
  mandateReference: string;
  /**
   * 	The details of the mandate accepted by your customer
   */
  mandateURL: string;
}

export interface CardDetails {
  /**
   * The last 4 digits of the card
   */
  last4: string;
  /**
   * The card's expiration month. 1-indexed (i.e. 1 == January)
   */
  expMonth: number;
  /**
   * The card's expiration year
   */
  expYear: number;
  /**
   * The issuer of the card.
   */
  brand: CardBrand;
  /**
   * The funding source for the card.
   * @platform ios
   */
  funding: CardFunding;
  /**
   * 	Two-letter ISO code representing the issuing country of the card
   */
  country: string;
  /**
   * 	Whether 3D Secure is supported or required by the card.
   */
  threeDSecure: 'required' | 'optional' | 'notSupported' | 'unknown';
}

export interface Verification {
  /**
   * The number of attempts remaining to authenticate the source object with a verification code
   */
  attemptsRemaining: number;
  /**
   * The status of the verification.
   */
  status: 'pending' | 'succeeded' | 'failed' | 'unknown';
}

export interface Owner {
  /**
   * Owner's address
   */
  address?: StripeAddress;
  /**
   * Owner's email address
   */
  email?: string;
  /**
   * Owner's full name
   */
  name?: string;
  /**
   * Owner's phone number
   */
  phone?: string;
  /**
   * Verified owner's address
   */
  verifiedAddress?: object;
  /**
   * Verified owner's email address
   */
  verifiedEmail?: string;
  /**
   * Verified owner's full name
   */
  verifiedName?: string;
  /**
   * Verified owner's phone number
   */
  verifiedPhone?: string;
}

export interface Receiver {
  /**
   * The address of the receiver source. This is the value that should be communicated to the customer to send their funds to
   */
  address: StripeAddress;
  /**
   * The total amount charged by you
   */
  amountCharged: number;
  /**
   * The total amount received by the receiver source
   */
  amountReceived: number;
  /**
   * The total amount that was returned to the customer
   */
  amountReturned: number;
}

export interface Redirect {
  /**
   * The URL you provide to redirect the customer to after they authenticated their payment
   */
  returnURL: string;
  /**
   * The status of the redirect. Can be one of: pending ‖ succeeded ‖ failed ‖ unknown
   */
  status: string;
  /**
   * The URL provided to you to redirect a customer to as part of a redirect authentication flow
   */
  url: string;
}

export interface StripeSource {
  /**
   * The amount associated with the source
   */
  amount: number;

  /**
   * The client secret of the source. Used for client-side polling using a publishable key
   */
  clientSecret: string;

  /**
   * When the source was created
   */
  created: number;

  /**
   * The currency associated with the source
   */
  currency: string;
  /**
   * The authentication flow of the source. Can be one of: none ‖ redirect ‖ verification ‖ receiver ‖ unknown
   */
  flow: string;

  /**
   * Whether or not this source was created in livemode. Will be true if you used your Live Publishable Key, and false if you used your Test Publishable Key
   */
  livemode: boolean;

  /**
   * A set of key/value pairs associated with the source object
   */
  metadata: object;

  /**
   * Information about the owner of the payment instrument
   */
  owner: object;

  /**
   * Information related to the receiver flow. Present if the source is a receiver
   */
  receiver?: object;

  /**
   * Information related to the redirect flow. Present if the source is authenticated by a redirect
   */
  redirect?: object;

  /**
   * The status of the source. Can be one of: pending ‖ chargable ‖ consumed ‖ cancelled ‖ failed
   */
  status: string;

  /**
   * The type of the source. Can be one of: bancontact ‖ card ‖ griopay ‖ ideal ‖ sepaDebit ‖ sofort ‖ threeDSecure ‖ alipay ‖ unknown
   */
  type: StripeSourceType;

  /**
   * Whether this source should be reusable or not. Can be one of: reusable ‖ single ‖ unknown
   */
  usage: StripeSourceUsage;

  /**
   * Information related to the verification flow. Present if the source is authenticated by a verification
   */
  verification?: Verification;

  /**
   * Information about the source specific to its type
   */
  details: object;

  /**
   * If this is a card source, this property contains information about the card
   */
  cardDetails?: CardDetails;

  /**
   * If this is a SEPA Debit source, this property contains information about the sepaDebit
   */
  sepaDebitDetails?: SepaDebitDetails;
}

export type ApplePayNetworks =
  | 'american_express'
  | 'discover'
  | 'master_card'
  | 'visa';

export interface ApplePayPaymentRequestItem {
  /**
   * A short, localized description of the item.
   */
  label: string;
  /**
   * The summary item's amount.
   */
  amount: string;
  /**
   * The summary item's type. Must be "pending" or "final
   * @default 'final'
   */
  type?: 'pending' | 'final';
}

export interface ShippingMethod {
  /**
   * A short, localized description of the shipping method
   */
  id: string;
  /**
   * A unique identifier for the shipping method, used by the app
   */
  label: string;
  /**
   * A user-readable description of the shipping method
   */
  detail: string;
  /**
   * The shipping method's amount
   */
  amount: string;
}

export type RequiredAddressField =
  | 'all'
  | 'name'
  | 'email'
  | 'phone'
  | 'postal_address';

export interface ApplePayPaymentRequestOptions {
  /**
   * A bit field of billing address fields that you need in order to process the transaction.
   */
  requiredBillingAddressFields?: RequiredAddressField[];
  /**
   * A bit field of shipping address fields that you need in order to process the transaction.
   */
  requiredShippingAddressFields?: RequiredAddressField[];
  /**
   * An array of shippingMethod objects that describe the supported shipping methods.
   */
  shippingMethods: ShippingMethod[];
  /**
   * The three-letter ISO 4217 currency code. Default is USD
   */
  currencyCode: string;
  /**
   * The two-letter code for the country where { the } payment will be processed. Default is US
   */
  countryCode: string;
  /**
   * An optional value that indicates how purchased items are to be shipped. Default is shipping. Available options are: shipping ‖ delivery ‖ store_pickup ‖ service_pickup
   */
  shippingType: string;
}

export interface Contact {
  /**
   * The contact's name
   */
  name: string;
  /**
   * The contact's phone number
   */
  phoneNumber: string;
  /**
   * The contact's email address
   */
  emailAddress: string;
  /**
   * The street name in a postal address
   */
  street: string;
  /**
   * The city name in a postal address
   */
  city: string;
  /**
   * The state name in a postal address
   */
  state: string;
  /**
   * The country name in a postal address
   */
  country: string;
  /**
   * The ISO country code for the country in a postal address
   */
  ISOCountryCode: string;
  /**
   * The postal code in a postal address
   */
  postalCode: string;
  /**
   * The contact's sub-locality
   */
  supplementarySubLocality: string;
}

export interface ApplePayPaymentRequestResponse {
  /**
   * Selected shippingMethod object
   */
  shippingMethod: ShippingMethod;
  /**
   * The user's billing contact object
   */
  billingContact: Contact;
  /**
   * The user's shipping contact object
   */
  shippingContact: Contact;
}

export interface AndroidPayLineItem {
  /**
   * Currency code string
   */
  currency_code: string;
  /**
   * Short description that will shown to user
   */
  description: string;
  /**
   * Total order price
   */
  total_price: string;
  /**
   * Price per unit
   */
  unit_price: string;
  /**
   * Number of items
   */
  quantity: string;
}

export interface AndroidPayPaymentRequestOptions {
  /**
   * Total price for items
   */
  total_price: string;
  /**
   * Three-letter ISO currency code representing the currency paid out to the bank account
   */
  currency_code: string;
  /**
   * Is shipping address menu required?
   * @default false
   */
  shipping_address_required?: boolean;
  /**
   * Is billing address menu required?
   * @default false
   */
  billing_address_required?: boolean;
  /**
   * 	Array of purchased items. Each item contains line_item
   */
  line_items: AndroidPayLineItem[];
}

export interface PrefilledInformation {
  /**
   * The user's email address
   */
  email?: string;
  /**
   * The user's phone number
   */
  phone?: string;
  /**
   * The user's billing address. When set, the add card form will be filled with this address
   */
  billingAddress?: StripeAddress;
}

export interface StripeAddress {
  /**
   * The user's full name (e.g. "Jane Doe")
   */
  name?: string;
  /**
   * The first line of the user's street address (e.g. "123 Fake St")
   */
  line1?: string;
  /**
   * The apartment, floor number, etc of the user's street address (e.g. "Apartment 1A")
   */
  line2?: string;
  /**
   * The city in which the user resides (e.g. "San Francisco")
   */
  city?: string;
  /**
   * The state in which the user resides (e.g. "CA")
   */
  state?: string;
  /**
   * The postal code in which the user resides (e.g. "90210")
   */
  postalCode?: string;
  /**
   * The ISO country code of the address (e.g. "US")
   */
  country?: string;
  /**
   * The phone number of the address (e.g. "8885551212")
   */
  phone?: string;
  /**
   * The email of the address (e.g. "jane@doe.com")
   */
  email?: string;
}

export interface StripeTheme {
  /**
   * The primary background color of the theme
   */
  primaryBackgroundColor?: string;
  /**
   * The secondary background color of this theme
   */
  secondaryBackgroundColor?: string;
  /**
   * The primary foreground color of this theme.
   * This will be used as the text color for any important labels in a view with this theme
   * (such as the text color for a text field that the user needs to fill out)
   */
  primaryForegroundColor?: string;
  /**
   * The secondary foreground color of this theme.
   * This will be used as the text color for any supplementary labels in a view with this theme
   * (such as the placeholder color for a text field that the user needs to fill out)
   */
  secondaryForegroundColor?: string;
  /**
   * The accent color of this theme - it will be used for any buttons and other elements on a view that are important to highlight
   */
  accentColor?: string;
  /**
   * The error color of this theme - it will be used for rendering any error messages or view
   */
  errorColor?: string;
}

export interface CardPaymentRequestOptions {
  /**
   * The billing address fields the user must fill out when prompted for their payment details. Can be one of: full or zip or not specify to disable
   */
  requiredBillingAddressFields?: 'full' | 'zip';
  /**
   * You can set this property to pre-fill any information you've already collected from your user
   */
  prefilledInformation?: PrefilledInformation;
  /**
   * Required to be able to add the card to an account (in all other cases, this parameter is not used). More info
   */
  managedAccountCurrency?: string;
  /**
   * Can be used to visually style Stripe-provided UI
   */
  theme?: StripeTheme;
}

export interface BankAccountCreateTokenParams {
  /**
   * The account number for this BankAccount
   */
  accountNumber: string;
  /**
   * The two-letter country code that this account was created in
   */
  countryCode: string;
  /**
   * The currency of this account
   */
  currency: string;
  /**
   * The routing number of this account
   */
  routingNumber?: string;
  /**
   * The account holder's name
   */
  accountHolderName?: string;
  /**
   * The bank account type.
   */
  accountHolderType?: AccountHolderType;
}

export interface CreateSourceParams {
  /**
   * The type of the source to create.
   */
  type: StripeSourceType;
  /**
   * A positive number in the smallest currency unit representing the amount to charge the customer (e.g., 1099 for a €10.99 payment)
   */
  amount?: number;
  /**
   * The full name of the account holder
   */
  name?: string;
  /**
   * The URL the customer should be redirected to after they have successfully verified the payment
   */
  returnURL?: string;
  /**
   * A custom statement descriptor for the payment
   */
  statementDescriptor?: string;
  /**
   * The currency associated with the source. This is the currency for which the source will be chargeable once ready
   */
  currency?: string;
  /**
   * The customer's email address
   */
  email?: string;
  /**
   * The customer's bank
   */
  bank?: string;
  /**
   * The IBAN number for the bank account you wish to debit
   */
  iban?: string;
  /**
   * The bank account holder's first address line (optional)
   */
  addressLine1?: string;
  /**
   * The bank account holder's city
   */
  city?: string;
  /**
   * The bank account holder's postal code
   */
  postalCode?: string;
  /**
   * The bank account holder's two-letter country code (sepaDebit) or the country code of the customer's bank (sofort)
   */
  country?: string;
  /**
   * The ID of the card source
   */
  card?: string;

  /**
   * Card returned from the createCardToken
   */
  cardParams?: StripeCard;

  /**
   * Use this when creating a source with Apple Pay or Google Pay
   */
  tokenId?: string;
}

interface Stripe {
  /**
   * Initialize Stripe with your credentials that you can get from dashboard.
   * If you want to use Apple Pay you must provide your Merchant ID.
   * @param option
   */
  setOptions(option: StripeOptions): void;

  /**
   * @deprecated Use openNativePaySetup instead
   * @platform ios
   */
  openApplePaySetup(): void;

  /**
   * Opens the user interface to set up credit cards for  Pay.
   * @platform ios
   */
  openNativePaySetup(): void;

  /**
   * Returns whether the user can make Apple Pay payments.
   * User may not be able to make payments for a variety of reasons.
   * For example, this functionality may not be supported by their hardware,
   * or it may be restricted by parental controls.
   *
   * Returns true if the device supports making payments; otherwise, false.
   *
   * NOTE: iOS Simulator always return true
   * @platform ios
   * @deprecated use `deviceSupportsNativePay`
   */
  deviceSupportsApplePay(): Promise<boolean>;

  /**
   * Indicates whether or not the device supports AndroidPay.
   * @platform android
   * @deprecated use `deviceSupportsNativePay`
   */
  deviceSupportsAndroidPay(): Promise<boolean>;

  /**
   * Returns whether the user can make Native mobile payments. Google Pay or Apple Pay.
   * User may not be able to make payments for a variety of reasons.
   * For example, this functionality may not be supported by their hardware,
   * or it may be restricted by parental controls.
   *
   * Returns true if the device supports making payments; otherwise, false.
   *
   * NOTE: iOS Simulator always return true
   */
  deviceSupportsNativePay(): Promise<boolean>;

  /**
   * Returns whether the user can make Apple Pay payments with specified options.
   * If there are no configured payment cards, this method always returns false.
   * Return true if the user can make Apple Pay payments through any of the
   * specified networks; otherwise, false.
   *
   * NOTE: iOS Simulator always return true
   * @platform ios
   *
   * @param networks Indicates whether the user can make Apple Pay payments through the specified network. If option is not specified we pass all available networks under the hood.
   *
   * @deprecated use canMakeNativePayPayments instead
   */
  canMakeApplePayPayments(networks: ApplePayNetworks[]): Promise<boolean>;

  /**
   * Indicates whether or not the device supports AndroidPay and user has existing payment method.
   * @deprecated use canMakeNativePayPayments instead
   */
  canMakeAndroidPayPayments(): Promise<boolean>;

  canMakeNativePayPayments(
    networks: ApplePayNetworks[] | undefined,
  ): Promise<boolean>;

  /**
   * @deprecated Use paymentRequestWithNativePayInstead
   */
  paymentRequestWithApplePay(
    items: ApplePayPaymentRequestItem[],
    options?: ApplePayPaymentRequestOptions,
  ): Promise<ApplePayPaymentRequestResponse>;

  /**
   * @deprecated Use paymentRequestWithNativePayInstead
   */
  paymentRequestWithAndroidPay(
    options: AndroidPayPaymentRequestOptions,
  ): Promise<StripeToken>;

  paymentRequestWithNativePay(
    items: ApplePayPaymentRequestItem[],
    options?: ApplePayPaymentRequestOptions,
  ): Promise<StripeToken & { extra: ApplePayPaymentRequestResponse }>;
  paymentRequestWithNativePay(
    options: AndroidPayPaymentRequestOptions,
  ): Promise<StripeToken>;

  /**
   * @deprecated Use completeNativePayRequest instead
   * @platform ios
   */
  completeApplePayRequest(): Promise<void>;

  /**
   * After paymentRequestWithApplePay you should complete the operation
   * by calling completeApplePayRequest. This method is only useable on iOS
   * @platform ios
   */
  completeNativePayRequest(): Promise<void>;

  /**
   * @deprecated Use cancelNativeRequest instead
   * @platform ios
   */
  cancelApplePayRequest(): Promise<void>;

  /**
   * After a failed paymentRequestWithApplePay you can cancel the operation by calling
   * cancelApplePayRequest if an error occurred.
   * @platform ios
   */
  cancelNativeRequest(): Promise<void>;

  /**
   * Launch Add Card view to to accept payment.
   * @param options
   */
  paymentRequestWithCardForm(
    options: CardPaymentRequestOptions,
  ): Promise<StripeToken>;

  /**
   * Creates token based on external (bank) params.
   */
  createTokenWithBankAccount(
    params: BankAccountCreateTokenParams,
  ): Promise<StripeToken>;

  /**
   * Creates source object based on params. Sources are used to create payments for a variety of payment methods
   * NOTE: For sources that require redirecting your customer to authorize the payment, you need to
   * specify a return URL when you create the source. This allows your customer to be redirected back to your app after they
   * authorize the payment. For this return URL, you can either use a custom URL scheme or a universal link supported by your app.
   *
   * @param params
   */
  createSourceWithParams(params: CreateSourceParams): Promise<StripeSource>;
}

declare const stripe: Stripe;
export default stripe;

export interface PaymentCardTextFieldParams {
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

export interface PaymentCardTextFieldProps {
  /**
   * Object	Accepts all View styles, also support color param
   */
  styles?: StyleProp<ViewStyle>;
  /**
   * The cursor color for the field
   * @platform ios
   */
  cursorColor?: string;
  /**
   * The text color to be used when the user has entered invalid information, such as an invalid card number
   * @platform ios
   */
  textErrorColor?: string;
  /**
   * The text placeholder color used in each child field
   * @platform ios
   */
  placeholderColor?: string;
  /**
   * Determines the color of the keyboard. One of default, light, dark
   * @platform ios
   */
  keyboardAppearance?: 'light' | 'dark' | 'default';
  /**
   * The placeholder for the card number field
   */
  numberPlaceholder?: string;
  /**
   * The placeholder for the expiration field
   */
  expirationPlaceholder?: string;
  /**
   * The placeholder for the cvc field
   */
  cvcPlaceholder?: string;
  /**
   * Bool	Enable/disable selecting or editing the field. Useful when submitting card details to Stripe
   * @platform ios
   */
  disabled?: boolean;
  /**
   * Enable/disable selecting or editing the field. Useful when submitting card details to Stripe
   */
  enabled?: boolean;
  /**
   * Func	This function will be called each input change
   */
  onChange(): void;
  /**
   * valid Bool, params: Object)	Func	This function will be called each input change, it takes two arguments
   */
  onParamsChange(valid: boolean, params: PaymentCardTextFieldParams): void;
}

export class PaymentCardTextField extends Component<PaymentCardTextFieldProps> {
  params: PaymentCardTextFieldParams;
  valid: boolean;
  setParams(params: Partial<PaymentCardTextFieldParams>): void;
}
