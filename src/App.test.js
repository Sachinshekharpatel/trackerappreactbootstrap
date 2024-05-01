import { render, screen } from "@testing-library/react";
import App from "./App";
    test("Should render Learn React' text", () => {
        // Arrange
        render(<App />);
      
        // Act - Nothing to act on in this case
      
        // Assert
        const element = screen.getByText('Learn React' , { exact: false });
        expect(element).toBeInTheDocument();
        
      });
      
