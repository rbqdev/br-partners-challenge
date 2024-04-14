export const defaultIndividualValuesMock = {
  type: "PF",
  name: "Customer Name",
  document: "1234567890",
  email: "email@gmail.com",
  phone: "1234567890",
  phoneMasked: "(12) 93456-7890",
};
export const defaultCompanyValuesMock = {
  ...defaultIndividualValuesMock,
  type: "PJ",
  name: "Company Name",
  tradeName: "Company Trade Name",
};
