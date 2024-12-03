import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { Login } from "../../components/Login";
import { setUserData } from "../../store/slices/userSlice";
const mockStore = configureMockStore();

jest.mock("../../services", () => ({
  login: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/mock/path" }),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

const renderComponent = async (markup) => {
  let result = null;
  await act(async () => {
    result = render(markup);
  });
  return result; // This allows you to use query functions like getByText in your tests
};

describe("Login", () => {
  it("should add token to localStorage immediately after successful login and save user data to the store (setUserData action from userSlice with data from login service should be called)", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      token: "1234567890",
    };
    const loginMock = require("../../services").login;
    loginMock.mockResolvedValueOnce({
      successful: true,
      result: userData.token,
      user: userData,
    });

    const store = mockStore({});

    const { getByLabelText, getByRole } = await renderComponent(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByRole("button");

    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for the login process to complete

    const expectedAction = setUserData({
      ...userData,
      token: userData.token,
    });

    expect(localStorage.getItem("token")).toBe(userData.token);
    await waitFor(() => {
      expect(store.getActions()).toContainEqual(expectedAction);
    });
  });
});
