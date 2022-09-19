import ReactDOM from 'react-dom';
import { MockedProvider } from "@apollo/client/testing";
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MockedProvider >
      <App />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
