import { render, screen } from "@testing-library/react";
import SignUpPage from "./signupPage";
import ProfilePage from "./profilepage";
import WelcomePage from "./welcomePage";
import ForgotPasswordPage from "./forgotpasswordpage";
import LoginPage from "./loginpage";

describe(" component", () => {
    test("should render 'Already have an account' text", () => {
        // Arrange
        render(<SignUpPage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Already have an account' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render  text", () => {
        // Arrange
        render(<ProfilePage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Image URL' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render text", () => {
        // Arrange
        render(<WelcomePage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Price' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render, text", () => {
        // Arrange
        render(<SignUpPage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Password' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render text" , () => {
        // Arrange
        render(<SignUpPage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Confirm Password' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render text", () => {
        // Arrange
        render(<ForgotPasswordPage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Back to Login' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe("component", () => {
    test("should render text", () => {
        // Arrange
        render(<SignUpPage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Already have an account' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render text", () => {
        // Arrange
        render(<ProfilePage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Name' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render text", () => {
        // Arrange
        render(<WelcomePage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Logout' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});
describe(" component", () => {
    test("should render text", () => {
        // Arrange
        render(<LoginPage />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Login' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
});