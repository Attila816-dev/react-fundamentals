import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Registration } from "../../components/Registration/Registration";
import * as services from "../../services";

const mockedUsedNavigate = jest.fn();

const renderComponent = async (markup) => {
  await act(async () => {
    render(markup);
  });
};

beforeEach(() => {
  jest
    .spyOn(services, "createUser")
    .mockImplementation(jest.fn(() => Promise.resolve()));

  jest.spyOn(global, "fetch").mockImplementation(
    jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
      })
    )
  );

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
  }));
});

describe("Registration", () => {
  test("should render the registration form with 3 inputs, login info text and link", async () => {
    await renderComponent(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    expect(screen.queryByText(/name/i)).toBeInTheDocument();
    expect(screen.queryByText(/email/i)).toBeInTheDocument();
    expect(screen.queryByText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  test('should submit the registration form, call the "createUser" service with the entered name, email and password', async () => {
    await renderComponent(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/name/i).querySelector("input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.queryByText(/email/i).querySelector("input"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.queryByText(/password/i).querySelector("input"), {
      target: { value: "password123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });

    expect(services.createUser).toHaveBeenCalledTimes(1);
    await expect(services.createUser).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
  });

  test('should render the "Password is required" validation message and NOT call registration service', async () => {
    await renderComponent(
      <MemoryRouter>
        <Registration setName={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/email/i).querySelector("input"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText(/password is required/i)).toBeInTheDocument();
    expect(services.createUser).not.toHaveBeenCalled();
  });
  test('should render the "Email is required" validation message and NOT call registration service', async () => {
    await renderComponent(
      <MemoryRouter>
        <Registration setName={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/password/i).querySelector("input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText(/email is required/i)).toBeInTheDocument();
    expect(services.createUser).not.toHaveBeenCalled();
  });
  test('should render the "Name is required" validation message and NOT call registration service', async () => {
    await renderComponent(
      <MemoryRouter>
        <Registration setName={jest.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.queryByText(/password/i).querySelector("input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText(/name is required/i)).toBeInTheDocument();
    expect(services.createUser).not.toHaveBeenCalled();
  });
});
