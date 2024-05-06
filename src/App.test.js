import { render, screen } from "@testing-library/react";
import 'text-encoding-polyfill'
import App from "./App";
    test("Should render Learn React' text", () => {

        render(<App />);
   
        const element = screen.getByText(/learn react/i);
        expect(element).toBeInTheDocument();
        
      });
      
