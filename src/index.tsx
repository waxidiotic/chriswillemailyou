import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createClient } from '@supabase/supabase-js';

import './index.css';
import 'antd/dist/antd.css';

const supabaseUrl = 'https://sugzkgepgdkjitrzrpms.supabase.co';
const supabaseKey = import.meta.env.SNOWPACK_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
